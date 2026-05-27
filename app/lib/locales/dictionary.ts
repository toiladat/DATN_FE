import { errorsVi } from './vi/errors.vi'
import { errorsEn } from './en/errors.en'

export const dictionary = {
  vi: {
    // Navigation / Header
    'nav.home': 'Trang chủ',
    'nav.projects': 'Dự án',
    'nav.launch_idea': 'Phát triển ý tưởng',
    'nav.my_projects': 'Dự án của tôi',
    'nav.connect_wallet': 'Kết nối ví',
    'nav.disconnect': 'Đăng xuất',
    'nav.profile': 'Tài khoản',
    'nav.my_investments': 'Khoản đầu tư',

    // Validation titles
    'validation.missing_required_fields': 'Thiếu thông tin bắt buộc',
    'validation.budget_mismatch': 'Ngân sách không khớp',
    'validation.budget_exceeded': 'Vượt quá ngân sách',
    'validation.member_added': 'Đã thêm thành viên',
    'validation.member_already_added': 'Thành viên đã tồn tại',
    'validation.missing_information': 'Thiếu thông tin',
    'validation.missing_role_description': 'Thiếu mô tả vai trò',

    // Form Zod validations
    title_required: 'Tiêu đề dự án không được để trống',
    subtitle_required: 'Phụ đề dự án không được để trống',
    primary_category_required: 'Vui lòng chọn danh mục chính',
    location_required: 'Địa điểm không được để trống',
    image_required: 'Vui lòng tải lên ít nhất 1 ảnh tham chiếu',
    funding_goal_positive: 'Mục tiêu gọi vốn phải là số tiền lớn hơn 0',
    start_date_required: 'Ngày bắt đầu không được để trống',
    end_date_required: 'Ngày kết thúc không được để trống',
    description_required: 'Mô tả dự án không được để trống',
    risks_required: 'Rủi ro & Thách thức không được để trống',

    milestone_name_required: 'Tên giai đoạn không được để trống',
    milestone_description_required: 'Mô tả giai đoạn không được để trống',
    milestone_duration_positive: 'Thời gian thực hiện phải lớn hơn 0 ngày',
    milestone_budget_positive: 'Ngân sách phân bổ phải lớn hơn 0',
    milestone_images_required:
      'Vui lòng tải lên ít nhất 1 ảnh minh họa cho giai đoạn',
    milestone_outcome_required: 'Kết quả đầu ra dự kiến không được để trống',

    member_id_required: 'ID thành viên không được để trống',
    member_name_required: 'Tên thành viên không được để trống',
    member_email_invalid: 'Địa chỉ email không hợp lệ',
    member_email_required: 'Email không được để trống',
    member_wallet_required: 'Địa chỉ ví không được để trống',

    // Step labels
    'step.basics': 'Thông tin cơ bản',
    'step.milestones': 'Giai đoạn dự án',
    'step.team': 'Đội ngũ',
    'step.attachments': 'Tài liệu đính kèm',
    'step.overview': 'Tổng quan',

    // Common buttons
    'btn.continue': 'Tiếp tục',
    'btn.back': 'Quay lại',
    'btn.cancel': 'Hủy bỏ',
    'btn.add': 'Thêm mới',
    'btn.update': 'Cập nhật',
    'btn.publish': 'Xuất bản',
    'btn.save': 'Lưu',
    'btn.discard_changes': 'Hủy bỏ thay đổi',
    'common.optional': 'không bắt buộc',
    'common.prev': 'Trước',
    'common.next': 'Sau',
    'common.pageOf': 'Trang {{current}} / {{total}}',
    'common.wizard': 'Trình hướng dẫn',

    // Milestones
    'milestones.title': 'Xác định giai đoạn dự án',
    'milestones.desc':
      'Chia dự án thành các giai đoạn nhỏ để dễ quản lý, tăng tính minh bạch và trách nhiệm giải trình.',
    'milestones.totalBudget': 'Tổng ngân sách phân bổ',
    'milestones.remainingBudget': 'Còn lại: €{{remaining}}',
    'milestones.executionTime': 'Thời gian thực hiện',
    'milestones.totalDuration': '{{duration}} Ngày',
    'milestones.remainingDuration': 'Còn lại: {{remaining}} Ngày',
    'milestones.noMaxDuration':
      'Tổng số giai đoạn: {{count}} (Không giới hạn thời gian)',
    'milestones.name': 'Tên giai đoạn',
    'milestones.namePlaceholder': 'Ví dụ: Giai đoạn 1: Phát triển MVP',
    'milestones.description': 'Mô tả chi tiết',
    'milestones.descriptionPlaceholder':
      'Chi tiết các công việc cụ thể và yêu cầu kỹ thuật...',
    'milestones.duration': 'Thời gian thực hiện (Ngày)',
    'milestones.durationHelper':
      'Thời gian dự kiến để hoàn thành giai đoạn này.',
    'milestones.budget': 'Phân bổ ngân sách (€)',
    'milestones.budgetHelper': 'Không được vượt quá tổng mục tiêu gọi vốn.',
    'milestones.advantages': 'Ưu thế / Thuận lợi (Tùy chọn)',
    'milestones.challenges': 'Thách thức / Khó khăn (Tùy chọn)',
    'milestones.referenceImage': 'Hình ảnh tham khảo',
    'milestones.expectedOutcome': 'Kết quả kỳ vọng',
    'milestones.expectedOutcomePlaceholder':
      'Mô tả kết quả kỳ vọng và các sản phẩm bàn giao của giai đoạn này...',
    'milestones.adminWarning':
      'Đội ngũ admin sẽ kiểm duyệt khi đến deadline và sẽ approve hay deny dựa theo kết quả hoàn thành theo từng giai đoạn, do đó cần xác định kỹ thông tin này.',
    'milestones.cancelEdit': 'Hủy chỉnh sửa',
    'milestones.uploading': 'Đang tải lên...',
    'milestones.update': 'Cập nhật giai đoạn',
    'milestones.add': 'Thêm giai đoạn',
    'milestones.pipeline': 'Sơ đồ giai đoạn',
    'milestones.empty': 'Chưa có giai đoạn nào được thêm.',
    'milestones.emptyHint': 'Điền biểu mẫu bên trái để thêm giai đoạn',
    'milestones.continueToTeam': 'Tiếp tục thiết lập Đội ngũ',

    // Basics
    'basics.title': 'Thiết lập cơ bản',
    'basics.desc':
      'Giúp mọi người tìm hiểu về dự án của bạn dễ dàng hơn. Thông tin này sẽ xuất hiện trên trang dự án và trong kết quả tìm kiếm.',
    'basics.projectTitle': 'Tiêu đề dự án',
    'basics.projectTitleDesc':
      'Tạo tiêu đề và phụ đề rõ ràng, súc tích để giải thích những gì bạn đang tạo ra.',
    'basics.fieldTitle': 'Tiêu đề',
    'basics.fieldSubtitle': 'Phụ đề',
    'basics.titlePlaceholder': 'Vùng đất vĩnh hằng: Trải nghiệm điện ảnh Web3',
    'basics.subtitlePlaceholder':
      'Một cuộc hành trình đắm chìm qua FundHive, tận dụng giao diện đa chiều và tính bảo mật của hợp đồng thông minh.',
    'basics.projectCategory': 'Danh mục dự án',
    'basics.projectCategoryDesc':
      'Chọn các danh mục mô tả tốt nhất dự án của bạn để giúp nhà đầu tư dễ dàng tìm thấy.',
    'basics.primaryCategory': 'Danh mục chính',
    'basics.secondaryCategory': 'Danh mục phụ (Không bắt buộc)',
    'basics.selectCategory': 'Chọn danh mục',
    'basics.loadingCategories': 'Đang tải danh mục...',
    'basics.noCategories': 'Không tìm thấy danh mục nào',
    'basics.projectLocation': 'Vị trí dự án',
    'basics.projectLocationDesc':
      'Dự án của bạn được đặt ở đâu? Điều này giúp chúng tôi phân phối dự án theo khu vực cho các nhà đầu tư tiềm năng.',
    'basics.searchLocationPlaceholder': 'Tìm kiếm thành phố hoặc quốc gia',
    'basics.projectMedia': 'Phương tiện truyền thông',
    'basics.projectMediaDesc':
      'Hình ảnh là phần quan trọng nhất trong việc trình bày dự án của bạn. Hình ảnh chất lượng cao giúp tăng tỷ lệ đầu tư lên 80%.',
    'basics.referenceImage': 'Ảnh đại diện / Ảnh minh họa (Bắt buộc)',
    'basics.uploadingImages': 'Đang tải lên hình ảnh...',
    'basics.projectVideo': 'Video giới thiệu dự án (Không bắt buộc)',
    'basics.uploadingVideo': 'Đang tải lên video, vui lòng đợi...',
    'basics.videoSelected': 'Đã chọn video. Click để thay đổi.',
    'basics.videoHelper':
      'Tối đa 100MB. Định dạng MP4, WEBM hoặc MOV. Khuyên dùng độ phân giải cao.',
    'basics.videoUploading': 'Đang tải...',
    'basics.videoChange': 'Thay đổi',
    'basics.videoUpload': 'Tải lên',
    'basics.videoNotSupported': 'Trình duyệt của bạn không hỗ trợ thẻ video.',
    'basics.removeVideo': 'Gỡ bỏ Video',
    'basics.projectStory': 'Câu chuyện dự án',
    'basics.projectStoryDesc':
      'Kể cho cả thế giới biết về những gì bạn đang xây dựng. Hãy minh bạch về những rủi ro và thách thức.',
    'basics.projectDescription': 'Mô tả chi tiết dự án',
    'basics.projectDescriptionPlaceholder':
      'Bắt đầu viết câu chuyện dự án của bạn tại đây...',
    'basics.risks': 'Rủi ro & Thách thức',
    'basics.risksPlaceholder':
      'Minh bạch về các rào cản kỹ thuật tiềm ẩn, rủi ro thị trường hoặc thách thức pháp lý...',
    'basics.fundingGoal': 'Mục tiêu gọi vốn',
    'basics.fundingGoalDesc':
      "Đặt một mục tiêu vừa tham vọng vừa thực tế. Hãy nhớ chính sách 'được ăn cả ngã về không' của chúng tôi.",
    'basics.allOrNothing': 'Được ăn cả ngã về không',
    'basics.allOrNothingDesc':
      'Nếu bạn không đạt được mục tiêu gọi vốn trước thời hạn, tất cả các khoản đóng góp sẽ tự động được hoàn trả và bạn sẽ không nhận được bất kỳ khoản tiền nào.',
    'basics.targetLaunchDate': 'Ngày phát động dự kiến',
    'basics.targetLaunchDateDesc':
      'Không bắt buộc. Đặt ngày mục tiêu để đi đúng hướng. Điều này có thể được thay đổi sau.',
    'basics.selectDate': 'Chọn ngày',
    'basics.pickDate': 'Chọn ngày phát động dự kiến',
    'basics.recommendedTimeline': 'Mốc thời gian khuyến khích',
    'basics.recommendedTimelineDesc':
      'Chúng tôi khuyên bạn nên có giai đoạn chuẩn bị kéo dài 3 tuần để thu hút sự chú ý trước khi chiến dịch bắt đầu.',
    'basics.campaignDuration': 'Thời lượng chiến dịch',
    'basics.campaignDurationDesc':
      'Hầu hết các chiến dịch thành công kéo dài từ 30 đến 45 ngày.',
    'basics.fixedDays': 'Thời lượng số ngày cố định',
    'basics.fixedDaysDesc': 'Đặt khoảng thời gian cụ thể (1-60 ngày)',
    'basics.endSpecificDate': 'Kết thúc vào một ngày cụ thể',
    'basics.endSpecificDateDesc': 'Chọn một ngày cụ thể trên lịch',
    'basics.selectEndDate': 'Chọn ngày kết thúc',
    'basics.continueToMilestones': 'Tiếp tục thiết lập Giai đoạn',

    // Team
    'team.title': 'Xây dựng đội ngũ',
    'team.desc':
      'Thêm các thành viên cốt lõi để xây dựng lòng tin với nhà đầu tư. Cơ cấu đội ngũ minh bạch giúp tăng 40% tỷ lệ gọi vốn thành công.',
    'team.contributorDetails': 'Thông tin thành viên',
    'team.searchLabel': 'Tìm kiếm thành viên trên hệ thống',
    'team.searchPlaceholder': 'Tên người dùng, ví hoặc email...',
    'team.searching': 'Đang tìm kiếm cơ sở dữ liệu...',
    'team.noEmail': 'Không có email',
    'team.noUserFound': 'Không tìm thấy người dùng nào trên hệ thống.',
    'team.fullName': 'Họ và tên',
    'team.populatePlaceholder': 'Tìm kiếm ở trên để tự động điền...',
    'team.emailAddress': 'Địa chỉ Email',
    'team.walletAddress': 'Địa chỉ ví',
    'team.role': 'Vai trò / Chức vụ',
    'team.selectRole': 'Chọn vai trò',
    'team.roleDesc': 'Mô tả công việc',
    'team.roleDescPlaceholder':
      'Mô tả ngắn gọn trách nhiệm và đóng góp của họ...',
    'team.addMember': 'Thêm thành viên',
    'team.activeRoster': 'Danh sách thành viên',
    'team.membersCount': '({{count}} thành viên)',
    'team.empty': 'Chưa có thành viên nào được thêm vào đội ngũ.',
    'team.continueToAttachments': 'Tiếp tục thiết lập Tài liệu đính kèm',
    'team.role.founder': 'Người sáng lập',
    'team.role.leaddeveloper': 'Lập trình viên chính',
    'team.role.designer': 'Thiết kế',
    'team.role.marketing': 'Truyền thông & Tiếp thị',
    'team.role.advisor': 'Cố vấn',

    // Attachments

    'attachments.title': 'Thông tin minh chứng',
    'attachments.desc':
      'Tải lên các tài liệu hỗ trợ — chứng chỉ, danh mục sản phẩm, CV hoặc kế hoạch kinh doanh. Những tài liệu này giúp nhà đầu tư xác minh năng lực và tin tưởng vào đội ngũ của bạn.',
    'attachments.category': 'Thể loại',
    'attachments.typeName': 'Tên loại tài liệu',
    'attachments.typeNamePlaceholder':
      'Ví dụ: Giải thưởng, Báo chí, Bản thử nghiệm...',
    'attachments.description': 'Mô tả ngắn',
    'attachments.descriptionPlaceholder':
      'Ví dụ: Kiến trúc sư giải pháp AWS 2024...',
    'attachments.dragDrop': 'Kéo & thả tệp vào đây',
    'attachments.dropHere': 'Thả các tệp vào đây',
    'attachments.browse': 'chọn từ máy',
    'attachments.orBrowse': 'hoặc {{browse}} để tải lên',
    'attachments.constraints':
      'JPG, PNG, WEBP, GIF, PDF, DOC, DOCX — tối đa {{max}}MB mỗi tệp',
    'attachments.filesUsed': 'Đã dùng {{count}}/{{max}} tệp',
    'attachments.empty': 'Chưa có tài liệu nào được tải lên.',
    'attachments.emptySub':
      'Bước này không bắt buộc — nhưng được khuyến nghị nhằm gia tăng độ tin cậy.',
    'attachments.editTitle': 'Chỉnh sửa tài liệu',
    'attachments.editTypeNameRequired':
      'Vui lòng nhập tên cho loại tài liệu này.',
    'attachments.completeSetup': 'Hoàn tất thiết lập',
    'toast.unsupported_file':
      '{{name}}: Định dạng tệp không được hỗ trợ. Sử dụng JPG, PNG, WEBP, GIF hoặc PDF.',
    'toast.file_size_exceeded': '{{name}}: Tệp vượt quá giới hạn {{max}}MB.',
    'toast.max_files_exceeded': 'Bạn chỉ có thể tải lên tối đa {{max}} tệp.',
    'toast.presign_failed': 'Không thể lấy link tải lên. Vui lòng thử lại.',
    'toast.upload_progress_failed': 'Tải lên thất bại',
    'toast.upload_single_failed': 'Tải lên tệp {{name}} thất bại.',
    'toast.upload_success_vi_1': 'Đã tải lên tệp thành công.',
    'toast.upload_success_vi_many': 'Đã tải lên {{count}} tệp thành công.',

    'btn.edit': 'Chỉnh sửa',
    'btn.delete': 'Xóa',

    // Toast details
    'toast.budget_mismatch_desc':
      'Tổng ngân sách của các giai đoạn ({{total}}) phải khớp hoàn toàn với mục tiêu gọi vốn của dự án ({{goal}}).',
    'toast.publish_success':
      'Dự án đã được xuất bản thành công! Admin sẽ xem xét và phê duyệt dự án của bạn trong vòng 48 giờ tới.',
    'toast.publish_error': 'Có lỗi xảy ra trong quá trình xuất bản dự án.',
    'toast.complete_required_fields':
      'Vui lòng hoàn thành đầy đủ tất cả các trường bắt buộc trước khi xuất bản.',
    'toast.select_member_desc':
      'Vui lòng tìm kiếm và chọn một thành viên trên hệ thống để điền các thông tin bắt buộc.',
    'toast.role_desc_required':
      'Vui lòng cung cấp một mô tả ngắn gọn về trách nhiệm của thành viên này.',
    'toast.member_exists_desc':
      'Thành viên này đã được thêm vào danh sách đội ngũ.',
    'toast.member_added_success':
      '{{name}} hiện đã là một phần của đội ngũ dự án.',
    'toast.milestone_budget_exceeded_desc':
      'Giai đoạn này vượt quá ngân sách còn lại (€{{remaining}}).',
    'toast.upload_failed': 'Tải lên thất bại',
    'toast.upload_failed_desc': 'Không thể tải lên một số hình ảnh.',
    'toast.video_too_large': 'Video quá lớn',
    'toast.video_too_large_desc': 'Dung lượng tối đa là 100MB.',
    'toast.uploading_video': 'Đang tải video lên...',
    'toast.video_uploaded_success': 'Đã tải video lên thành công!',
    'toast.video_upload_failed': 'Tải video thất bại',
    'toast.video_upload_failed_desc': 'Vui lòng thử lại với định dạng khác.',
    'toast.milestone_updated': 'Đã cập nhật giai đoạn thành công!',
    'toast.milestone_added': 'Đã thêm giai đoạn thành công!',
    'toast.save_success': 'Lưu cài đặt thành công!',

    // Profile Translations
    'profile.identity_details': 'Thông tin cá nhân',
    'profile.display_name': 'Tên hiển thị',
    'profile.display_name_placeholder': 'Tên công khai của bạn',
    'profile.email_address': 'Địa chỉ email',
    'profile.email_placeholder': 'tenb@example.com',
    'profile.btn_verify': 'Xác thực',
    'profile.btn_verified': 'Đã xác thực',
    'profile.btn_confirm': 'Xác nhận',
    'profile.phone_number': 'Số điện thoại',
    'profile.phone_placeholder': '+84 900-000-000',
    'profile.location': 'Vị trí địa lý',
    'profile.location_placeholder': 'Tìm kiếm thành phố hoặc quốc gia',
    'profile.biography': 'Tiểu sử',
    'profile.biography_placeholder': 'Hãy giới thiệu bản thân với cộng đồng...',
    'profile.biography_desc':
      'Mô tả ngắn gọn về kinh nghiệm hoặc sở thích của bạn.',
    'profile.presence_links': 'Sự hiện diện & Liên kết',
    'profile.website': 'Trang web cá nhân',
    'profile.platform': 'Nền tảng',
    'profile.social_links': 'Liên kết mạng xã hội',
    'profile.btn_add_link': 'Thêm liên kết',
    'profile.social_url_placeholder': 'Đường dẫn liên kết https://',
    'profile.remove_link': 'Xóa liên kết',
    'profile.avatar_title': 'Ảnh đại diện',
    'profile.avatar_formats': 'JPEG, PNG, hoặc WebP. Kích thước tối đa: 15MB.',
    'profile.btn_uploading': 'Đang tải lên...',
    'profile.btn_select_file': 'Chọn tệp ảnh',
    'profile.unsaved_changes': 'Thay đổi chưa lưu',
    'profile.unsaved_changes_desc':
      'Xem lại thông tin trước khi cập nhật lên mạng lưới.',
    'profile.btn_saving': 'Đang lưu...',
    'profile.btn_save_settings': 'Lưu cài đặt',
    'toast.save_error': 'Đã xảy ra lỗi khi lưu cài đặt.',
    'toast.email_required': 'Vui lòng nhập địa chỉ email trước khi xác thực.',
    'toast.otp_sent_success': 'Đã gửi mã OTP đến email của bạn thành công!',
    'toast.otp_sent_failed': 'Gửi mã OTP thất bại.',
    'toast.otp_length_error': 'Vui lòng nhập đầy đủ mã OTP 6 chữ số.',
    'toast.kyc_verified_success': 'Xác thực email KYC thành công!',
    'toast.kyc_verified_failed':
      'Xác thực thất bại, mã OTP không hợp lệ hoặc đã hết hạn.',
    'toast.connect_wallet_required': 'Vui lòng kết nối ví trước!',
    'toast.target_launch_date_past':
      'Ngày Target Launch Date đã qua! Vui lòng chọn ngày bắt đầu dự án ở tương lai hoặc bật Demo Mode.',
    'toast.milestone_time_invalid':
      'Thời gian Giai đoạn {{order}} không hợp lệ (phải sau ngày kết thúc gọi vốn và sau Giai đoạn trước đó)',
    'toast.milestone_total_mismatch':
      'Tổng tiền các Giai đoạn không khớp với Mục tiêu gọi vốn!',
    'toast.confirm_tx_wallet': 'Vui lòng xác nhận giao dịch trên ví...',
    'toast.waiting_tx_mined': 'Đang chờ giao dịch được hoàn thành...',
    'toast.launch_blockchain_success':
      'Dự án đã được Launch lên Blockchain thành công!',
    'toast.contract_call_error': 'Có lỗi xảy ra khi gọi hợp đồng thông minh',
    'toast.invalid_amount': 'Vui lòng nhập số tiền hợp lệ',
    'toast.amount_exceeds_remaining':
      'Bạn chỉ có thể đầu tư tối đa €{{remaining}} (số tiền còn thiếu của dự án)',
    'toast.insufficient_balance': 'Số dư không đủ',
    'toast.waiting_approve_tx': 'Đang chờ phê duyệt (approve) giao dịch...',
    'toast.confirming_investment_chain': 'Đang xác nhận đầu tư trên chuỗi...',
    'toast.invest_error': 'Đã có lỗi xảy ra khi đầu tư',

    // Overview
    'overview.projectOverview': 'Tổng quan dự án',
    'overview.kyc_warning_title': 'Yêu Cầu Xác Thực Email (KYC)',
    'overview.kyc_warning_desc':
      'Bạn cần hoàn tất xác thực địa chỉ email trong trang Cá nhân của mình trước khi có thể xuất bản dự án kêu gọi vốn.',
    'overview.kyc_warning_btn': 'Xác thực ngay',
    'overview.completeRequiredSections':
      'Hoàn thành các mục bắt buộc trước khi xuất bản. Tài liệu đính kèm là không bắt buộc nhưng giúp tăng lòng tin của nhà đầu tư.',
    'overview.sectionsComplete': 'phần hoàn thành',
    'overview.publishProject': 'Xuất bản dự án',
    'overview.lastUpdated': 'Cập nhật',
    'overview.justNow': 'vừa xong',
    'overview.stepBasicsDesc': 'Đặt tên dự án, tải lên hình ảnh hoặc video...',
    'overview.stepMilestonesDesc': 'Xác định các giai đoạn dự án của bạn...',
    'overview.stepTeamDesc': 'Chỉnh sửa hồ sơ và thêm thành viên hợp tác.',
    'overview.stepAttachmentsDesc':
      'Tải lên chứng chỉ, danh mục sản phẩm, CV hoặc kế hoạch kinh doanh.',
    'status.complete': 'Đã hoàn thành',
    'status.in_progress': 'Đang thực hiện',
    'status.not_started': 'Chưa bắt đầu',
    'status.optional': 'Tùy chọn',

    // My Projects / Kanban
    'my_project.board_title': 'Bảng Dự Án',
    'my_project.new_project': 'Dự án mới',
    'my_project.empty': 'Trống',
    'my_project.syncing': 'Đang đồng bộ...',
    'my_project.confirm_delete': 'Bạn có chắc chắn muốn xóa dự án này không?',
    'my_project.delete_success': 'Xóa dự án thành công',
    'my_project.delete_error': 'Xóa dự án thất bại',
    'my_project.not_found': 'Không tìm thấy dự án',
    'my_project.back_to_my_projects': 'Quay lại dự án của tôi',
    'my_project.my_projects': 'Dự án của tôi',

    // Kanban Columns / Status
    'status.pending': 'Chờ phê duyệt',
    'status.progress': 'Đang gọi vốn',
    'status.active': 'Hoạt động',
    'status.success': 'Thành công',
    'status.rejected': 'Bị từ chối',
    'status.approved': 'Đã duyệt',

    // Kanban Card
    'kanban.duration': 'Thời hạn',
    'kanban.milestones': 'giai đoạn',
    'kanban.Milestones': 'Giai đoạn',
    'kanban.funded': 'được gọi vốn',
    'kanban.view_details': 'Xem chi tiết',
    'kanban.delete_project': 'Xóa dự án',
    'kanban.update_progress': 'Cập nhật tiến độ',

    // Invested
    'invested.title_main': 'Khoản đầu tư',
    'invested.title_my': 'của tôi',
    'invested.desc':
      'Theo dõi và quản lý các dự án bạn đã đầu tư. Giám sát tiến độ, mục tiêu gọi vốn và các giai đoạn hoạt động.',
    'invested.time_range': 'Khoảng thời gian',
    'invested.all_time': 'Tất cả thời gian',
    'invested.last_30_days': '30 ngày qua',
    'invested.this_year': 'Năm nay',
    'invested.syncing': 'Đang đồng bộ dữ liệu đầu tư...',
    'invested.error':
      'Không thể tải danh mục đầu tư của bạn. Vui lòng thử lại sau.',
    'invested.no_investments_yet': 'Chưa có khoản đầu tư nào',
    'invested.no_investments_desc':
      'Bạn chưa đầu tư vào dự án nào. Hãy khám phá các ý tưởng sáng tạo và bắt đầu xây dựng danh mục đầu tư của mình ngay hôm nay.',
    'invested.history': 'Lịch sử đầu tư',
    'invested.projects_counter': '{{count}} Dự án',
    'invested.no_projects_found':
      'Không tìm thấy khoản đầu tư nào trong khoảng thời gian này.',

    // InvestedStats
    'stats.total_invested': 'Tổng số tiền đầu tư',
    'stats.projects_backed': 'Dự án đã đầu tư',
    'stats.no_data': 'Không có dữ liệu để hiển thị',
    'stats.projects_plural': 'dự án',
    'stats.funding': 'Gọi vốn',
    'stats.failed': 'Thất bại',

    // CompactCard & Refund
    'compact.reason': 'Lý do:',
    'compact.refunded': 'Đã hoàn trả',
    'refund.confirm_tx': 'Vui lòng xác nhận giao dịch trên ví...',
    'refund.tx_sent': 'Giao dịch đã được gửi, đang chờ mạng lưới xác nhận...',
    'refund.success': 'Rút tiền hoàn trả thành công!',
    'refund.error': 'Đã xảy ra lỗi khi hoàn tiền.',
    'refund.processing': 'Đang xử lý...',
    'refund.claim': 'Nhận hoàn trả',

    // Landing / Hero
    'hero.badge': 'Cổng gọi vốn Web3 — Đã hoạt động',
    'hero.titleMain': 'Tương lai của',
    'hero.titleHighlight': 'Gọi vốn',
    'hero.titleEnd': 'Phi tập trung.',
    'hero.subtitle':
      'Khởi tạo, khám phá và đầu tư vào các dự án blockchain triển vọng nhất. Hoàn toàn on-chain. Không trung gian. Kỷ nguyên gọi vốn minh bạch mới.',
    'hero.btn.launch': 'Phát triển ý tưởng',
    'hero.btn.explore': 'Khám phá dự án',
    'hero.stats.poolValue': '$42Tr+',
    'hero.stats.poolLabel': 'Tổng giá trị tài sản khóa (TVL)',
    'hero.stats.title': '100% On-Chain',
    'hero.stats.tag': 'Không rủi ro lưu ký',

    // Landing / Featured Pools
    'landing.featured_pools': 'Bể quỹ nổi bật',
    'landing.featured_pools_desc':
      'Các dự án phi tập trung đã được kiểm duyệt, sẵn sàng tiếp nhận vốn đầu tư hoặc đã được xây dựng thành công. Quản trị bằng hợp đồng thông minh, minh bạch với thế giới.',
    'landing.view_all_pools': 'Xem tất cả bể quỹ',
    'landing.no_active_projects': 'Không tìm thấy dự án nào đang hoạt động.',

    // Landing / How it works
    'landing.how_it_works': 'Quy trình hoạt động',
    'landing.how_it_works_desc':
      'Tham gia vào tương lai của nguồn vốn phi tập trung chỉ với ba bước đơn giản. An toàn, minh bạch và trực tiếp.',
    'landing.step1_title': 'Gửi dự án của bạn',
    'landing.step1_desc':
      'Hoàn tất quy trình giới thiệu tinh gọn. Xác định tầm nhìn, tokenomics và các giai đoạn phát triển.',
    'landing.step2_title': 'Kiểm duyệt cộng đồng',
    'landing.step2_desc':
      'Hội đồng phi tập trung và cộng đồng cùng đánh giá dự án của bạn về tính khả thi và tính toàn vẹn.',
    'landing.step3_title': 'Khởi chạy & Gọi vốn',
    'landing.step3_desc':
      'Lên sóng on-chain. Người ủng hộ cam kết chuyển tiền vào hợp đồng thông minh ràng buộc theo tiến độ giai đoạn.',

    // Landing / Features
    'landing.features_title': 'Sự tin cậy nằm trong',
    'landing.features_title_highlight': 'Mã nguồn.',
    'landing.features_desc':
      "Không giống như gọi vốn truyền thống, FundHive loại bỏ yếu tố 'tin tưởng mù quáng'. Mọi cam kết được điều hành bởi mã nguồn bất biến, được kiểm toán bởi các hãng bảo mật hàng đầu.",
    'landing.feature1_title': 'Hợp đồng ký quỹ phi lưu ký',
    'landing.feature1_desc':
      'Vốn được giữ trong hợp đồng thông minh đã kiểm toán. Không đội ngũ nào có thể rút vốn trước khi các giai đoạn được phê duyệt.',
    'landing.feature2_title': 'Quản trị DAO',
    'landing.feature2_desc':
      'Người nắm giữ token bỏ phiếu phê duyệt dự án, giải ngân quỹ và nâng cấp giao thức.',
    'landing.feature3_title': 'Phân tích thời gian thực',
    'landing.feature3_desc':
      'Theo dõi tiến độ gọi vốn, phân bổ token và hoạt động on-chain thông qua các bảng điều khiển trực tiếp.',
    'landing.feature4_title': 'Bảo mật đa kiểm toán',
    'landing.feature4_desc':
      'Mọi hợp đồng thông minh đều trải qua nhiều đợt kiểm toán bảo mật độc lập trước khi triển khai.',

    // Landing / CTA Banner
    'landing.cta_title': 'Sẵn sàng bắt đầu hành trình?',
    'landing.cta_desc':
      'Kết nối ví của bạn và tham gia cuộc cách mạng đổi mới phi tập trung ngay hôm nay.',
    'landing.cta_btn_connect': 'Kết nối ví ngay',
    'landing.cta_btn_contact': 'Liên hệ tư vấn',

    // Footer
    'footer.desc':
      'Nền tảng phóng ý tưởng phi tập trung trao quyền cho thế hệ dự án blockchain tiếp theo với sự minh bạch và quản trị cộng đồng.',
    'footer.ecosystem': 'Hệ sinh thái',
    'footer.community': 'Cộng đồng',
    'footer.legal': 'Pháp lý & Thông tin',
    'footer.rights': 'Mọi quyền được bảo lưu.',

    // Search Filter
    'search.badge': 'FundHive / Dự án',
    'search.title': 'Dự án Hệ sinh thái',
    'search.placeholder': 'Tìm kiếm dự án...',
    'search.sort.trending': 'Xu hướng',
    'search.sort.newest': 'Mới nhất',
    'search.sort.most_funded': 'Góp vốn nhiều nhất',
    'search.category.all': 'Tất cả',
    'search.searching': 'Đang tìm kiếm...',
    'search.no_results': 'Không tìm thấy dự án nào cho',
    'search.status.funding': 'ĐANG GỌI VỐN',
    'search.status.active': 'HOẠT ĐỘNG',

    // Categories
    'category.art-design': 'Nghệ thuật & Thiết kế',
    'category.comics-illustration': 'Truyện tranh & Minh họa',
    'category.games-web3': 'Trò chơi & Web3',
    'category.music-audio': 'Âm nhạc & Âm thanh',
    'category.technology': 'Công nghệ',

    // Dropdown / Wallet / Theme
    'nav.wrong_network': 'Sai mạng',
    'nav.verify_account_tooltip': 'Vui lòng xác thực tài khoản',
    'nav.appearance': 'Giao diện',
    'nav.appearance.light': 'Sáng',
    'nav.appearance.dark': 'Tối',
    'nav.appearance.system': 'Hệ thống',
    'nav.language': 'Ngôn ngữ',

    // AI Assistant
    'ai.assistant_title': 'Trợ Lý Ảo FundHive',
    'ai.online': 'Trực tuyến',
    'ai.greeting':
      'Xin chào! Tôi là Trợ Lý Ảo FundHive.\n\nTôi sẵn sàng giải đáp mọi thắc mắc của bạn về quy tắc đầu tư mUSDT, cơ chế hoàn tiền (Refund) khi dự án gọi vốn thất bại, và quy trình giải ngân Milestone an toàn trên nền tảng.\n\nHôm nay bạn cần tôi hỗ trợ thông tin gì?',
    'ai.clear_confirm':
      'Bạn có chắc chắn muốn làm mới cuộc hội thoại này không?',
    'ai.clear_success':
      'Lịch sử cuộc trò chuyện đã được làm mới. Tôi sẵn sàng hỗ trợ những câu hỏi tiếp theo của bạn!',
    'ai.placeholder': 'Hỏi Trợ Lý FundHive...',
    'ai.thinking': 'Trợ lý đang suy nghĩ...',
    'ai.footnote': 'Hỗ trợ giải đáp thông tin FundHive trực tuyến',
    'ai.faq_usdt_label': '⚡ Nạp mUSDT',
    'ai.faq_usdt_q': 'Đồng mUSDT là gì? Cách lấy mUSDT thử nghiệm để đầu tư?',
    'ai.faq_refund_label': '🛡️ Luật Hoàn Tiền',
    'ai.faq_refund_q':
      'Nếu dự án gọi vốn thất bại thì tiền đầu tư của tôi có được hoàn lại không?',
    'ai.faq_milestone_label': '📦 Giải ngân Milestone',
    'ai.faq_milestone_q':
      'Cơ chế giải ngân Milestone bảo vệ nhà đầu tư như thế nào?',
    'ai.faq_about_label': '🌐 FundHive là gì?',
    'ai.faq_about_q': 'Giới thiệu tổng quan về FundHive',
    'ai.toast_empty': '⚠️ Tin nhắn trống. Vui lòng nhập câu hỏi.',
    'ai.raised': 'Đã gọi:',
    'ai.view': 'Xem',
    'ai.project_error': '[Lỗi hiển thị dự án]',
    'ai.toast_wallet_copied': 'Đã sao chép địa chỉ ví thành công!',
    'ai.wallet_tooltip': 'Nhấp để sao chép địa chỉ ví',
    'ai.tx_tooltip': 'Xem biên lai trên Etherscan Sepolia Explorer',
    'ai.member': 'Thành viên',
    'ai.guest': 'Chế độ khách vãng lai',
    'ai.clear_tooltip': 'Làm mới lịch sử chat',
    'ai.suggested_questions': 'Câu hỏi gợi ý:',
    'ai.tooltip': 'Trợ lý ảo AI',
    'ai.error_connect':
      '⚠️ Không thể kết nối với máy chủ AI. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.',
    // How It Works / Quy trình
    'nav.how_it_works': 'Quy trình',
    'how.title': 'Cách hoạt động & Điều khoản FundHive',
    'how.subtitle':
      'Hướng dẫn từng bước giúp người sáng lập gọi vốn và người ủng hộ đầu tư an tâm, minh bạch qua 4 giai đoạn đơn giản.',
    'how.step.1': '01. Đăng ký & Tạo dự án',
    'how.step.2': '02. Gây quỹ',
    'how.step.3': '03. Triển khai & Nhận vốn',
    'how.step.4': '04. Rút quỹ & Hoàn tiền',

    // Step 1 Details
    'how.phase1.title': 'Bước 1: Soạn thảo ý tưởng & Kích hoạt',
    'how.phase1.subtitle':
      'Người sáng lập (Creator) thiết lập hồ sơ dự án qua 5 bước đơn giản trên website và kích hoạt chiến dịch lên mạng lưới blockchain.',
    'how.phase1.step1.title': '1. Điền thông tin cơ bản',
    'how.phase1.step1.desc':
      'Đặt tên dự án, viết mô tả ngắn, đăng tải hình ảnh và video giới thiệu. Quyết định số vốn cần kêu gọi (bằng USDT) và thời hạn gây quỹ.',
    'how.phase1.step2.title': '2. Chia nhỏ các giai đoạn (Cột mốc)',
    'how.phase1.step2.desc':
      'Chia dự án thành nhiều cột mốc phát triển. Với mỗi mốc, bạn điền số ngày thực hiện, sản phẩm dự kiến bàn giao và số tiền cần để làm mốc đó. Tổng tiền của tất cả cột mốc phải bằng đúng số vốn bạn kêu gọi ban đầu.',
    'how.phase1.step3.title': '3. Giới thiệu đội ngũ',
    'how.phase1.step3.desc':
      'Điền tên, vai trò cụ thể, email và liên kết ví điện tử của từng thành viên để tạo sự tin tưởng tuyệt đối với người đầu tư.',
    'how.phase1.step4.title': '4. Đính kèm tài liệu chi tiết',
    'how.phase1.step4.desc':
      'Tải lên bản kế hoạch kinh doanh hoặc tài liệu giới thiệu chi tiết (tối đa 10 tài liệu, dưới 10MB mỗi tệp) để người đầu tư tham khảo.',
    'how.phase1.step5.title': '5. Admin duyệt & Kích hoạt Blockchain',
    'how.phase1.step5.desc':
      'Dự án sẽ được gửi đến Ban quản trị (Admin) kiểm duyệt thông tin để tránh gian lận. Sau khi duyệt, người sáng lập bấm nút kết nối ví MetaMask/Coinbase để đưa dự án lên blockchain, chuẩn bị nhận tiền đầu tư.',
    'how.phase1.rule1':
      'Kiểm duyệt chặt chẽ: Chỉ các dự án thực tế, minh bạch và nghiêm túc mới được phê duyệt hiển thị trên trang chủ.',
    'how.phase1.rule2':
      'Chế độ thử nghiệm (Demo Mode): Cho phép rút ngắn thời gian gọi vốn và thực hiện xuống còn 5 phút để bạn dễ dàng chạy thử quy trình.',

    // Step 2 Details
    'how.phase2.title': 'Bước 2: Gây quỹ & Két sắt an toàn',
    'how.phase2.subtitle':
      'Tiền đầu tư được giữ an toàn tuyệt đối bằng hợp đồng thông minh blockchain và hoạt động theo quy tắc bảo vệ người dùng.',
    'how.phase2.desc':
      'Dự án sau khi kích hoạt sẽ được mở công khai để mọi người vào đầu tư bằng đồng USDT. Két sắt blockchain (hợp đồng thông minh) sẽ tự động tiếp nhận và khóa số tiền này lại. Người sáng lập dự án không thể chạm vào số tiền này, Ban quản trị FundHive cũng không thể lấy đi, đảm bảo an toàn tuyệt đối cho người ủng hộ.',
    'how.phase2.rule1.title':
      'Quy tắc "Đạt mục tiêu hoặc Trả lại tiền" (All-or-Nothing)',
    'how.phase2.rule1.desc':
      'Dự án bắt buộc phải quyên góp đủ 100% số vốn đăng ký trước khi hết hạn mới được coi là thành công. Nếu thiếu dù chỉ 1 đồng khi hết hạn, toàn bộ số tiền đã quyên góp sẽ tự động được hệ thống mở khóa để người đầu tư nhận lại đầy đủ.',
    'how.phase2.rule2.title': 'Minh bạch 100% trên Blockchain',
    'how.phase2.rule2.desc':
      'Mọi giao dịch gửi tiền, số dư hiện có trong két dự án đều được ghi nhận vĩnh viễn trên sổ cái blockchain. Bất kỳ ai cũng có thể vào kiểm tra số dư và lịch sử giao dịch bất cứ lúc nào.',

    // Step 3 Details
    'how.phase3.title': 'Bước 3: Thực hiện dự án & Nhận vốn từng phần',
    'how.phase3.subtitle':
      'Nhận vốn theo từng cột mốc đã cam kết để đảm bảo dự án phát triển thực tế, tránh rủi ro người sáng lập ôm tiền mất tích.',
    'how.phase3.desc':
      'Thay vì nhận toàn bộ số tiền gọi vốn một lần, người sáng lập sẽ nhận tiền theo từng cột mốc sau khi chứng minh được kết quả làm việc thực tế.',
    'how.phase3.step1.title': '1. Nộp báo cáo và bằng chứng',
    'how.phase3.step1.desc':
      'Khi hoàn thành một cột mốc, người sáng lập gửi báo cáo chi tiết kèm theo các hình ảnh, video chạy thử sản phẩm, hoặc liên kết kiểm chứng thực tế lên hệ thống.',
    'how.phase3.step2.title': '2. Thẩm định kết quả',
    'how.phase3.step2.desc':
      'Ban quản trị FundHive sẽ kiểm tra kỹ lưỡng các bằng chứng. Nếu sản phẩm đạt yêu cầu đúng như cam kết ban đầu, cột mốc sẽ được phê duyệt.',
    'how.phase3.step3.title': '3. Chuyển giao cột mốc tiếp theo',
    'how.phase3.step3.desc':
      'Sau khi mốc cũ được duyệt và nhận vốn, mốc thời gian tiếp theo mới bắt đầu chạy, giúp tiến trình công việc luôn diễn ra khoa học, minh bạch.',

    // Step 4 Details
    'how.phase4.title': 'Bước 4: Nhận vốn dự án hoặc Hoàn trả tiền ủng hộ',
    'how.phase4.subtitle':
      'Quy trình phân chia dòng tiền minh bạch: Người sáng lập nhận vốn khi làm việc tốt; Người đầu tư nhận lại tiền nếu dự án gặp sự cố.',
    'how.phase4.withdraw.title': 'Người sáng lập rút tiền (Rút vốn cột mốc)',
    'how.phase4.withdraw.desc':
      'Khi một cột mốc được duyệt thành công, người sáng lập kết nối ví điện tử để rút đúng số tiền (%) đã phân bổ riêng cho cột mốc đó về ví của mình để tiếp tục phát triển dự án.',
    'how.phase4.refund.title': 'Người ủng hộ nhận lại tiền (Hoàn trả tự động)',
    'how.phase4.refund.desc':
      'Hệ thống bảo vệ tối đa quyền lợi người đầu tư bằng cách tự động cho phép hoàn trả tiền trong 2 trường hợp cụ thể dưới đây.',
    'how.btn.start': 'Trải nghiệm ngay',

    // New translations for How It Works (Bilingual compliance)
    'how.badge.guide': 'Hướng dẫn sử dụng FundHive',
    'how.phase1.rule_header': 'Quy tắc hệ thống bắt buộc',
    'how.phase1.rule1.title':
      'Tổng tiền chia cột mốc phải bằng mục tiêu gọi vốn',
    'how.phase1.rule1.desc':
      'Khi chia nhỏ dự án thành nhiều giai đoạn, tổng số tiền bạn phân bổ cho tất cả các mốc bắt buộc phải khớp chính xác 100% với tổng số vốn kêu gọi đăng ký ban đầu. Điều này đảm bảo dự án có đủ kinh phí để đi đến đích cuối cùng.',
    'how.phase1.rule2.title': 'Kiểm duyệt chất lượng kỹ lưỡng',
    'how.phase1.rule2.desc':
      'Hệ thống sẽ thẩm định hồ sơ để loại bỏ các dự án rác hoặc thông tin không rõ ràng. Chỉ khi được Ban quản trị duyệt và đồng ý, bạn mới có quyền đưa dự án lên blockchain để bắt đầu nhận đầu tư.',
    'how.phase1.rule3.title': 'Hỗ trợ chế độ thử nghiệm',
    'how.phase1.rule3.desc':
      'Người sáng lập có thể kích hoạt Chế độ thử nghiệm (Demo Mode) để rút ngắn thời gian gọi vốn và thực hiện xuống 5 phút, giúp trải nghiệm và kiểm tra toàn bộ tính năng một cách nhanh chóng.',

    'how.phase3.safety_header': 'Vì sao phương pháp này an toàn?',
    'how.phase3.safety.1':
      'Người đầu tư không sợ bị người sáng lập ôm trọn tiền bỏ trốn.',
    'how.phase3.safety.2':
      'Số tiền giải ngân được kiểm soát chặt chẽ dựa trên kết quả nghiệm thu thực tế.',
    'how.phase3.safety.3':
      'Lịch trình thực hiện rõ ràng, minh bạch giúp tăng tính kỷ luật của người sáng lập.',

    'how.phase4.creator_badge': 'Người sáng lập rút tiền',
    'how.phase4.withdraw.step1.title': 'Bước 1: Được phê duyệt kết quả',
    'how.phase4.withdraw.step1.desc':
      'Khi hoàn thành một cột mốc đã cam kết, người sáng lập đăng báo cáo chi tiết kèm bằng chứng. Ban quản trị sẽ thẩm định kỹ lưỡng và duyệt cột mốc chuyển sang trạng thái Thành công.',
    'how.phase4.withdraw.step2.title': 'Bước 2: Kết nối ví Web3 & ký xác nhận',
    'how.phase4.withdraw.step2.desc':
      'Người sáng lập nhấp vào nút "Rút tiền cột mốc" trực tiếp trên giao diện của dự án, kết nối ví MetaMask hoặc Coinbase của mình để ký duyệt xác nhận giao dịch.',
    'how.phase4.withdraw.step3.title': 'Bước 3: Nhận vốn về ví cá nhân',
    'how.phase4.withdraw.step3.desc':
      'Ngay khi giao dịch hoàn tất trên blockchain, hợp đồng thông minh tự động mở khóa và giải ngân chính xác phần trăm ngân sách của cột mốc đó thẳng vào ví của bạn.',

    'how.phase4.backer_badge': 'Người ủng hộ nhận lại tiền',
    'how.phase4.refund.case1.title':
      'Trường hợp 1: Dự án không đạt mục tiêu (Gây quỹ thất bại)',
    'how.phase4.refund.case1.desc':
      'Khi hết thời gian kêu gọi vốn mà số lượng tiền quyên góp chưa đạt đủ 100% mục tiêu ban đầu. Két sắt blockchain tự động đóng dự án lại. Bạn chỉ cần vào trang dự án, bấm nút "Nhận lại tiền" để rút toàn bộ 100% số tiền ban đầu về ví mà KHÔNG tốn bất kỳ khoản phí dịch vụ nào.',
    'how.phase4.refund.case2.title':
      'Trường hợp 2: Dự án bị dừng do lỗi tiến độ hoặc bị Admin từ chối (Hủy dự án)',
    'how.phase4.refund.case2.desc':
      'Trong thời gian thực hiện, nếu người sáng lập không bàn giao sản phẩm đúng cam kết hoặc bị Ban quản trị từ chối phê duyệt cột mốc vĩnh viễn, dự án sẽ bị đóng cửa. Khi đó, toàn bộ số tiền chưa giải ngân (đang khóa trong các mốc chưa thực hiện) sẽ được chia đều và tự động hoàn trả lại đầy đủ cho những người ủng hộ theo tỷ lệ đóng góp ban đầu của mỗi người. Phần tiền của các mốc cũ đã hoàn tất thành công trước đó sẽ không bị ảnh hưởng.',

    'how.phase4.warning':
      'Lưu ý an tâm: Hệ thống két sắt blockchain được lập trình sẵn và hoạt động hoàn toàn tự động. Số tiền của bạn sẽ chỉ được chuyển đi khi các điều kiện cam kết được nghiệm thu minh bạch. Không ai có quyền can thiệp trái phép vào tài sản của bạn.',

    'how.cta.title': 'Sẵn Sàng Tham Gia Khởi Tạo Ý Tưởng?',
    'how.cta.desc':
      'Cho dù bạn là một người sáng lập đầy nhiệt huyết hay một nhà ủng hộ muốn tìm kiếm những giải pháp thực tế, FundHive luôn đem lại cho bạn điểm tựa an tâm nhất.',
    'how.cta.btn_new': 'Tạo Dự Án Mới',
    ...errorsVi
  },
  en: {
    // Navigation / Header
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.launch_idea': 'Launch Your Idea',
    'nav.my_projects': 'My Projects',
    'nav.connect_wallet': 'Connect Wallet',
    'nav.disconnect': 'Disconnect',
    'nav.profile': 'Profile',
    'nav.my_investments': 'My Investments',

    // Validation titles
    'validation.missing_required_fields': 'Missing Required Fields',
    'validation.budget_mismatch': 'Budget Mismatch',
    'validation.budget_exceeded': 'Budget Exceeded',
    'validation.member_added': 'Member Added',
    'validation.member_already_added': 'Member Already Added',
    'validation.missing_information': 'Missing Information',
    'validation.missing_role_description': 'Missing Role Description',

    // Form Zod validations
    title_required: 'Project Title is required',
    subtitle_required: 'Subtitle is required',
    primary_category_required: 'Primary Category is required',
    location_required: 'Location is required',
    image_required: 'At least 1 Reference Image is required',
    funding_goal_positive: 'Funding goal must be a positive number',
    start_date_required: 'Start Date is required',
    end_date_required: 'End Date is required',
    description_required: 'Project Description is required',
    risks_required: 'Risks & Challenges are required',

    milestone_name_required: 'Milestone Name is required',
    milestone_description_required: 'Description is required',
    milestone_duration_positive: 'Duration must be greater than 0',
    milestone_budget_positive: 'Budget Allocation must be greater than 0',
    milestone_images_required: 'Reference Image is required',
    milestone_outcome_required: 'Expected Outcome is required',

    member_id_required: 'ID required',
    member_name_required: 'Name required',
    member_email_invalid: 'Invalid email',
    member_email_required: 'Email required',
    member_wallet_required: 'Wallet required',

    // Step labels
    'step.basics': 'Basics',
    'step.milestones': 'Milestones',
    'step.team': 'Team',
    'step.attachments': 'Attachments',
    'step.overview': 'Overview',

    // Common buttons
    'btn.continue': 'Continue',
    'btn.back': 'Back',
    'btn.cancel': 'Cancel',
    'btn.add': 'Add',
    'btn.update': 'Update',
    'btn.publish': 'Publish',
    'btn.save': 'Save',
    'btn.discard_changes': 'Discard changes',
    'common.optional': 'optional',
    'common.prev': 'Prev',
    'common.next': 'Next',
    'common.pageOf': 'Page {{current}} of {{total}}',
    'common.wizard': 'Wizard',

    // Milestones
    'milestones.title': 'Define Project Milestones',
    'milestones.desc':
      'Break your project into manageable phases for transparency and accountability.',
    'milestones.totalBudget': 'Total Budget',
    'milestones.remainingBudget': 'Remaining: €{{remaining}}',
    'milestones.executionTime': 'Execution Time',
    'milestones.totalDuration': '{{duration}} Days',
    'milestones.remainingDuration': 'Remaining: {{remaining}} Days',
    'milestones.noMaxDuration':
      'Total project phases: {{count}} (No max duration set)',
    'milestones.name': 'Milestone Name',
    'milestones.namePlaceholder': 'e.g., Phase 1: MVP Development',
    'milestones.description': 'Description',
    'milestones.descriptionPlaceholder':
      'Detail the specific tasks and technical requirements...',
    'milestones.duration': 'Duration (Days)',
    'milestones.durationHelper': 'Estimated time to complete this phase.',
    'milestones.budget': 'Budget Allocation (€)',
    'milestones.budgetHelper': 'Cannot exceed total funding goal.',
    'milestones.advantages': 'Advantages (Optional)',
    'milestones.challenges': 'Challenges (Optional)',
    'milestones.referenceImage': 'Reference Image',
    'milestones.expectedOutcome': 'Expected Outcome',
    'milestones.expectedOutcomePlaceholder':
      'Describe the expected results and deliverables of this milestone...',
    'milestones.adminWarning':
      'The admin team will review at the deadline and will approve or deny based on the completion results of each stage, so this information needs to be carefully defined.',
    'milestones.cancelEdit': 'Cancel Edit',
    'milestones.uploading': 'Uploading...',
    'milestones.update': 'Update Milestone',
    'milestones.add': 'Add Milestone',
    'milestones.pipeline': 'Milestone Pipeline',
    'milestones.empty': 'No milestones added yet.',
    'milestones.emptyHint': 'Fill the form to add a milestone',
    'milestones.continueToTeam': 'Continue to Team',

    // Basics
    'basics.title': 'Start with the basics',
    'basics.desc':
      'Make it easy for people to learn about your project. This information will appear on your project page and in search results.',
    'basics.projectTitle': 'Project title',
    'basics.projectTitleDesc':
      "Create a clear, concise title and subtitle that explains what you're creating.",
    'basics.fieldTitle': 'Title',
    'basics.fieldSubtitle': 'Subtitle',
    'basics.titlePlaceholder': 'The Eternal Vault: A Cinematic Web3 Experience',
    'basics.subtitlePlaceholder':
      'An immersive journey through FundHive, leveraging multi-dimensional UI and smart contract security.',
    'basics.projectCategory': 'Project category',
    'basics.projectCategoryDesc':
      'Select categories that best describe your project to help backers find you.',
    'basics.primaryCategory': 'Primary Category',
    'basics.secondaryCategory': 'Secondary Category (Optional)',
    'basics.selectCategory': 'Select Category',
    'basics.loadingCategories': 'Loading categories...',
    'basics.noCategories': 'No categories found',
    'basics.projectLocation': 'Project location',
    'basics.projectLocationDesc':
      'Where are you based? This helps us localized your project for potential backers.',
    'basics.searchLocationPlaceholder': 'Search for city or country',
    'basics.projectMedia': 'Project media',
    'basics.projectMediaDesc':
      'Visuals are the most important part of your project presentation. High-quality imagery increases conversion by 80%.',
    'basics.referenceImage': 'Reference Image (Required)',
    'basics.uploadingImages': 'Uploading images...',
    'basics.projectVideo': 'Project Video (Optional)',
    'basics.uploadingVideo': 'Uploading video, please wait...',
    'basics.videoSelected': 'Video selected. Click to change.',
    'basics.videoHelper':
      'Up to 100MB. MP4, WEBM, or MOV format. High definition recommended.',
    'basics.videoUploading': 'Uploading...',
    'basics.videoChange': 'Change',
    'basics.videoUpload': 'Upload',
    'basics.videoNotSupported': 'Your browser does not support the video tag.',
    'basics.removeVideo': 'Remove Video',
    'basics.projectStory': 'Project story',
    'basics.projectStoryDesc':
      "Tell the world about what you're building. Be transparent about risks and challenges.",
    'basics.projectDescription': 'Project Description',
    'basics.projectDescriptionPlaceholder':
      "Start typing your project's story here...",
    'basics.risks': 'Risks & Challenges',
    'basics.risksPlaceholder':
      'Be transparent about potential technical hurdles, market risks, or regulatory challenges...',
    'basics.fundingGoal': 'Funding goal',
    'basics.fundingGoalDesc':
      "Set a goal that's both ambitious and realistic. Remember our 'all-or-nothing' policy.",
    'basics.allOrNothing': 'All-or-nothing',
    'basics.allOrNothingDesc':
      "If you don't reach your funding goal by the deadline, all contributions will be automatically refunded and you will receive no funds.",
    'basics.targetLaunchDate': 'Target launch date',
    'basics.targetLaunchDateDesc':
      'Optional. Set a target date to stay on track. This can be changed later.',
    'basics.selectDate': 'Select Date',
    'basics.pickDate': 'Pick a target launch date',
    'basics.recommendedTimeline': 'Recommended Timeline',
    'basics.recommendedTimelineDesc':
      'We recommend a 3-week pre-launch phase to build hype before your live campaign.',
    'basics.campaignDuration': 'Campaign duration',
    'basics.campaignDurationDesc':
      'Most successful campaigns last between 30 and 45 days.',
    'basics.fixedDays': 'Fixed number of days',
    'basics.fixedDaysDesc': 'Set a specific length (1-60 days)',
    'basics.endSpecificDate': 'End on a specific date',
    'basics.endSpecificDateDesc': 'Choose a specific calendar day',
    'basics.selectEndDate': 'Select end date',
    'basics.continueToMilestones': 'Continue to Milestones',

    // Team
    'team.title': 'Build Your Team',
    'team.desc':
      'Add core contributors to build trust with your backers. Transparent team structures lead to 40% higher funding success.',
    'team.contributorDetails': 'Contributor Details',
    'team.searchLabel': 'Search for platform members',
    'team.searchPlaceholder': 'Username, wallet, or email...',
    'team.searching': 'Searching database...',
    'team.noEmail': 'No email attached',
    'team.noUserFound': 'No users found on FundHive.',
    'team.fullName': 'Full Name',
    'team.populatePlaceholder': 'Search above to populate...',
    'team.emailAddress': 'Email Address',
    'team.walletAddress': 'Wallet Address',
    'team.role': 'Role',
    'team.selectRole': 'Select a role',
    'team.roleDesc': 'Role Description',
    'team.roleDescPlaceholder': 'Briefly describe their responsibilities...',
    'team.addMember': 'Add Member',
    'team.activeRoster': 'Active Roster',
    'team.membersCount': '({{count}} members)',
    'team.empty': 'No team members added yet.',
    'team.continueToAttachments': 'Continue to Attachments',
    'team.role.founder': 'Founder',
    'team.role.leaddeveloper': 'Lead Developer',
    'team.role.designer': 'Designer',
    'team.role.marketing': 'Marketing',
    'team.role.advisor': 'Advisor',

    // Attachments

    'attachments.title': 'Credentials & Proof',
    'attachments.desc':
      "Upload supporting documents — certificates, portfolios, CVs, or business plans. These attachments help investors verify your team's expertise and build confidence.",
    'attachments.category': 'Category',
    'attachments.typeName': 'Type Name',
    'attachments.typeNamePlaceholder': 'e.g. Award, Press Coverage, Demo...',
    'attachments.description': 'Description',
    'attachments.descriptionPlaceholder':
      'e.g. AWS Solutions Architect 2024...',
    'attachments.dragDrop': 'Drag & drop files',
    'attachments.dropHere': 'Drop files here',
    'attachments.browse': 'browse',
    'attachments.orBrowse': 'or {{browse}} to upload',
    'attachments.constraints':
      'JPG · PNG · WEBP · GIF · PDF · DOC · DOCX — max {{max}}MB each',
    'attachments.filesUsed': '{{count}}/{{max}} files used',
    'attachments.empty': 'No files uploaded yet.',
    'attachments.emptySub': 'This step is optional — but recommended.',
    'attachments.editTitle': 'Edit Attachment',
    'attachments.editTypeNameRequired':
      'Please enter a name for this attachment type.',
    'attachments.completeSetup': 'Complete Setup',
    'toast.unsupported_file':
      '{{name}}: Unsupported file type. Use JPG, PNG, WEBP, GIF, or PDF.',
    'toast.file_size_exceeded': '{{name}}: File exceeds {{max}}MB limit.',
    'toast.max_files_exceeded': 'You can only upload {{max}} files total.',
    'toast.presign_failed': 'Failed to get upload URLs. Please try again.',
    'toast.upload_progress_failed': 'Upload failed',
    'toast.upload_single_failed': 'Failed to upload {{name}}.',
    'toast.upload_success_en_1': '1 file uploaded successfully.',
    'toast.upload_success_en_many': '{{count}} files uploaded successfully.',

    'btn.edit': 'Edit',
    'btn.delete': 'Delete',

    // Toast details
    'toast.budget_mismatch_desc':
      'Total milestone budget (€{{total}}) must exactly equal your funding goal (€{{goal}}).',
    'toast.publish_success':
      'Project published successfully! Admin will review and approve your project within the next 48 hours.',
    'toast.publish_error': 'An error occurred during publishing.',
    'toast.complete_required_fields':
      'Please complete all required fields before publishing.',
    'toast.select_member_desc':
      'Please search and select a platform member to fill in the required details.',
    'toast.role_desc_required':
      "Please provide a brief description of this member's responsibilities.",
    'toast.member_exists_desc':
      'This user is already part of your team roster.',
    'toast.member_added_success': '{{name}} is now part of the team.',
    'toast.milestone_budget_exceeded_desc':
      'This milestone exceeds the remaining budget of €{{remaining}}.',
    'toast.upload_failed': 'Upload Failed',
    'toast.upload_failed_desc': 'Failed to upload some images.',
    'toast.video_too_large': 'Video too large',
    'toast.video_too_large_desc': 'Max size is 100MB.',
    'toast.uploading_video': 'Uploading video...',
    'toast.video_uploaded_success': 'Video uploaded successfully!',
    'toast.video_upload_failed': 'Video upload failed',
    'toast.video_upload_failed_desc':
      'Please try again with a different format.',
    'toast.milestone_updated': 'Milestone updated successfully!',
    'toast.milestone_added': 'Milestone added successfully!',
    'toast.save_success': 'Settings saved successfully!',

    // Profile Translations
    'profile.identity_details': 'Identity Details',
    'profile.display_name': 'Display Name',
    'profile.display_name_placeholder': 'Your public name',
    'profile.email_address': 'Email Address',
    'profile.email_placeholder': 'alex@example.com',
    'profile.btn_verify': 'Verify',
    'profile.btn_verified': 'Verified',
    'profile.btn_confirm': 'Confirm',
    'profile.phone_number': 'Phone Number',
    'profile.phone_placeholder': '+1 (555) 000-0000',
    'profile.location': 'Location',
    'profile.location_placeholder': 'Search city or country',
    'profile.biography': 'Biography',
    'profile.biography_placeholder': 'Tell the community about yourself...',
    'profile.biography_desc': 'Briefly describe your background and interests.',
    'profile.presence_links': 'Presence & Links',
    'profile.website': 'Website',
    'profile.platform': 'Platform',
    'profile.social_links': 'Social Links',
    'profile.btn_add_link': 'Add Link',
    'profile.social_url_placeholder': 'https://',
    'profile.remove_link': 'Remove link',
    'profile.avatar_title': 'Profile Image',
    'profile.avatar_formats': 'JPEG, PNG, or WebP. Max file size: 15MB.',
    'profile.btn_uploading': 'Uploading...',
    'profile.btn_select_file': 'Select File',
    'profile.unsaved_changes': 'Unsaved Changes',
    'profile.unsaved_changes_desc':
      'Review your changes before saving to the network.',
    'profile.btn_saving': 'Saving...',
    'profile.btn_save_settings': 'Save Settings',
    'toast.save_error': 'An error occurred while saving settings.',
    'toast.email_required': 'Please enter your email address before verifying.',
    'toast.otp_sent_success':
      'Verification OTP sent to your email successfully!',
    'toast.otp_sent_failed': 'Failed to send verification OTP.',
    'toast.otp_length_error': 'Please enter the complete 6-digit OTP code.',
    'toast.kyc_verified_success': 'KYC Email verification successful!',
    'toast.kyc_verified_failed':
      'Verification failed. The OTP is invalid or expired.',
    'toast.connect_wallet_required': 'Please connect your wallet first!',
    'toast.target_launch_date_past':
      'The Target Launch Date is in the past! Please choose a future start date or enable Demo Mode.',
    'toast.milestone_time_invalid':
      'Milestone {{order}} date is invalid (must be after funding deadline and previous milestones)',
    'toast.milestone_total_mismatch':
      'Total milestones budget does not match funding goal!',
    'toast.confirm_tx_wallet':
      'Please confirm the transaction on your wallet...',
    'toast.waiting_tx_mined': 'Waiting for the transaction to be mined...',
    'toast.launch_blockchain_success':
      'Project launched on blockchain successfully!',
    'toast.contract_call_error': 'An error occurred during smart contract call',
    'toast.invalid_amount': 'Please enter a valid amount',
    'toast.amount_exceeds_remaining':
      'You can only invest up to €{{remaining}} (remaining project funding goal)',
    'toast.insufficient_balance': 'Insufficient balance',
    'toast.waiting_approve_tx': 'Waiting for approval transaction...',
    'toast.confirming_investment_chain': 'Confirming investment on chain...',
    'toast.invest_error': 'An error occurred during investment',

    // Overview
    'overview.projectOverview': 'Project overview',
    'overview.kyc_warning_title': 'Email Verification Required (KYC)',
    'overview.kyc_warning_desc':
      'You must complete your email verification in your Profile settings before you can publish a fundraising campaign.',
    'overview.kyc_warning_btn': 'Verify Now',
    'overview.completeRequiredSections':
      'Complete the required sections before publishing. Attachments are optional but greatly improve investor confidence.',
    'overview.sectionsComplete': 'sections complete',
    'overview.publishProject': 'Publish project',
    'overview.lastUpdated': 'Last updated',
    'overview.justNow': 'just now',
    'overview.stepBasicsDesc': 'Name your project, upload an image or video...',
    'overview.stepMilestonesDesc': 'Define your milestones...',
    'overview.stepTeamDesc': 'Edit your profile and add collaborators.',
    'overview.stepAttachmentsDesc':
      'Upload certificates, portfolios, CVs or business plans.',
    'status.complete': 'Complete',
    'status.in_progress': 'In Progress',
    'status.not_started': 'Not Started',
    'status.optional': 'Optional',

    // My Projects / Kanban
    'my_project.board_title': 'Project Board',
    'my_project.new_project': 'New project',
    'my_project.empty': 'Empty',
    'my_project.syncing': 'Syncing...',
    'my_project.confirm_delete':
      'Are you sure you want to delete this project?',
    'my_project.delete_success': 'Project deleted successfully',
    'my_project.delete_error': 'Failed to delete project',
    'my_project.not_found': 'Project Not Found',
    'my_project.back_to_my_projects': 'Back to My Projects',
    'my_project.my_projects': 'My Projects',

    // Kanban Columns / Status
    'status.pending': 'Pending Approval',
    'status.progress': 'Funding in Progress',
    'status.active': 'Active',
    'status.success': 'Success',
    'status.rejected': 'Rejected',
    'status.approved': 'Approved',

    // Kanban Card
    'kanban.duration': 'Duration',
    'kanban.milestones': 'milestones',
    'kanban.Milestones': 'Milestones',
    'kanban.funded': 'funded',
    'kanban.view_details': 'View details',
    'kanban.delete_project': 'Delete project',
    'kanban.update_progress': 'Update progress',

    // Invested
    'invested.title_main': 'Investments',
    'invested.title_my': 'My ',
    'invested.desc':
      "Track and manage the projects you've backed. Monitor their progress, funding goals, and active milestones.",
    'invested.time_range': 'Time Range',
    'invested.all_time': 'All Time',
    'invested.last_30_days': 'Last 30 Days',
    'invested.this_year': 'This Year',
    'invested.syncing': 'Syncing investment data...',
    'invested.error':
      'Failed to load your investment portfolio. Please try again later.',
    'invested.no_investments_yet': 'No Investments Yet',
    'invested.no_investments_desc':
      "You haven't backed any projects. Discover innovative ideas and start building your portfolio today.",
    'invested.history': 'Investment History',
    'invested.projects_counter': '{{count}} Projects',
    'invested.no_projects_found': 'No investments found in this time range.',

    // InvestedStats
    'stats.total_invested': 'Total Invested',
    'stats.projects_backed': 'Projects Backed',
    'stats.no_data': 'No data to display',
    'stats.projects_plural': 'projects',
    'stats.funding': 'Funding',
    'stats.failed': 'Failed',

    // CompactCard & Refund
    'compact.reason': 'Reason:',
    'compact.refunded': 'Refunded',
    'refund.confirm_tx': 'Please confirm the transaction on your wallet...',
    'refund.tx_sent': 'Transaction sent, waiting for network confirmation...',
    'refund.success': 'Refund claimed successfully!',
    'refund.error': 'An error occurred during refund.',
    'refund.processing': 'Processing...',
    'refund.claim': 'Claim Refund',

    // Landing / Hero
    'hero.badge': 'Web3 Launchpad — Now Live',
    'hero.titleMain': 'The Future of',
    'hero.titleHighlight': 'Decentralized',
    'hero.titleEnd': 'Funding.',
    'hero.subtitle':
      'Launch, discover, and invest in the most promising blockchain projects. Fully on-chain. Zero middlemen. Built for the new era.',
    'hero.btn.launch': 'Launch Your Idea',
    'hero.btn.explore': 'Explore Projects',
    'hero.stats.poolValue': '$42M+',
    'hero.stats.poolLabel': 'Total Pool Value Locked',
    'hero.stats.title': 'Fully On-Chain',
    'hero.stats.tag': 'Zero Custodial Risk',

    // Landing / Featured Pools
    'landing.featured_pools': 'Featured Pools',
    'landing.featured_pools_desc':
      'Vetted decentralized projects ready for capital injection or successfully built. Governed by smart contracts, transparent to the world.',
    'landing.view_all_pools': 'View All Pools',
    'landing.no_active_projects': 'No active projects found.',

    // Landing / How it works
    'landing.how_it_works': 'How It Works',
    'landing.how_it_works_desc':
      'Enter the future of decentralized capital in three simple steps. Secure, transparent, and direct.',
    'landing.step1_title': 'Submit Your Project',
    'landing.step1_desc':
      'Complete our streamlined onboarding process. Define your vision, tokenomics, and milestones.',
    'landing.step2_title': 'Community Vetting',
    'landing.step2_desc':
      'Our decentralized council and community review your project for viability and integrity.',
    'landing.step3_title': 'Launch & Fund',
    'landing.step3_desc':
      'Go live on-chain. Backers commit funds secured in smart contracts tied to milestone completion.',

    // Landing / Features
    'landing.features_title': 'Trust Built into the',
    'landing.features_title_highlight': 'Source Code.',
    'landing.features_desc':
      "Unlike traditional crowdfunding, FundHive eliminates the 'blind trust' factor. Every commitment is governed by immutable code, audited by leading security firms, and transparent to the world.",
    'landing.feature1_title': 'Non-Custodial Escrow',
    'landing.feature1_desc':
      'Funds are held in audited smart contracts. No team can access capital before milestones are approved.',
    'landing.feature2_title': 'DAO Governance',
    'landing.feature2_desc':
      'Token holders vote on project approvals, fund releases, and protocol upgrades.',
    'landing.feature3_title': 'Real-Time Analytics',
    'landing.feature3_desc':
      'Track funding progress, token distribution, and on-chain activity with live dashboards.',
    'landing.feature4_title': 'Multi-Audit Security',
    'landing.feature4_desc':
      'Every smart contract undergoes multiple independent security audits before deployment.',

    // Landing / CTA Banner
    'landing.cta_title': 'Ready to Start Your Journey?',
    'landing.cta_desc':
      'Connect Your Wallet and join the revolution of decentralized innovation today.',
    'landing.cta_btn_connect': 'Connect Wallet Now',
    'landing.cta_btn_contact': 'Contact Sales',

    // Footer
    'footer.desc':
      'A decentralized launchpad empowering the next generation of blockchain projects with transparency and community governance.',
    'footer.ecosystem': 'Ecosystem',
    'footer.community': 'Community',
    'footer.legal': 'Legal & Info',
    'footer.rights': 'All rights reserved.',

    // Search Filter
    'search.badge': 'FundHive / Projects',
    'search.title': 'Ecosystem Ventures',
    'search.placeholder': 'Search projects...',
    'search.sort.trending': 'Trending',
    'search.sort.newest': 'Newest',
    'search.sort.most_funded': 'Most funded',
    'search.category.all': 'All',
    'search.searching': 'Searching...',
    'search.no_results': 'No projects found for',
    'search.status.funding': 'FUNDING',
    'search.status.active': 'ACTIVE',

    // Categories
    'category.art-design': 'Art & Design',
    'category.comics-illustration': 'Comics & Illustration',
    'category.games-web3': 'Games & Web3',
    'category.music-audio': 'Music & Audio',
    'category.technology': 'Technology',

    // Dropdown / Wallet / Theme
    'nav.wrong_network': 'Wrong Network',
    'nav.verify_account_tooltip': 'Please verify your account',
    'nav.appearance': 'Appearance',
    'nav.appearance.light': 'Light',
    'nav.appearance.dark': 'Dark',
    'nav.appearance.system': 'System',
    'nav.language': 'Language',

    // AI Assistant
    'ai.assistant_title': 'FundHive AI Assistant',
    'ai.online': 'Online',
    'ai.greeting':
      'Hello! I am the FundHive Virtual Assistant.\n\nI am ready to answer any questions you have about mUSDT investment rules, the refund mechanism when a project fails to reach its goal, and our secure milestone release process.\n\nHow can I help you today?',
    'ai.clear_confirm': 'Are you sure you want to reset this conversation?',
    'ai.clear_success':
      'Chat history has been refreshed. I am ready for your next questions!',
    'ai.placeholder': 'Ask FundHive Assistant...',
    'ai.thinking': 'Assistant is thinking...',
    'ai.footnote': 'Online FundHive Information & Support',
    'ai.faq_usdt_label': '⚡ Top-up mUSDT',
    'ai.faq_usdt_q': 'What is mUSDT? How do I get test mUSDT to invest?',
    'ai.faq_refund_label': '🛡️ Refund Policy',
    'ai.faq_refund_q':
      'If a project funding fails, will my investment be refunded?',
    'ai.faq_milestone_label': '📦 Milestone Escrow',
    'ai.faq_milestone_q':
      'How does the milestone release mechanism protect investors?',
    'ai.faq_about_label': '🌐 What is FundHive?',
    'ai.faq_about_q': 'Provide an overview of the FundHive platform',
    'ai.toast_empty': '⚠️ Empty message. Please type a question.',
    'ai.raised': 'Raised:',
    'ai.view': 'View',
    'ai.project_error': '[Project display error]',
    'ai.toast_wallet_copied': 'Wallet address copied successfully!',
    'ai.wallet_tooltip': 'Click to copy wallet address',
    'ai.tx_tooltip': 'View receipt on Etherscan Sepolia Explorer',
    'ai.member': 'Member',
    'ai.guest': 'Guest mode',
    'ai.clear_tooltip': 'Reset chat history',
    'ai.suggested_questions': 'Suggested questions:',
    'ai.tooltip': 'AI Virtual Assistant',
    'ai.error_connect':
      '⚠️ Unable to connect to the AI server. Please check your connection or try again later.',
    // How It Works
    'nav.how_it_works': 'How It Works',
    'how.title': 'How It Works & System Terms',
    'how.subtitle':
      'Step-by-step guide helping creators raise funds and supporters invest with total peace of mind and transparency through 4 simple stages.',
    'how.step.1': '01. Setup & Create Project',
    'how.step.2': '02. Fundraising',
    'how.step.3': '03. Execution & Payout',
    'how.step.4': '04. Withdraw & Refund',

    // Step 1 Details
    'how.phase1.title': 'Step 1: Idea Setup & Activation',
    'how.phase1.subtitle':
      'Creators configure campaign details through 5 simple steps on the website and activate the campaign on the blockchain network.',
    'how.phase1.step1.title': '1. Core Project Basics',
    'how.phase1.step1.desc':
      'Enter project title, write a short pitch, upload cover images or videos. Specify the target budget (in USDT) and the fundraising duration.',
    'how.phase1.step2.title': '2. Breakdown Milestones',
    'how.phase1.step2.desc':
      'Split the campaign into tangible development stages. For each phase, input days duration, expected deliverables, and the allocated budget share. The total budget across all milestones must exactly match your target goal.',
    'how.phase1.step3.title': '3. Introduce the Team',
    'how.phase1.step3.desc':
      'Enter name, role, email address, and wallet address of each member to establish total transparency and trust with supporters.',
    'how.phase1.step4.title': '4. Attach Pitch Deck Documents',
    'how.phase1.step4.desc':
      'Upload business plans or deck documents (up to 10 files, maximum 10MB per file) for supporters to read and evaluate.',
    'how.phase1.step5.title': '5. Verification & Blockchain Deploy',
    'how.phase1.step5.desc':
      'The campaign goes to admin audit to prevent fraud. Once approved, the creator connects a wallet (MetaMask/Coinbase) to launch the campaign on the blockchain and prepare for funding.',
    'how.phase1.rule1':
      'Strict Audit: Only realistic, honest, and high-quality campaigns will be approved to launch on the home page.',
    'how.phase1.rule2':
      'Demo Mode: Allows overriding durations down to 5 minutes so you can rapidly test the full end-to-end fundraising cycle.',

    // Step 2 Details
    'how.phase2.title': 'Step 2: Fundraising & Secure Escrow',
    'how.phase2.subtitle':
      'Pledged capital is locked securely by audited smart contracts following strict backer protection rules.',
    'how.phase2.desc':
      'Once activated, the campaign opens to the public for USDT contributions. The blockchain contract (escrow) automatically receives and locks these funds. Neither the creator nor the platform admin can touch this capital, ensuring 100% protection for backers.',
    'how.phase2.rule1.title': 'The "All-or-Nothing" Principle',
    'how.phase2.rule1.desc':
      'Campaigns must reach 100% of their USDT funding goal before the expiration deadline to succeed. Failing by even $1 blocks creator withdrawals and unlocks immediate refunds to all backers.',
    'how.phase2.rule2.title': '100% On-Chain Transparency',
    'how.phase2.rule2.desc':
      'Every single contribution and escrow balance state is permanently recorded on the blockchain. Anyone can inspect pool balance states and historical transactions 24/7.',

    // Step 3 Details
    'how.phase3.title': 'Step 3: Development & Phased Releases',
    'how.phase3.subtitle':
      'Claim budget shares in stages as you prove concrete progress, shielding backers from project abandonment and exit scams.',
    'how.phase3.desc':
      'Instead of receiving the entire budget at once, creators unlock funding in sequential parts only after delivering real work results.',
    'how.phase3.step1.title': '1. Submit Progress Reports',
    'how.phase3.step1.desc':
      'Upon reaching a milestone deadline, creators submit progress reports with verifiable evidence such as photos, video demos, or draft links.',
    'how.phase3.step2.title': '2. Quality Evaluation',
    'how.phase3.step2.desc':
      'System admin carefully audits the submitted proofs. If deliverables match expectations, the milestone is approved.',
    'how.phase3.step3.title': '3. Subsequent Milestone Initiation',
    'how.phase3.step3.desc':
      'Once the previous milestone is approved and withdrawn, the next milestone duration starts running, ensuring a streamlined, structured pipeline.',

    // Step 4 Details
    'how.phase4.title': 'Step 4: Claiming Funds or Reclaiming Support',
    'how.phase4.subtitle':
      'Secured funds distribution: Creators pull budget portion for approved work; Backers reclaim capital if projects get cancelled or fail.',
    'how.phase4.withdraw.title':
      'Creators Claiming Funds (Milestone Withdrawal)',
    'how.phase4.withdraw.desc':
      'When a milestone is successfully approved, creators connect their Web3 wallet to withdraw the exact percentage of the budget locked specifically for that phase.',
    'how.phase4.refund.title':
      'Supporters Reclaiming Contributions (Automatic Refunds)',
    'how.phase4.refund.desc':
      'The system guarantees maximum security for backers, allowing instant refunds in two specific scenarios.',
    'how.btn.start': 'Explore Now',

    // New translations for How It Works (Bilingual compliance)
    'how.badge.guide': 'FundHive User Guide',
    'how.phase1.rule_header': 'Mandatory System Rules',
    'how.phase1.rule1.title':
      'Milestone budget share total must equal fundraising goal',
    'how.phase1.rule1.desc':
      'When splitting the project into development phases, the sum of budgets allocated to all milestones must exactly match 100% of your target funding goal. This ensures there is sufficient capital to finish the project.',
    'how.phase1.rule2.title': 'Thorough quality control audits',
    'how.phase1.rule2.desc':
      'The system carefully audits campaign details to prevent spam or incomplete listings. You can only launch the project on the blockchain after admin approval.',
    'how.phase1.rule3.title': 'Demo Mode support enabled',
    'how.phase1.rule3.desc':
      'Creators can activate Demo Mode to compress campaign and milestone durations down to 5 minutes, allowing you to easily test the entire lifecycle.',

    'how.phase3.safety_header': 'Why is this mechanism secure?',
    'how.phase3.safety.1':
      'Supporters never worry about creators running off with the entire budget.',
    'how.phase3.safety.2':
      'Payouts are strictly released based on successfully audited work outcomes.',
    'how.phase3.safety.3':
      'A clear chronological timeline ensures high accountability for the development team.',

    'how.phase4.creator_badge': 'Creator Payout',
    'how.phase4.withdraw.step1.title': 'Step 1: Milestone Approval',
    'how.phase4.withdraw.step1.desc':
      'Upon completing a milestone deliverables report, creators submit evidence. Platform admins verify progress details and mark the milestone as approved.',
    'how.phase4.withdraw.step2.title': 'Step 2: Web3 Wallet Connect & Sign',
    'how.phase4.withdraw.step2.desc':
      'Creators click "Withdraw Milestone Funds" on their campaign dashboard, and connect their MetaMask/Coinbase wallet to sign the withdrawal transaction.',
    'how.phase4.withdraw.step3.title': 'Step 3: Receive Pledged Funds',
    'how.phase4.withdraw.step3.desc':
      'As soon as the transaction completes on-chain, the smart contract automatically transfers the milestone budget share straight to your wallet address.',

    'how.phase4.backer_badge': 'Backer Refund',
    'how.phase4.refund.case1.title':
      'Case 1: Expired Under Goal (Fundraising Failure)',
    'how.phase4.refund.case1.desc':
      'If a campaign finishes its fundraising duration without reaching 100% of the target goal, the blockchain contract shuts it down. Backers can simply click "Claim Refund" on the project page to reclaim 100% of their USDT with zero service fees.',
    'how.phase4.refund.case2.title':
      'Case 2: Terminated Due to Milestones Rejection (Campaign Cancellation)',
    'how.phase4.refund.case2.desc':
      'If creators fail to deliver milestones or violate terms, or if admins permanently reject a phase, the project gets cancelled. The smart contract locks all unreleased budget shares and distributes them back to backers proportionally. Completed and released milestone funds are not affected.',

    'how.phase4.warning':
      'Peace of Mind: The decentralized blockchain escrow system runs completely autonomously. Pledged assets are only released when commitments are fully checked and verified. Nobody can unauthorizedly access your funds.',

    'how.cta.title': 'Ready to Launch Your Campaign?',
    'how.cta.desc':
      'Whether you are a passionate creator or a supporter looking to power real ideas, FundHive is your most secure and trusted crowdfunding platform.',
    'how.cta.btn_new': 'Create New Project',
    ...errorsEn
  }
}

export type TranslationKey = keyof typeof dictionary.vi
