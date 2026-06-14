export const errorsEn = {
  // Admin & Auth
  'error.AdminInvalidCredentials': 'Incorrect admin credentials.',
  'error.AdminAccountDisabled': 'This admin account has been disabled.',
  'error.AdminRefreshTokenAlreadyUsed':
    'Admin session has expired or already been used.',
  'error.AdminUnauthorized':
    'You do not have permission to access the admin portal.',
  'error.RefreshTokenAlreadyUsed': 'Session expired or invalid.',
  'error.UnauthorizedAccess': 'You do not have access permission.',
  'error.InvalidWalletSignature': 'Invalid wallet signature.',
  'error.WalletAddressNotFound': 'Wallet address not found.',
  'error.WalletNonceNotFound': 'Wallet nonce not found.',
  'error.EmailAlreadyInUse':
    'This email is already registered by another account.',
  'error.UserIsBanned': 'Your account has been banned.',
  // Categories & Projects
  'error.FailedToFetchCategories': 'Failed to fetch campaign categories.',
  'error.ProjectNotFound': 'Project not found.',
  'error.UnauthorizedProjectAccess':
    'You do not have permission to access this project.',
  'error.UserKYCRequired':
    'You must complete email verification (KYC) before creating a project.',
  'error.InvalidProjectStatus': 'Invalid project status for this operation.',

  // Milestones
  'error.MilestoneNotFound': 'Requested project milestone not found.',
  'error.MilestoneNotUnlocked': 'This milestone has not been unlocked yet.',
  'error.MilestoneAlreadyFinalized':
    'This milestone has already been finalized.',
  'error.MilestoneNotApproved':
    'This milestone is not yet approved by the administrator.',
  'error.MilestoneAlreadyWithdrawn':
    'This milestone budget has already been withdrawn.',
  'error.DuplicateWithdrawalTransaction':
    'This withdrawal transaction is already submitted.',

  // Blockchain & Refunds
  'error.BlockchainCancelProjectFailed':
    'Failed to cancel the project on the blockchain escrow contract.',
  'error.ProjectNotRefundable':
    'Project is not failed or expired. Cannot issue refund.',
  'error.NoInvestmentsToRefund': 'No successful investments found to refund.',
  'error.BlockchainTxPendingOrFailed':
    'The transaction is pending or failed on the blockchain.',
  'error.BlockchainVerificationFailed':
    'Failed to verify transaction on the blockchain.',

  // Reviews & Uploads
  'error.ReviewNotFound': 'Review not found.',
  'error.UnauthorizedReviewAccess':
    'You do not have permission to edit this review.',
  'error.Upload.InvalidQuantity': 'Invalid file upload quantity.',
  'error.Upload.ProjectLimitExceeded':
    'Exceeded maximum project attachment file limit.',
  'error.Upload.InvalidType': 'Unsupported file upload format.',

  // Users & Systems
  'error.UserAlreadyExists': 'This email account is already in use.',
  'error.CannotUpdateAdminUser': 'Cannot edit administrator account details.',
  'error.CannotDeleteAdminUser': 'Cannot delete administrator account.',
  'error.CannotSetAdminRoleToUser':
    'You do not have permission to assign Administrator role.',
  'error.RoleNotFound': 'User role does not exist.',
  'error.CannotUpdateOrDeleteYourself':
    'You cannot update or delete your own account.',
  'error.UserNotFound': 'User account not found.',
  'error.ProjectNotFoundForUser': 'No projects found belonging to this user.',
  'error.NotFound': 'Requested record or resource not found.',
  'error.Unknown': 'An unknown error occurred. Please try again.',
  'error.Network': 'Network connection error.'
}
