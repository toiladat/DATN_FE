import { authErrors } from './auth.errors'
import { projectErrors } from './project.errors'
import { reviewErrors } from './review.errors'

// Gom tất cả các error map từ các domain khác nhau vào một object duy nhất
export const ERROR_MESSAGES: Record<string, string> = {
  ...authErrors,
  ...projectErrors,
  ...reviewErrors,

  // Các mã lỗi chung chung có thể để trực tiếp ở đây
  'Error.Unknown': 'Đã có lỗi không xác định xảy ra. Vui lòng thử lại.',
  'Error.Network': 'Lỗi kết nối mạng.'
}
