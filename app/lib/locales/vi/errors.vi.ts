export const errorsVi = {
  // Admin & Auth
  'error.AdminInvalidCredentials': 'Thông tin đăng nhập Admin không chính xác.',
  'error.AdminAccountDisabled': 'Tài khoản Admin này đã bị vô hiệu hóa.',
  'error.AdminRefreshTokenAlreadyUsed':
    'Phiên đăng nhập Admin đã hết hạn hoặc đã được sử dụng.',
  'error.AdminUnauthorized': 'Bạn không có quyền truy cập trang quản trị.',
  'error.RefreshTokenAlreadyUsed':
    'Phiên đăng nhập đã hết hạn hoặc không hợp lệ.',
  'error.UnauthorizedAccess': 'Bạn không có quyền truy cập.',
  'error.InvalidWalletSignature': 'Chữ ký ví không hợp lệ.',
  'error.WalletAddressNotFound': 'Không tìm thấy địa chỉ ví.',
  'error.WalletNonceNotFound': 'Không tìm thấy Nonce cho ví này.',
  'error.EmailAlreadyInUse':
    'Email này đã được đăng ký bởi một tài khoản khác.',

  // Categories & Projects
  'error.FailedToFetchCategories': 'Lấy danh sách danh mục dự án thất bại.',
  'error.ProjectNotFound': 'Không tìm thấy dự án.',
  'error.UnauthorizedProjectAccess': 'Bạn không có quyền truy cập dự án này.',
  'error.UserKYCRequired':
    'Bạn phải hoàn tất xác thực email (KYC) trước khi tạo dự án.',
  'error.InvalidProjectStatus':
    'Trạng thái dự án không hợp lệ cho thao tác này.',

  // Milestones
  'error.MilestoneNotFound':
    'Không tìm thấy giai đoạn (milestone) được yêu cầu.',
  'error.MilestoneNotUnlocked': 'Giai đoạn này chưa được mở khóa.',
  'error.MilestoneAlreadyFinalized': 'Giai đoạn này đã kết thúc.',
  'error.MilestoneNotApproved': 'Giai đoạn này chưa được duyệt bởi Admin.',
  'error.MilestoneAlreadyWithdrawn': 'Giai đoạn này đã được rút tiền trước đó.',
  'error.DuplicateWithdrawalTransaction':
    'Giao dịch rút tiền này đã được gửi lên hệ thống.',

  // Blockchain & Refunds
  'error.BlockchainCancelProjectFailed': 'Hủy dự án trên Blockchain thất bại.',
  'error.ProjectNotRefundable':
    'Dự án chưa thất bại hoặc hết hạn. Không thể hoàn tiền.',
  'error.NoInvestmentsToRefund':
    'Không tìm thấy khoản đầu tư thành công nào để hoàn tiền.',
  'error.BlockchainTxPendingOrFailed':
    'Giao dịch đang chờ xử lý hoặc đã thất bại trên Blockchain.',
  'error.BlockchainVerificationFailed':
    'Xác minh giao dịch trên Blockchain thất bại.',

  // Reviews & Uploads
  'error.ReviewNotFound': 'Không tìm thấy đánh giá.',
  'error.UnauthorizedReviewAccess':
    'Bạn không có quyền chỉnh sửa đánh giá này.',
  'error.Upload.InvalidQuantity': 'Số lượng tệp tải lên không hợp lệ.',
  'error.Upload.ProjectLimitExceeded':
    'Vượt quá giới hạn số lượng tệp đính kèm của dự án.',
  'error.Upload.InvalidType': 'Định dạng tệp tải lên không được hỗ trợ.',

  // Users & Systems
  'error.UserAlreadyExists': 'Tài khoản email này đã được sử dụng.',
  'error.CannotUpdateAdminUser':
    'Không thể chỉnh sửa thông tin tài khoản Admin.',
  'error.CannotDeleteAdminUser': 'Không thể xóa tài khoản Admin.',
  'error.CannotSetAdminRoleToUser': 'Bạn không có quyền gán vai trò Admin.',
  'error.RoleNotFound': 'Vai trò người dùng không tồn tại.',
  'error.CannotUpdateOrDeleteYourself':
    'Bạn không thể tự cập nhật hoặc tự xóa tài khoản của chính mình.',
  'error.UserNotFound': 'Không tìm thấy tài khoản người dùng.',
  'error.ProjectNotFoundForUser':
    'Không tìm thấy dự án nào thuộc về người dùng này.',
  'error.NotFound': 'Không tìm thấy bản ghi hoặc tài nguyên yêu cầu.',
  'error.Unknown': 'Đã có lỗi không xác định xảy ra. Vui lòng thử lại.',
  'error.Network': 'Lỗi kết nối mạng.'
}
