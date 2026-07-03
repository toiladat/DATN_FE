// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 1. Khai báo Interface chuẩn của ERC20
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

// 2. Thư viện SafeERC20 mini (inline) để đảm bảo tương thích 100% với Mainnet
library SafeERC20 {
    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        (bool success, bytes memory returndata) = address(token).call(data);
        require(success, "SafeERC20: low-level call failed");
        if (returndata.length > 0) {
            require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
        }
    }
}

contract FundHiveMilestoneERC20 {
    using SafeERC20 for IERC20;

    enum ProjectStatus { PROGRESS, ACTIVE, FAILED, CANCELLED }

    struct Milestone {
        uint256 releaseTime;
        uint256 amount;
        bool isWithdrawn;
    }

    struct Project {
        address creator;
        uint256 goal;
        uint256 totalFunded;
        uint256 fundDeadline;
        uint256 remainingBalance;
        ProjectStatus status;
        uint256 currentMilestone;
    }

    address public admin;
    uint256 public projectCount;
    
    // Biến lưu địa chỉ của token ERC20 (ví dụ: mUSDT trên Sepolia)
    IERC20 public fundingToken;

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Milestone[]) public projectMilestones;
    mapping(uint256 => mapping(address => uint256)) public contributions;

    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    event ProjectCreated(uint256 indexed projectId, address indexed creator, uint256 goal);
    // Đổi tên sự kiện thành Contributed để khớp hoàn toàn với Backend Indexer
    event Contributed(uint256 indexed id, address indexed contributor, uint256 amount);
    event StatusChanged(uint256 indexed projectId, ProjectStatus newStatus);
    event MilestoneWithdrawn(uint256 indexed projectId, uint256 milestoneIndex, uint256 amount);
    event Refunded(uint256 indexed id, address indexed contributor, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not Admin");
        _;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    // Truyền địa chỉ của mUSDT trên mạng Sepolia vào khi Deploy
    constructor(address _fundingTokenAddress) {
        admin = msg.sender;
        _status = _NOT_ENTERED;
        fundingToken = IERC20(_fundingTokenAddress);
    }

    // ==========================================
    // 1. KHỞI TẠO DỰ ÁN
    // ==========================================
    function createProject(
        uint256 _projectId,
        uint256 _goal,
        uint256 _fundDeadline,
        uint256[] memory _milestoneTimes,
        uint256[] memory _milestoneAmounts
    ) external {
        require(projects[_projectId].creator == address(0), "Project already exists");
        require(_fundDeadline > block.timestamp, "Deadline must be in future");
        require(_milestoneTimes.length == _milestoneAmounts.length, "Mismatched milestone arrays");
        require(_milestoneTimes.length > 0, "Needs at least 1 milestone");

        uint256 totalMilestoneAmount = 0;
        uint256 lastTime = _fundDeadline;

        for (uint256 i = 0; i < _milestoneTimes.length; i++) {
            require(_milestoneTimes[i] >= lastTime, "Milestone time invalid");
            totalMilestoneAmount += _milestoneAmounts[i];
            lastTime = _milestoneTimes[i];
        }
        
        require(totalMilestoneAmount == _goal, "Milestones total must equal goal");

        projectCount++;
        projects[_projectId] = Project({
            creator: msg.sender,
            goal: _goal,
            totalFunded: 0,
            fundDeadline: _fundDeadline,
            remainingBalance: 0,
            status: ProjectStatus.PROGRESS,
            currentMilestone: 0
        });

        for (uint256 i = 0; i < _milestoneTimes.length; i++) {
            projectMilestones[_projectId].push(Milestone({
                releaseTime: _milestoneTimes[i],
                amount: _milestoneAmounts[i],
                isWithdrawn: false
            }));
        }

        emit ProjectCreated(_projectId, msg.sender, _goal);
    }

    // ==========================================
    // 2. GỌI VỐN (INVEST)
    // ==========================================
    function invest(uint256 _projectId, uint256 _amount) external nonReentrant {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.PROGRESS, "Not in funding phase");
        require(block.timestamp <= project.fundDeadline, "Funding deadline passed");
        require(_amount > 0, "Must invest more than 0");

        uint256 availableToFund = project.goal - project.totalFunded;
        uint256 contribution = _amount;

        if (contribution >= availableToFund) {
            contribution = availableToFund;
            project.status = ProjectStatus.ACTIVE;
            emit StatusChanged(_projectId, ProjectStatus.ACTIVE);
        }

        // Cập nhật state TRƯỚC khi chuyển tiền (chống hack)
        project.totalFunded += contribution;
        project.remainingBalance += contribution;
        contributions[_projectId][msg.sender] += contribution;

        // Kéo token bằng SafeERC20
        fundingToken.safeTransferFrom(msg.sender, address(this), contribution);

        // Bắt buộc phải emit sự kiện Contributed để Backend Indexer nhận diện
        emit Contributed(_projectId, msg.sender, contribution);
    }

    // ==========================================
    // 3. CHỦ DỰ ÁN RÚT TIỀN THEO CỘT MỐC
    // ==========================================
    function withdrawMilestone(uint256 _projectId) external nonReentrant {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.ACTIVE, "Project is not active");
        require(msg.sender == project.creator, "Only creator can withdraw");
        require(project.currentMilestone < projectMilestones[_projectId].length, "All milestones withdrawn");

        uint256 currentIdx = project.currentMilestone;
        Milestone storage milestone = projectMilestones[_projectId][currentIdx];

        require(block.timestamp >= milestone.releaseTime, "Milestone release time not reached");
        require(!milestone.isWithdrawn, "Milestone already withdrawn");

        milestone.isWithdrawn = true;
        project.currentMilestone++;
        project.remainingBalance -= milestone.amount;

        // Chuyển token bằng SafeERC20
        fundingToken.safeTransfer(project.creator, milestone.amount);

        emit MilestoneWithdrawn(_projectId, currentIdx, milestone.amount);
    }

    // ==========================================
    // 4. QUẢN TRỊ VIÊN HỦY / FAIL DỰ ÁN
    // ==========================================
    function adminCancelProject(uint256 _projectId) external onlyAdmin {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.ACTIVE || project.status == ProjectStatus.PROGRESS, "Cannot cancel this project");
        
        project.status = ProjectStatus.CANCELLED;
        emit StatusChanged(_projectId, ProjectStatus.CANCELLED);
    }

    function checkAndFailProject(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(project.status == ProjectStatus.PROGRESS, "Not in progress");
        require(block.timestamp > project.fundDeadline, "Deadline not passed yet");
        require(project.totalFunded < project.goal, "Goal was reached");

        project.status = ProjectStatus.FAILED;
        emit StatusChanged(_projectId, ProjectStatus.FAILED);
    }

    // ==========================================
    // 5. USER RÚT TIỀN (REFUND)
    // ==========================================
    function refund(uint256 _projectId) external nonReentrant {
        Project storage project = projects[_projectId];
        require(
            project.status == ProjectStatus.FAILED || project.status == ProjectStatus.CANCELLED,
            "Refund not available"
        );

        uint256 userContribution = contributions[_projectId][msg.sender];
        require(userContribution > 0, "No contribution to refund");

        uint256 amountToRefund = 0;

        if (project.status == ProjectStatus.FAILED) {
            amountToRefund = userContribution;
        } else if (project.status == ProjectStatus.CANCELLED) {
            amountToRefund = (userContribution * project.remainingBalance) / project.totalFunded;
        }

        contributions[_projectId][msg.sender] = 0;

        // Trả token bằng SafeERC20
        fundingToken.safeTransfer(msg.sender, amountToRefund);

        // Bắt buộc phải emit sự kiện Refunded
        emit Refunded(_projectId, msg.sender, amountToRefund);
    }
}