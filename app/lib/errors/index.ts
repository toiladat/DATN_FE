import { adminErrors } from './admin.errors'
import { authErrors } from './auth.errors'
import { categoryErrors } from './category.errors'
import { projectErrors } from './project.errors'
import { reviewErrors } from './review.errors'
import { uploadErrors } from './upload.errors'
import { userErrors } from './user.errors'

// Gom tất cả các error map từ các domain khác nhau vào một object duy nhất
export const ERROR_MESSAGES: Record<string, string> = {
  ...adminErrors,
  ...authErrors,
  ...categoryErrors,
  ...projectErrors,
  ...reviewErrors,
  ...uploadErrors,
  ...userErrors,

  // Các mã lỗi chung chung có thể để trực tiếp ở đây
  'Error.Unknown': 'Đã có lỗi không xác định xảy ra. Vui lòng thử lại.',
  'Error.Network': 'Lỗi kết nối mạng.'
}
