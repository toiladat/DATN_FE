export const projectErrors: Record<string, string> = {
  'Error.ProjectNotFound': 'Không tìm thấy dự án.',
  'Error.ProjectAlreadyExists': 'Dự án này đã tồn tại.',
  'Error.InvalidProjectData': 'Thông tin dự án không hợp lệ.',
  'Error.UnauthorizedProjectAccess': 'Bạn không có quyền truy cập dự án này.',
  'Error.InvalidProjectStatus':
    'Trạng thái dự án không hợp lệ cho thao tác này.',
  'Error.MilestoneNotFound':
    'Không tìm thấy giai đoạn (milestone) được yêu cầu.',
  'Error.MilestoneNotUnlocked': 'Giai đoạn này chưa được mở khóa.',
  'Error.MilestoneAlreadyFinalized': 'Giai đoạn này đã kết thúc.',
  'Error.MilestoneNotApproved': 'Giai đoạn này chưa được duyệt bởi Admin.',
  'Error.MilestoneAlreadyWithdrawn': 'Giai đoạn này đã được rút tiền trước đó.',
  'Error.DuplicateWithdrawalTransaction':
    'Giao dịch rút tiền này đã được gửi lên hệ thống.',
  'Error.BlockchainCancelProjectFailed': 'Hủy dự án trên Blockchain thất bại.',

  // Refund & Verification
  'Project is not failed or expired. Cannot refund.':
    'Dự án chưa thất bại hoặc hết hạn. Không thể hoàn tiền.',
  'No successful investments found to refund.':
    'Không tìm thấy khoản đầu tư thành công nào để hoàn tiền.',
  'Transaction is pending or failed on blockchain.':
    'Giao dịch đang chờ xử lý hoặc đã thất bại trên Blockchain.',
  'Failed to verify transaction on blockchain':
    'Xác minh giao dịch trên Blockchain thất bại.',

  // Reviews
  'Review not found': 'Không tìm thấy đánh giá.',
  'Unauthorized to modify this review':
    'Bạn không có quyền chỉnh sửa đánh giá này.'
}
