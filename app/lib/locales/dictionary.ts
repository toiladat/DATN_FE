import { errorsVi } from './vi/errors.vi'
import { errorsEn } from './en/errors.en'

export const dictionary = {
  vi: {
    // Card Translations
    'card.funding': 'ĐANG GỌI VỐN',
    'card.active': 'ĐANG TRIỂN KHAI',
    'card.completed': 'ĐÃ HOÀN THÀNH',
    'card.pending': 'ĐANG CHỜ DUYỆT',
    'card.backers_one': '{{count}} người ủng hộ',
    'card.backers_other': '{{count}} người ủng hộ',
    'card.sys_progress': 'TIẾN ĐỘ',
    'card.sys_roadmap': 'LỘ TRÌNH',
    'card.raised': 'Đã gọi vốn',
    'card.goal': 'Mục tiêu',
    'card.done': 'HOÀN THÀNH',
    'card.updated': 'ĐÃ CẬP NHẬT',
    'card.days_left': 'NGÀY CÒN LẠI',
    'card.milestones': 'CỘT MỐC',
    'card.init_support': 'Đóng góp ngay',
    'card.view_protocol': 'Xem chi tiết',

    // Navigation / Header
    'nav.home': 'Trang chủ',
    'tab.story': 'Giới thiệu',
    'tab.milestone': 'Cột mốc',
    'tab.updates': 'Cập nhật tiến độ',
    'tab.review': 'Đánh giá & Thảo luận',
    'tab.attachments': 'Tài liệu đính kèm',
    'tab.teams': 'Đội ngũ phát triển',
    'detail.ready_to_launch': 'Sẵn sàng khởi chạy',
    'detail.approved_desc':
      'Dự án của bạn đã được phê duyệt! Sẵn sàng để khởi tạo trên Blockchain.',
    'detail.publish_btn': 'Kích hoạt trên Blockchain',
    'detail.funding_progress': 'Tiến độ gọi vốn',
    'detail.raised': 'đã gọi vốn',
    'detail.goal': 'Mục tiêu',
    'detail.fund_btn': 'Đóng góp cho dự án',
    'detail.project_status': 'Trạng thái dự án',
    'detail.active_status_desc':
      'Dự án đã gọi vốn thành công và đang trong giai đoạn triển khai các cột mốc cam kết.',
    'detail.project_completed': 'Dự án đã hoàn thành',
    'detail.success_status_desc':
      'Dự án đã hoàn thành toàn bộ các cột mốc cam kết và giải ngân thành công nguồn vốn!',
    'detail.roadmap_milestones': 'Lộ trình & Cột mốc',
    'detail.withdraw': 'Giải ngân cột mốc',
    'detail.pending': 'Đang xử lý...',
    'detail.advantages': 'Lợi thế',
    'detail.challenges': 'Thách thức',
    'detail.expected_outcome': 'Sản phẩm bàn giao dự kiến',
    'detail.official_update_report': 'Báo cáo tiến độ chính thức',
    'detail.completed': 'Hoàn thành',
    'detail.blockers': 'Khó khăn & Trở ngại',
    'detail.watch_demo': 'Xem Demo',
    'detail.external_link': 'Liên kết ngoài',
    'detail.withdrawn': 'Đã giải ngân',
    'nav.projects': 'Dự án',
    'nav.launch_idea': 'Khởi chạy ý tưởng',
    'nav.my_projects': 'Dự án của tôi',
    'nav.connect_wallet': 'Kết nối ví',
    'nav.disconnect': 'Đăng xuất',
    'nav.profile': 'Trang cá nhân',
    'nav.my_investments': 'Lịch sử đầu tư',

    // Validation titles
    'validation.missing_required_fields': 'Thiếu thông tin bắt buộc',
    'validation.budget_mismatch': 'Ngân sách không khớp',
    'validation.budget_exceeded': 'Vượt quá giới hạn ngân sách',
    'validation.member_added': 'Đã thêm thành viên',
    'validation.member_already_added': 'Thành viên đã có trong danh sách',
    'validation.missing_information': 'Thiếu thông tin',
    'validation.missing_role_description': 'Thiếu mô tả vai trò',

    // Form Zod validations
    title_required: 'Vui lòng nhập tiêu đề dự án',
    subtitle_required: 'Vui lòng nhập mô tả ngắn dự án',
    primary_category_required: 'Vui lòng chọn danh mục chính',
    location_required: 'Vui lòng nhập địa điểm dự án',
    image_required: 'Vui lòng tải lên ít nhất 1 hình ảnh tham chiếu',
    funding_goal_positive: 'Mục tiêu gọi vốn phải lớn hơn 0',
    start_date_required: 'Vui lòng chọn ngày bắt đầu',
    end_date_required: 'Vui lòng chọn ngày kết thúc',
    description_required: 'Vui lòng nhập mô tả chi tiết dự án',
    risks_required: 'Vui lòng nhập rủi ro & thách thức',

    milestone_name_required: 'Vui lòng nhập tên cột mốc',
    milestone_description_required: 'Vui lòng nhập mô tả cột mốc',
    milestone_duration_positive: 'Thời gian thực hiện phải lớn hơn 0 ngày',
    milestone_budget_positive: 'Ngân sách phân bổ phải lớn hơn 0',
    milestone_images_required:
      'Vui lòng tải lên ít nhất 1 hình ảnh minh họa cho cột mốc',
    milestone_outcome_required: 'Vui lòng nhập kết quả bàn giao dự kiến',

    member_id_required: 'Vui lòng nhập ID thành viên',
    member_name_required: 'Vui lòng nhập tên thành viên',
    member_email_invalid: 'Địa chỉ email không đúng định dạng',
    member_email_required: 'Vui lòng nhập địa chỉ email',
    member_wallet_required: 'Vui lòng nhập địa chỉ ví',

    // Step labels
    'step.basics': 'Thông tin cơ bản',
    'step.milestones': 'Cột mốc lộ trình',
    'step.team': 'Đội ngũ phát triển',
    'step.attachments': 'Tài liệu đính kèm',
    'step.overview': 'Tổng quan',

    // Common buttons
    'btn.continue': 'Tiếp tục',
    'btn.back': 'Quay lại',
    'btn.cancel': 'Hủy bỏ',
    'btn.add': 'Thêm',
    'btn.update': 'Cập nhật',
    'btn.publish': 'Kích hoạt',
    'btn.save': 'Lưu',
    'btn.discard_changes': 'Hủy thay đổi',
    'common.optional': 'không bắt buộc',
    'common.prev': 'Trước',
    'common.next': 'Sau',
    'common.pageOf': 'Trang {{current}} / {{total}}',
    'common.wizard': 'Trình hướng dẫn',
    'common.locale': 'vi-VN',
    'common.view_file': 'Xem tệp',

    // Milestones
    'milestones.title': 'Thiết lập các cột mốc dự án',
    'milestones.desc':
      'Chia nhỏ lộ trình dự án thành các cột mốc cụ thể để dễ quản lý, nâng cao tính minh bạch và trách nhiệm giải trình.',
    'milestones.totalBudget': 'Tổng ngân sách cột mốc',
    'milestones.remainingBudget': 'Còn lại: {{remaining}} USDT',
    'milestones.executionTime': 'Thời gian triển khai',
    'milestones.totalDuration': '{{duration}} ngày',
    'milestones.remainingDuration': 'Còn lại: {{remaining}} ngày',
    'milestones.noMaxDuration':
      'Số lượng cột mốc: {{count}} (Không giới hạn thời gian)',
    'milestones.name': 'Tên cột mốc',
    'milestones.namePlaceholder':
      'Ví dụ: Cột mốc 1: Hoàn thiện phiên bản thử nghiệm MVP',
    'milestones.description': 'Mô tả chi tiết',
    'milestones.descriptionPlaceholder':
      'Chi tiết các đầu mục công việc cụ thể và yêu cầu kỹ thuật...',
    'milestones.duration': 'Thời gian thực hiện (Ngày)',
    'milestones.durationHelper': 'Thời gian dự kiến để hoàn thành cột mốc này.',
    'milestones.budget': 'Phân bổ ngân sách (USDT)',
    'milestones.budgetHelper':
      'Không được vượt quá mục tiêu gọi vốn của dự án.',
    'milestones.advantages': 'Lợi thế / Thuận lợi (Tùy chọn)',
    'milestones.challenges': 'Thách thức / Khó khăn (Tùy chọn)',
    'milestones.referenceImage': 'Hình ảnh tham chiếu',
    'milestones.expectedOutcome': 'Sản phẩm bàn giao dự kiến',
    'milestones.expectedOutcomePlaceholder':
      'Mô tả chi tiết sản phẩm bàn giao thực tế tại cột mốc này...',
    'milestones.adminWarning':
      'Ban quản trị sẽ kiểm tra bằng chứng nghiệm thu khi đến hạn để phê duyệt hoặc từ chối giải ngân cho từng cột mốc. Vui lòng thiết lập thông tin này thật cẩn thận.',
    'milestones.cancelEdit': 'Hủy chỉnh sửa',
    'milestones.uploading': 'Đang tải lên...',
    'milestones.update': 'Cập nhật cột mốc',
    'milestones.add': 'Thêm cột mốc',
    'milestones.pipeline': 'Lộ trình cột mốc',
    'milestones.empty': 'Chưa thiết lập cột mốc nào.',
    'milestones.emptyHint': 'Điền biểu mẫu bên trái để thêm cột mốc mới',
    'milestones.continueToTeam': 'Tiếp tục thiết lập Đội ngũ',

    // Basics
    'basics.title': 'Thông tin cơ bản',
    'basics.desc':
      'Giúp người ủng hộ dễ dàng tìm hiểu về dự án của bạn. Các thông tin này sẽ xuất hiện trên trang chi tiết và kết quả tìm kiếm.',
    'basics.projectTitle': 'Tiêu đề dự án',
    'basics.projectTitleDesc':
      'Đặt tiêu đề và phụ đề ngắn gọn, súc tích để giới thiệu nhanh về sản phẩm bạn đang xây dựng.',
    'basics.fieldTitle': 'Tiêu đề',
    'basics.fieldSubtitle': 'Phụ đề',
    'basics.titlePlaceholder':
      'Ví dụ: Két Sắt Vĩnh Hằng: Trải nghiệm Điện ảnh Web3',
    'basics.subtitlePlaceholder':
      'Một hành trình trải nghiệm sâu sắc cùng FundHive, kết hợp giao diện đa chiều và tính bảo mật tối đa từ hợp đồng thông minh.',
    'basics.projectCategory': 'Danh mục dự án',
    'basics.projectCategoryDesc':
      'Chọn danh mục mô tả đúng nhất dự án của bạn để nhà đầu tư dễ dàng tìm thấy.',
    'basics.primaryCategory': 'Danh mục chính',
    'basics.secondaryCategory': 'Danh mục phụ (Không bắt buộc)',
    'basics.selectCategory': 'Chọn danh mục',
    'basics.loadingCategories': 'Đang tải danh mục...',
    'basics.noCategories': 'Không tìm thấy danh mục nào',
    'basics.projectLocation': 'Địa điểm vận hành',
    'basics.projectLocationDesc':
      'Dự án của bạn được vận hành từ đâu? Điều này giúp chúng tôi phân phối dự án phù hợp với nhà đầu tư tiềm năng theo khu vực.',
    'basics.searchLocationPlaceholder': 'Tìm kiếm thành phố hoặc quốc gia',
    'basics.projectMedia': 'Hình ảnh & Video truyền thông',
    'basics.projectMediaDesc':
      'Hình ảnh là yếu tố quan trọng nhất để truyền tải thông điệp dự án. Hình ảnh chất lượng cao giúp tăng tỷ lệ gọi vốn thành công lên đến 80%.',
    'basics.referenceImage': 'Ảnh bìa / Ảnh đại diện dự án (Bắt buộc)',
    'basics.uploadingImages': 'Đang tải lên hình ảnh...',
    'basics.projectVideo': 'Video giới thiệu dự án (Không bắt buộc)',
    'basics.uploadingVideo': 'Đang tải lên video, vui lòng đợi...',
    'basics.videoSelected': 'Đã chọn video. Nhấp để thay đổi.',
    'basics.videoHelper':
      'Tối đa 100MB. Định dạng MP4, WEBM hoặc MOV. Khuyên dùng độ phân giải cao.',
    'basics.videoUploading': 'Đang tải...',
    'basics.videoChange': 'Thay đổi',
    'basics.videoUpload': 'Tải lên',
    'basics.videoNotSupported':
      'Trình duyệt của bạn không hỗ trợ thẻ phát video.',
    'basics.removeVideo': 'Gỡ bỏ Video',
    'basics.projectStory': 'Câu chuyện dự án',
    'basics.projectStoryDesc':
      'Trình bày chi tiết ý tưởng của bạn với cộng đồng. Hãy cởi mở và minh bạch về các rủi ro hay thách thức.',
    'basics.projectDescription': 'Mô tả chi tiết dự án',
    'basics.projectDescriptionPlaceholder':
      'Bắt đầu soạn thảo câu chuyện dự án của bạn tại đây...',
    'basics.risks': 'Rủi ro & Thách thức',
    'basics.risksPlaceholder':
      'Minh bạch về các rào cản kỹ thuật tiềm ẩn, biến động thị trường hoặc thách thức pháp lý...',
    'basics.fundingGoal': 'Mục tiêu gọi vốn',
    'basics.fundingGoalDesc':
      'Đặt một mục tiêu vừa thực tế vừa đủ đáp ứng. Lưu ý chính sách "Được ăn cả, ngã về không" của hệ thống.',
    'basics.allOrNothing': 'Được ăn cả, ngã về không (All-or-Nothing)',
    'basics.allOrNothingDesc':
      'Nếu chiến dịch không đạt đủ 100% mục tiêu gọi vốn trước thời hạn, toàn bộ số tiền đã đóng góp sẽ tự động được hoàn trả cho người ủng hộ và bạn sẽ không nhận được bất kỳ khoản tiền nào.',
    'basics.targetLaunchDate': 'Ngày khởi chạy dự kiến',
    'basics.targetLaunchDateDesc':
      'Không bắt buộc. Đặt ngày mục tiêu để bám sát lộ trình. Bạn có thể thay đổi ngày này sau.',
    'basics.selectDate': 'Chọn ngày',
    'basics.pickDate': 'Chọn ngày khởi chạy dự kiến',
    'basics.recommendedTimeline': 'Lộ trình khuyến nghị',
    'basics.recommendedTimelineDesc':
      'Chúng tôi khuyên bạn nên có giai đoạn chuẩn bị kéo dài 3 tuần để thu hút sự chú ý trước khi chiến dịch bắt đầu.',
    'basics.campaignDuration': 'Thời lượng chiến dịch',
    'basics.campaignDurationDesc':
      'Hầu hết các chiến dịch gọi vốn thành công thường kéo dài từ 30 đến 45 ngày.',
    'basics.fixedDays': 'Thời lượng cố định theo số ngày',
    'basics.fixedDaysDesc': 'Đặt khoảng thời gian cụ thể (1-60 ngày)',
    'basics.endSpecificDate': 'Kết thúc vào một ngày cụ thể',
    'basics.endSpecificDateDesc': 'Chọn một ngày cụ thể trên lịch',
    'basics.selectEndDate': 'Chọn ngày kết thúc',
    'basics.continueToMilestones': 'Tiếp tục thiết lập Cột mốc',

    // Team
    'team.title': 'Xây dựng đội ngũ',
    'team.desc':
      'Thêm các thành viên cốt lõi để xây dựng lòng tin với cộng đồng. Cơ cấu đội ngũ minh bạch giúp tăng 40% tỷ lệ gọi vốn thành công.',
    'team.contributorDetails': 'Thông tin thành viên',
    'team.searchLabel': 'Tìm kiếm thành viên trên hệ thống',
    'team.searchPlaceholder': 'Nhập tên người dùng, ví Web3 hoặc email...',
    'team.searching': 'Đang tìm kiếm...',
    'team.noEmail': 'Không có email',
    'team.noUserFound': 'Không tìm thấy người dùng nào trên hệ thống.',
    'team.fullName': 'Họ và tên',
    'team.populatePlaceholder': 'Tìm kiếm ở trên để tự động điền...',
    'team.emailAddress': 'Địa chỉ Email',
    'team.walletAddress': 'Địa chỉ ví',
    'team.role': 'Vai trò / Chức danh',
    'team.selectRole': 'Chọn vai trò',
    'team.roleDesc': 'Mô tả vai trò',
    'team.roleDescPlaceholder':
      'Mô tả ngắn gọn trách nhiệm và đóng góp cụ thể của thành viên này...',
    'team.addMember': 'Thêm thành viên',
    'team.activeRoster': 'Đội ngũ phát triển',
    'team.membersCount': '({{count}} thành viên)',
    'team.empty': 'Chưa có thành viên nào được thêm vào đội ngũ.',
    'team.continueToAttachments': 'Tiếp tục đính kèm Tài liệu',
    'team.role.founder': 'Người sáng lập (Founder)',
    'team.role.leaddeveloper': 'Lập trình viên chính',
    'team.role.designer': 'Thiết kế sản phẩm (Designer)',
    'team.role.marketing': 'Truyền thông & Tiếp thị',
    'team.role.advisor': 'Cố vấn dự án',
    'team.no_description': 'Chưa có mô tả vai trò.',
    'team.no_members': 'Chưa thiết lập đội ngũ.',
    'team.empty_hint': 'Thành viên đội ngũ được thiết lập khi khởi tạo dự án.',

    // Attachments
    'attachments.title': 'Tài liệu minh chứng',
    'attachments.desc':
      'Tải lên các tài liệu pháp lý hoặc bổ trợ — chứng chỉ, danh mục sản phẩm, CV hoặc kế hoạch kinh doanh nhằm giúp nhà đầu tư xác minh năng lực và gia tăng sự tin cậy.',
    'attachments.category': 'Thể loại',
    'attachments.typeName': 'Tên tài liệu',
    'attachments.typeNamePlaceholder':
      'Ví dụ: Sách trắng, Bản thử nghiệm, Chứng nhận...',
    'attachments.description': 'Mô tả ngắn',
    'attachments.descriptionPlaceholder':
      'Ví dụ: Chứng chỉ Kiến trúc sư giải pháp AWS 2024...',
    'attachments.dragDrop': 'Kéo & thả tệp tin vào đây',
    'attachments.dropHere': 'Thả tệp tin vào đây',
    'attachments.browse': 'chọn từ máy tính',
    'attachments.orBrowse': 'hoặc {{browse}} để tải lên',
    'attachments.constraints':
      'JPG, PNG, WEBP, GIF, PDF, DOC, DOCX — tối đa {{max}}MB mỗi tệp',
    'attachments.filesUsed': 'Đã tải lên {{count}}/{{max}} tệp',
    'attachments.empty': 'Chưa có tài liệu nào được tải lên.',
    'attachments.emptySub':
      'Bước này không bắt buộc — nhưng được khuyến nghị nhằm gia tăng độ tin cậy đối với nhà đầu tư.',
    'attachments.no_attachments_found': 'Không tìm thấy tài liệu đính kèm',
    'attachments.no_attachments_desc':
      'Dự án này chưa tải lên tài liệu bổ trợ nào.',
    'attachments.project_documents': 'Tài liệu dự án',
    'attachments.files_count': '({{count}} tệp)',
    'media.no_media': 'Chưa có hình ảnh/video',
    'media.images': 'Hình ảnh',
    'media.video': 'Video',
    'investors.title': 'Nhà đầu tư',
    'investors.empty':
      'Chưa có nhà đầu tư nào. Hãy là người đầu tiên đóng góp!',
    'investors.top': 'Hàng đầu',
    'investors.recent': 'Mới nhất',
    'investors.anonymous': 'Ẩn danh',
    'updates.submitted_late': 'Nộp muộn',
    'updates.progress_title': 'Hạng mục hoàn thành',
    'updates.blockers_title': 'Khó khăn & Trở ngại gặp phải',
    'updates.view_update': 'Xem chi tiết',
    'updates.hide': 'Thu gọn',
    'updates.close': 'Đóng',
    'updates.edit_update': 'Chỉnh sửa báo cáo',
    'updates.update': 'Cập nhật',
    'updates.late_tag': '(Trễ hạn)',
    'updates.complete_prev_first': 'Vui lòng hoàn thành cột mốc trước đó trước',
    'updates.starts_on': 'Bắt đầu từ {{date}}',
    'updates.no_milestones': 'Chưa xác định cột mốc nào',
    'updates.no_milestones_desc':
      'Các cột mốc phát triển được thiết lập khi tạo dự án.',
    'updates.title': 'Báo cáo tiến độ',
    'updates.phases_count': '{{count}} cột mốc',
    'updates.only_owner_can_submit':
      'Chỉ chủ sở hữu dự án mới có quyền gửi báo cáo cập nhật tiến độ.',
    'updates.starts_in': 'bắt đầu sau {{days}} ngày',
    'updates.ends_today': 'hết hạn hôm nay',
    'updates.days_left': 'còn lại {{days}} ngày',
    'updates.days_overdue': 'quá hạn {{days}} ngày',
    'updates.status.done': 'Hoàn thành',
    'updates.status.progress': 'Đang làm',
    'updates.status.late': 'Nộp muộn',
    'updates.status.closed': 'Đã đóng',
    'updates.status.locked': 'Chưa mở',
    'reviews.comments_count': '{{count}} bình luận',
    'reviews.comments_count_plural': '{{count}} bình luận',
    'reviews.title': 'Đánh giá & Thảo luận',
    'reviews.write_placeholder': 'Viết bình luận của bạn...',
    'reviews.connect_wallet_warning':
      'Vui lòng kết nối ví để tham gia thảo luận về dự án này.',
    'reviews.empty':
      'Chưa có thảo luận nào — hãy là người đầu tiên chia sẻ ý kiến của bạn!',
    'reviews.send_error': 'Không thể gửi bình luận.',
    'reviews.show_less': 'Thu gọn',
    'reviews.see_more': 'Xem thêm',
    'reviews.reply_error': 'Không thể gửi phản hồi.',
    'reviews.edit_error': 'Không thể sửa bình luận.',
    'reviews.delete_confirm':
      'Bạn có chắc chắn muốn xóa bình luận này không? Các câu trả lời liên quan cũng sẽ bị xóa.',
    'reviews.delete_success': 'Đã xóa bình luận thành công!',
    'reviews.delete_error': 'Không thể xóa bình luận.',
    'reviews.owner_badge': 'Chủ dự án',
    'reviews.team_badge': 'Đội ngũ',
    'reviews.edit': 'Chỉnh sửa',
    'reviews.delete': 'Xóa',
    'reviews.cancel': 'Hủy',
    'reviews.save': 'Lưu',
    'reviews.reply': 'Phản hồi',
    'reviews.reply_placeholder': 'Trả lời {{name}}...',
    'reviews.view_more_reply': 'Xem thêm 1 phản hồi',
    'reviews.view_more_replies': 'Xem thêm {{count}} phản hồi',
    'attachments.editTitle': 'Chỉnh sửa tài liệu',
    'attachments.editTypeNameRequired': 'Vui lòng nhập tên tài liệu.',
    'attachments.completeSetup': 'Hoàn tất thiết lập',
    'toast.unsupported_file':
      '{{name}}: Định dạng tệp không được hỗ trợ. Vui lòng sử dụng JPG, PNG, WEBP, GIF hoặc PDF.',
    'toast.file_size_exceeded':
      '{{name}}: Dung lượng tệp vượt quá giới hạn {{max}}MB.',
    'toast.max_files_exceeded': 'Bạn chỉ được tải lên tối đa {{max}} tài liệu.',
    'toast.presign_failed':
      'Không thể kết nối máy chủ tải lên. Vui lòng thử lại.',
    'toast.upload_progress_failed': 'Tải lên thất bại',
    'toast.upload_single_failed': 'Tải lên tệp {{name}} thất bại.',
    'toast.upload_success_vi_1': 'Đã tải lên tài liệu thành công.',
    'toast.upload_success_vi_many': 'Đã tải lên {{count}} tài liệu thành công.',

    'btn.edit': 'Chỉnh sửa',
    'btn.delete': 'Xóa',

    // Toast details
    'toast.budget_mismatch_desc':
      'Tổng ngân sách phân bổ cho các cột mốc ({{total}} USDT) phải khớp chính xác 100% với mục tiêu gọi vốn của dự án ({{goal}} USDT).',
    'toast.publish_success':
      'Đề xuất dự án thành công! Ban quản trị sẽ tiến hành thẩm định và phê duyệt dự án trong vòng 48 giờ tới.',
    'toast.publish_error': 'Có lỗi xảy ra trong quá trình xuất bản dự án.',
    'toast.complete_required_fields':
      'Vui lòng hoàn thành đầy đủ tất cả các thông tin bắt buộc trước khi gửi duyệt.',
    'toast.select_member_desc':
      'Vui lòng tìm kiếm và chọn một tài khoản trên hệ thống để điền thông tin thành viên.',
    'toast.role_desc_required':
      'Vui lòng cung cấp mô tả ngắn gọn về trách nhiệm của thành viên này trong dự án.',
    'toast.member_exists_desc':
      'Thành viên này đã có tên trong danh sách đội ngũ.',
    'toast.member_added_success':
      'Đã thêm {{name}} vào danh sách đội ngũ dự án thành công.',
    'toast.milestone_budget_exceeded_desc':
      'Cột mốc này vượt quá ngân sách còn lại ({{remaining}} USDT).',
    'toast.upload_failed': 'Tải lên thất bại',
    'toast.upload_failed_desc': 'Không thể tải lên một số hình ảnh minh họa.',
    'toast.video_too_large': 'Video quá dung lượng',
    'toast.video_too_large_desc': 'Dung lượng video tối đa được phép là 100MB.',
    'toast.uploading_video': 'Đang tải video giới thiệu lên...',
    'toast.video_uploaded_success': 'Tải video thành công!',
    'toast.video_upload_failed': 'Tải video thất bại',
    'toast.video_upload_failed_desc':
      'Vui lòng thử lại với định dạng video khác.',
    'toast.milestone_updated': 'Đã cập nhật thông tin cột mốc thành công!',
    'toast.milestone_added': 'Đã thêm cột mốc mới thành công!',
    'toast.save_success': 'Lưu cài đặt tài khoản thành công!',
    'toast.like_success': 'Đã lưu dự án vào danh sách yêu thích!',
    'toast.unlike_success': 'Đã xóa dự án khỏi danh sách yêu thích.',
    'toast.like_error': 'Không thể lưu dự án yêu thích.',
    'toast.unlike_error': 'Không thể xóa dự án yêu thích.',
    'toast.like_wallet_required':
      'Vui lòng kết nối ví Web3 để yêu thích dự án này.',

    // Profile Translations
    'profile.identity_details': 'Thông tin cá nhân',
    'profile.display_name': 'Tên hiển thị',
    'profile.display_name_placeholder': 'Tên công khai hiển thị trên nền tảng',
    'profile.email_address': 'Địa chỉ email',
    'profile.email_placeholder': 'alex@example.com',
    'profile.btn_verify': 'Xác minh ngay',
    'profile.btn_verified': 'Đã xác minh',
    'profile.btn_confirm': 'Xác nhận',
    'profile.phone_number': 'Số điện thoại',
    'profile.phone_placeholder': '+84 900-000-000',
    'profile.location': 'Quốc gia / Khu vực',
    'profile.location_placeholder': 'Tìm kiếm thành phố hoặc quốc gia',
    'profile.biography': 'Giới thiệu bản thân',
    'profile.biography_placeholder':
      'Hãy chia sẻ một vài điều về kinh nghiệm hoặc dự án của bạn...',
    'profile.biography_desc':
      'Mô tả ngắn gọn về kinh nghiệm, lĩnh vực hoạt động hoặc sở thích của bạn.',
    'profile.presence_links': 'Liên kết & Kênh truyền thông',
    'profile.website': 'Trang web cá nhân (Website)',
    'profile.platform': 'Nền tảng',
    'profile.social_links': 'Mạng xã hội',
    'profile.btn_add_link': 'Thêm liên kết',
    'profile.social_url_placeholder': 'Đường dẫn liên kết https://',
    'profile.remove_link': 'Gỡ bỏ',
    'profile.avatar_title': 'Ảnh đại diện',
    'profile.avatar_formats': 'JPEG, PNG, hoặc WebP. Dung lượng tối đa: 15MB.',
    'profile.btn_uploading': 'Đang tải lên...',
    'profile.btn_select_file': 'Thay đổi ảnh',
    'profile.unsaved_changes': 'Thông tin thay đổi chưa lưu',
    'profile.unsaved_changes_desc':
      'Xem lại kỹ các chỉnh sửa trước khi cập nhật lên hệ thống.',
    'profile.btn_saving': 'Đang tiến hành lưu...',
    'profile.btn_save_settings': 'Lưu cài đặt',
    'toast.save_error': 'Đã xảy ra lỗi trong quá trình lưu cài đặt.',
    'toast.email_required':
      'Vui lòng nhập địa chỉ email trước khi tiến hành xác minh.',
    'toast.email_invalid': 'Địa chỉ email không đúng định dạng.',
    'Invalid email': 'Địa chỉ email không đúng định dạng.',
    'toast.otp_sent_success': 'Mã OTP xác minh đã được gửi đến email của bạn!',
    'toast.otp_sent_failed': 'Không thể gửi mã OTP xác minh.',
    'toast.otp_length_error': 'Mã OTP xác minh phải đầy đủ 6 chữ số.',
    'toast.kyc_verified_success': 'Xác minh email thành công!',
    'toast.kyc_verified_failed':
      'Xác minh thất bại. Mã OTP không chính xác hoặc đã hết hạn.',
    'toast.connect_wallet_required': 'Vui lòng kết nối ví Web3 của bạn trước!',
    'toast.target_launch_date_past':
      'Ngày bắt đầu dự kiến phải ở tương lai! Vui lòng chọn ngày khác hoặc kích hoạt Chế độ thử nghiệm.',
    'toast.milestone_time_invalid':
      'Thời gian thực hiện cột mốc {{order}} không hợp lệ (phải sau ngày kết thúc gọi vốn và sau cột mốc trước đó)',
    'toast.milestone_total_mismatch':
      'Tổng ngân sách các cột mốc không khớp với mục tiêu gọi vốn!',
    'toast.confirm_tx_wallet':
      'Vui lòng xác nhận giao dịch trên ví điện tử của bạn...',
    'toast.waiting_tx_mined': 'Đang chờ xác nhận giao dịch trên blockchain...',
    'toast.launch_blockchain_success':
      'Kích hoạt dự án trên blockchain thành công!',
    'toast.contract_call_error': 'Giao dịch hợp đồng thông minh thất bại.',
    'toast.tx_rejected': 'Bạn đã từ chối ký xác nhận giao dịch.',
    'toast.invalid_amount': 'Vui lòng nhập số tiền đóng góp hợp lệ',
    'toast.amount_exceeds_remaining':
      'Bạn chỉ có thể đóng góp tối đa {{remaining}} USDT (số tiền còn lại để đạt mục tiêu gọi vốn)',
    'toast.insufficient_balance':
      'Số dư tài khoản không đủ để thực hiện giao dịch',
    'toast.waiting_approve_tx': 'Đang thực hiện giao dịch',
    'toast.confirming_investment_chain': 'Đang thực hiện giao dịch',
    'toast.invest_error': 'Giao dịch thất bại. Vui lòng thử lại.',
    'toast.invest_success': 'Đóng góp thành công! Cảm ơn bạn đã ủng hộ dự án.',
    'toast.amount_exceeds_remaining_usdt':
      'Bạn chỉ có thể đóng góp tối đa {{remaining}} USDT (số tiền còn lại để đạt mục tiêu gọi vốn)',

    'invest.title': 'ĐỒNG GÓP CHO DỰ ÁN',
    'invest.available_balance': 'Số dư khả dụng',
    'invest.amount_placeholder': 'Nhập số tiền USDT đóng góp',
    'invest.optional_message': 'Lời nhắn động viên gửi Founder (Tùy chọn)',
    'invest.message_placeholder':
      'Gửi những lời nhắn nhủ hoặc đóng góp ý kiến mang tính xây dựng đến Founder...',
    'invest.confirm_btn': 'XÁC NHẬN ĐÓNG GÓP',
    'invest.processing_btn': 'ĐANG XỬ LÝ GIAO DỊCH...',

    'publish.title': 'Khởi chạy dự án lên Blockchain',
    'publish.description':
      'Đề xuất dự án của bạn đã được Ban quản trị phê duyệt. Bây giờ bạn cần khởi tạo hợp đồng thông minh két sắt cho chiến dịch trên Sepolia Testnet (yêu cầu phí gas mạng lưới).',
    'publish.funding_goal': 'Mục tiêu gọi vốn:',
    'publish.milestones_count': 'Số lượng cột mốc:',
    'publish.demo_mode': 'Chế độ thử nghiệm (Demo Mode)',
    'publish.demo_on': 'BẬT — Gọi vốn trong 5 phút, rút tiền & test nhanh',
    'publish.demo_off': 'TẮT — Áp dụng mốc thời gian thực của dự án',
    'publish.confirm_btn': 'Xác nhận & Khởi chạy',

    'updates.form.success': 'Báo cáo tiến độ được gửi thành công!',
    'updates.form.late_warning':
      'Cập nhật này đã quá thời hạn của cột mốc. Báo cáo sẽ được đánh dấu là hoàn thành muộn.',
    'updates.form.completed_label': 'Hạng mục đã hoàn thành',
    'updates.form.completed_placeholder':
      'Liệt kê và mô tả chi tiết các sản phẩm, tính năng đã hoàn thành bàn giao trong cột mốc này...',
    'updates.form.blockers_label': 'Khó khăn & Trở ngại gặp phải',
    'updates.form.blockers_placeholder':
      'Mô tả các vấn đề phát sinh, trở ngại kỹ thuật hoặc nguyên nhân gây chậm trễ nếu có...',
    'updates.form.images_label': 'Hình ảnh thực tế tiến độ',
    'updates.form.images_helper': 'không bắt buộc · tối đa 4 hình ảnh',
    'updates.form.uploading_images': 'Đang tải lên hình ảnh tiến độ...',
    'updates.form.upload_failed': 'Tải lên hình ảnh thất bại',
    'updates.form.upload_failed_desc':
      'Có lỗi xảy ra khi tải lên một số hình ảnh.',
    'updates.form.try_again': 'Vui lòng thử lại.',
    'updates.form.video_label': 'Video chạy thử / Demo sản phẩm',
    'updates.form.video_selected': 'Đã chọn video demo',
    'updates.form.video_upload_label': 'Tải video demo lên',
    'updates.form.video_uploading': 'Đang tải video lên, vui lòng đợi...',
    'updates.form.video_click_replace': 'Nhấp để thay đổi video',
    'updates.form.video_constraints':
      'Định dạng MP4, WEBM hoặc MOV · Tối đa 100MB',
    'updates.form.change': 'Thay đổi',
    'updates.form.upload': 'Tải lên',
    'updates.form.link_label': 'Liên kết kiểm chứng sản phẩm',
    'updates.form.submit_failed':
      'Không thể gửi báo cáo tiến độ. Vui lòng thử lại.',
    'updates.form.submitting': 'Đang tiến hành gửi báo cáo...',
    'updates.form.submit_btn': 'Gửi báo cáo tiến độ',

    'withdraw.title': 'GIẢI NGÂN VỐN CỘT MỐC',
    'withdraw.milestone_label': 'Cột mốc giải ngân',
    'withdraw.amount_label': 'Ngân sách giải ngân',
    'withdraw.release_passed': 'Đã đủ điều kiện giải ngân ({{date}})',
    'withdraw.release_pending': 'Chưa đến thời hạn giải ngân: {{date}}',
    'withdraw.note': 'Lưu ý quan trọng: ',
    'withdraw.warning_prefix':
      'Giao dịch này được thực hiện trực tiếp trên blockchain và không thể hoàn tác. Hợp đồng thông minh sẽ chuyển tự động ',
    'withdraw.warning_suffix':
      ' USDT về địa chỉ ví của bạn. Vui lòng đợi trong giây lát để mạng lưới xác nhận.',
    'withdraw.admin_approved': 'Cột mốc đã được phê duyệt nghiệm thu',
    'toast.sending_tx_blockchain':
      'Đang gửi yêu cầu rút tiền lên Blockchain...',
    'toast.withdraw_success':
      'Yêu cầu giải ngân đã được ghi nhận thành công! Số dư sẽ cập nhật trong vài giây.',
    'toast.error_occurred': 'Đã xảy ra lỗi trong quá trình thực thi',
    'withdraw.not_ready_btn': 'CHƯA ĐỦ ĐIỀU KIỆN GIẢI NGÂN',
    'withdraw.confirm_btn': 'XÁC NHẬN GIẢI NGÂN',

    // Overview
    'overview.projectOverview': 'Tổng quan dự án',
    'content.core_vision': 'Tầm nhìn cốt lõi',
    'content.no_vision': 'Chưa cung cấp thông tin tầm nhìn dự án.',
    'content.comprehensive_details': 'Mô tả chi tiết',
    'content.data_log': 'Thông tin chi tiết',
    'content.start': 'Ngày bắt đầu',
    'content.end': 'Ngày kết thúc',
    'content.location': 'Vị trí địa lý',
    'content.global_operations': 'Phạm vi vận hành',
    'content.category': 'Danh mục',
    'content.uncategorized': 'Chưa phân loại',
    'content.risks_challenges': 'Rủi ro & Thách thức',
    'overview.kyc_warning_title': 'Yêu cầu xác minh Email (KYC)',
    'overview.kyc_warning_desc':
      'Bạn cần hoàn thành xác minh địa chỉ email tại Trang cá nhân trước khi có thể khởi chạy chiến dịch gọi vốn.',
    'overview.kyc_warning_btn': 'Xác minh ngay',
    'overview.completeRequiredSections':
      'Vui lòng hoàn thành tất cả các mục bắt buộc trước khi xuất bản chiến dịch. Các tài liệu đính kèm là không bắt buộc nhưng sẽ củng cố lòng tin đối với nhà đầu tư.',
    'overview.sectionsComplete': 'mục đã hoàn tất',
    'overview.publishProject': 'Xuất bản dự án',
    'overview.lastUpdated': 'Cập nhật',
    'overview.justNow': 'vừa xong',
    'overview.stepBasicsDesc': 'Đặt tên dự án, tải lên hình ảnh giới thiệu...',
    'overview.stepMilestonesDesc':
      'Thiết lập các cột mốc giải ngân lộ trình...',
    'overview.stepTeamDesc': 'Xây dựng thông tin đội ngũ đồng sáng lập.',
    'overview.stepAttachmentsDesc':
      'Đính kèm whitepaper, hồ sơ năng lực, kế hoạch kinh doanh.',
    'status.complete': 'Đã hoàn tất',
    'status.in_progress': 'Đang triển khai',
    'status.not_started': 'Chưa bắt đầu',
    'status.optional': 'Tùy chọn',

    // My Projects / Kanban
    'my_project.board_title': 'Quản lý dự án',
    'my_project.new_project': 'Tạo dự án mới',
    'my_project.empty': 'Trống',
    'my_project.syncing': 'Đang đồng bộ dữ liệu...',
    'my_project.confirm_delete':
      'Bạn có chắc chắn muốn xóa dự án này? Thao tác này không thể hoàn tác.',
    'my_project.delete_success': 'Đã xóa dự án thành công!',
    'my_project.delete_error': 'Xóa dự án thất bại. Vui lòng thử lại.',
    'my_project.not_found': 'Không tìm thấy thông tin dự án',
    'my_project.back_to_my_projects': 'Quay lại danh sách dự án của tôi',
    'my_project.my_projects': 'Dự án của tôi',

    // Kanban Columns / Status
    'status.pending': 'Chờ phê duyệt',
    'status.progress': 'Đang gọi vốn',
    'status.active': 'Đang triển khai',
    'status.success': 'Thành công',
    'status.rejected': 'Bị từ chối',
    'status.approved': 'Đã phê duyệt',

    // Kanban Card
    'kanban.duration': 'Thời hạn chiến dịch',
    'kanban.milestones': 'cột mốc',
    'kanban.Milestones': 'Cột mốc',
    'kanban.funded': 'đã huy động',
    'kanban.view_details': 'Xem chi tiết',
    'kanban.delete_project': 'Xóa dự án',
    'kanban.update_progress': 'Cập nhật tiến độ',

    // Invested
    'invested.title_main': 'Danh mục đầu tư',
    'invested.title_my': 'của tôi',
    'invested.desc':
      'Theo dõi và quản lý các dự án Web3 bạn đã đóng góp vốn. Giám sát tiến độ hoàn thành các cột mốc thực tế và trạng thái giải ngân.',
    'invested.time_range': 'Lọc thời gian',
    'invested.all_time': 'Tất cả thời gian',
    'invested.last_30_days': '30 ngày gần đây',
    'invested.this_year': 'Trong năm nay',
    'invested.syncing': 'Đang đồng bộ dữ liệu đầu tư của bạn...',
    'invested.error':
      'Không thể tải danh sách đầu tư của bạn. Vui lòng tải lại trang hoặc thử lại sau.',
    'invested.no_investments_yet': 'Bạn chưa đóng góp vào dự án nào',
    'invested.no_investments_desc':
      'Bắt đầu khám phá các ý tưởng công nghệ đột phá trên FundHive và ủng hộ dự án đầu tiên của bạn ngay hôm nay!',
    'invested.history': 'Lịch sử giao dịch đóng góp',
    'invested.projects_counter': '{{count}} Dự án',
    'invested.no_projects_found':
      'Không tìm thấy khoản đóng góp nào trong khoảng thời gian đã chọn.',

    // InvestedStats
    'stats.total_invested': 'Tổng số vốn đã đóng góp',
    'stats.projects_backed': 'Số dự án đã ủng hộ',
    'stats.no_data': 'Chưa có số liệu thống kê',
    'stats.projects_plural': 'dự án',
    'stats.funding': 'Đang gọi vốn',
    'stats.failed': 'Gọi vốn thất bại',
    'stats.goal_reached_pct': 'Đạt {{percent}}% mục tiêu tối thiểu',
    'stats.days_left': 'Ngày còn lại',
    'stats.likes': 'Yêu thích',
    'stats.total_likes': '{{count}} lượt thích',
    'stats.total_reviews': '{{count}} đánh giá',

    // CompactCard & Refund
    'compact.reason': 'Lý do dừng:',
    'compact.refunded': 'Đã hoàn tiền',
    'refund.confirm_tx': 'Vui lòng xác nhận giao dịch rút tiền trên ví Web3...',
    'refund.tx_sent':
      'Giao dịch hoàn tiền đã được gửi. Đang chờ mạng lưới xác nhận...',
    'refund.success': 'Rút tiền hoàn trả về ví thành công!',
    'refund.error': 'Đã xảy ra lỗi trong quá trình rút tiền hoàn trả.',
    'refund.processing': 'Đang tiến hành rút tiền...',
    'refund.claim': 'Nhận lại tiền hoàn trả',

    // Landing / Hero
    'hero.badge': 'Gây quỹ cộng đồng Web3 phi tập trung',
    'hero.titleMain': 'Gây quỹ ủng hộ',
    'hero.titleHighlight': 'Dự án phi lợi nhuận',
    'hero.titleEnd': 'Minh bạch tuyệt đối.',
    'hero.subtitle':
      'Nền tảng quyên góp on-chain bảo vệ dòng tiền tài trợ của bạn. Đảm bảo mọi khoản ủng hộ đều được giải ngân chính xác theo kết quả sản phẩm thực tế.',
    'hero.btn.launch': 'Khởi chạy ý tưởng',
    'hero.btn.explore': 'Khám phá dự án',
    'hero.stats.poolValue': '100%',
    'hero.stats.poolLabel': 'Tỷ lệ dự án thành công',
    'hero.stats.title': '100% Phi lợi nhuận',
    'hero.stats.tag': 'Quyên góp trực tiếp',

    // Landing / Featured Pools
    'landing.featured_pools': 'Dự án gọi vốn nổi bật',
    'landing.featured_pools_desc':
      'Các chiến dịch phi tập trung đã qua kiểm duyệt kỹ lưỡng, đang kêu gọi đóng góp hoặc đang trong giai đoạn xây dựng sản phẩm. Quản lý minh bạch thông qua hợp đồng thông minh.',
    'landing.view_all_pools': 'Xem tất cả dự án',
    'landing.no_active_projects': 'Hiện không có dự án nào đang mở gọi vốn.',

    // Landing / Stats
    'landing.stats.title': 'Số liệu thống kê Giao thức',
    'landing.stats.desc':
      'Theo dõi trực quan quy mô phát triển và tiến độ thực tế của toàn bộ các dự án trong hệ sinh thái.',
    'landing.stats.total': 'Tổng số dự án',
    'landing.stats.total_desc': 'Ý tưởng công nghệ đã khởi tạo',
    'landing.stats.fundraising': 'Đang gọi vốn',
    'landing.stats.fundraising_desc': 'Đang mở đóng góp từ cộng đồng',
    'landing.stats.active': 'Đang triển khai',
    'landing.stats.active_desc': 'Đang thực hiện các cột mốc cam kết',
    'landing.stats.success': 'Đã hoàn thành',
    'landing.stats.success_desc': 'Đã nghiệm thu và bàn giao sản phẩm',
    'landing.stats.chart_label': 'Số lượng dự án',

    // Landing / How it works
    'landing.how_it_works': 'Quy trình hoạt động',
    'landing.how_it_works_desc':
      'Tham gia gọi vốn phi tập trung chỉ với 3 bước đơn giản, trực quan. An toàn, trực tiếp và minh bạch.',
    'landing.step1_title': 'Đề xuất ý tưởng',
    'landing.step1_desc':
      'Hoàn tất giới thiệu dự án trực quan. Định hình tầm nhìn, kế hoạch phân bổ vốn và các mốc phát triển.',
    'landing.step2_title': 'Thẩm định & Phê duyệt',
    'landing.step2_desc':
      'Ban quản trị và cộng đồng cùng thẩm định tính khả thi cũng như tính minh bạch của dự án.',
    'landing.step3_title': 'Gọi vốn & Triển khai',
    'landing.step3_desc':
      'Chiến dịch lên sóng blockchain. Người ủng hộ chuyển vốn vào két sắt hợp đồng thông minh ràng buộc chăm chẽ theo tiến độ cột mốc.',

    // Landing / Features
    'landing.features_title': 'Đặt trọn niềm tin vào',
    'landing.features_title_highlight': 'Mã nguồn.',
    'landing.features_desc':
      'Không giống như các nền tảng gây quỹ truyền thống, FundHive loại bỏ hoàn toàn rủi ro niềm tin. Mọi quy tắc giải ngân và hoàn trả đều được tự động hóa bằng hợp đồng thông minh bất biến đã qua kiểm toán.',
    'landing.feature1_title': 'Két sắt thông minh phi lưu ký',
    'landing.feature1_desc':
      'Nguồn vốn đóng góp được khóa an toàn trong hợp đồng thông minh. Founder chỉ được rút tiền khi các cột mốc tương ứng được nghiệm thu thành công.',
    'landing.feature2_title': 'Cộng đồng quản trị (DAO)',
    'landing.feature2_desc':
      'Người ủng hộ cùng bỏ phiếu biểu quyết để phê duyệt báo cáo tiến độ, cấp quyền giải ngân và định hướng phát triển dự án.',
    'landing.feature3_title': 'Số liệu minh bạch 24/7',
    'landing.feature3_desc':
      'Giám sát tiến độ gọi vốn, phân phối tài chính và mọi tương tác on-chain thông qua bảng số liệu trực tiếp.',
    'landing.feature4_title': 'Bảo mật đa kiểm toán',
    'landing.feature4_desc':
      'Hệ thống hợp đồng thông minh được kiểm toán bảo mật độc lập bởi các đơn vị uy tín trước khi vận hành.',

    // Landing / CTA Banner
    'landing.cta_title': 'Sẵn sàng tham gia khởi chạy ý tưởng?',
    'landing.cta_desc':
      'Kết nối ví Web3 của bạn và đồng hành cùng thế hệ công nghệ tương lai ngay hôm nay.',
    'landing.cta_btn_connect': 'Kết nối ví Web3 ngay',
    'landing.cta_btn_contact': 'Liên hệ tư vấn',

    // Footer
    'footer.desc':
      'Nền tảng bệ phóng dự án phi tập trung, hỗ trợ các ý tưởng blockchain thế hệ mới phát triển vững chắc dựa trên sự minh bạch tài chính và quản trị cộng đồng.',
    'footer.ecosystem': 'Hệ sinh thái',
    'footer.community': 'Cộng đồng',
    'footer.legal': 'Pháp lý & Thông tin',
    'footer.rights': 'Mọi quyền được bảo lưu.',

    // Search Filter
    'search.badge': 'FundHive / Dự án',
    'search.title': 'Dự án trong Hệ sinh thái',
    'search.placeholder': 'Tìm kiếm tên dự án...',
    'search.sort.trending': 'Nổi bật',
    'search.sort.newest': 'Mới nhất',
    'search.sort.most_funded': 'Gọi vốn nhiều nhất',
    'search.category.all': 'Tất cả danh mục',
    'search.searching': 'Đang tìm kiếm...',
    'search.no_results': 'Không tìm thấy kết quả phù hợp cho',
    'search.status.funding': 'ĐANG GỌI VỐN',
    'search.status.active': 'ĐANG TRIỂN KHAI',

    // Categories
    'category.art-design': 'Nghệ thuật & Thiết kế',
    'category.comics-illustration': 'Truyện tranh & Minh họa',
    'category.games-web3': 'Gaming & Web3',
    'category.music-audio': 'Âm nhạc & Âm thanh',
    'category.technology': 'Công nghệ đột phá',

    // Dropdown / Wallet / Theme
    'nav.wrong_network': 'Sai mạng lưới',
    'nav.verify_account_tooltip': 'Vui lòng xác thực tài khoản của bạn',
    'nav.appearance': 'Giao diện',
    'nav.appearance.light': 'Sáng',
    'nav.appearance.dark': 'Tối',
    'nav.appearance.system': 'Hệ thống',
    'nav.language': 'Ngôn ngữ',

    // AI Assistant
    'ai.assistant_title': 'Trợ Lý Ảo FundHive',
    'ai.online': 'Trực tuyến',
    'ai.greeting':
      'Xin chào! Tôi là Trợ lý Ảo FundHive.\n\nTôi ở đây để hỗ trợ giải đáp mọi thắc mắc của bạn về quy tắc đóng góp USDT, cơ chế tự động hoàn tiền (Refund) khi dự án gọi vốn không thành công, và quy trình giải ngân an toàn theo cột mốc (Milestone) trên nền tảng.\n\nHôm nay bạn cần tôi hỗ trợ thông tin gì?',
    'ai.clear_confirm':
      'Bạn có chắc chắn muốn làm mới toàn bộ lịch sử cuộc trò chuyện này không?',
    'ai.clear_success':
      'Lịch sử trò chuyện đã được làm mới thành công. Tôi sẵn sàng hỗ trợ các câu hỏi tiếp theo của bạn!',
    'ai.placeholder': 'Nhập câu hỏi của bạn...',
    'ai.thinking': 'Trợ lý đang tìm câu trả lời...',
    'ai.footnote': 'Hệ thống hỗ trợ thông tin trực tuyến FundHive 24/7',
    'ai.faq_usdt_label': '⚡ Nhận mUSDT thử nghiệm',
    'ai.faq_usdt_q': 'Đồng mUSDT là gì? Cách nhận mUSDT thử nghiệm để đầu tư?',
    'ai.faq_refund_label': '🛡️ Luật hoàn tiền tự động',
    'ai.faq_refund_q':
      'Nếu dự án gọi vốn không thành công, tôi có được hoàn lại tiền đầu tư không?',
    'ai.faq_milestone_label': '📦 Nghiệm thu cột mốc',
    'ai.faq_milestone_q':
      'Cơ chế giải ngân theo cột mốc bảo vệ số tiền đóng góp của tôi như thế nào?',
    'ai.faq_about_label': '🌐 FundHive là gì?',
    'ai.faq_about_q': 'FundHive là gì và hoạt động như thế nào?',
    'ai.toast_empty': '⚠️ Vui lòng nhập nội dung câu hỏi.',
    'ai.raised': 'Đã huy động:',
    'ai.view': 'Xem chi tiết',
    'ai.project_error': '[Lỗi tải thông tin dự án]',
    'ai.toast_wallet_copied': 'Đã sao chép địa chỉ ví Web3!',
    'ai.wallet_tooltip': 'Nhấp để sao chép địa chỉ ví Web3',
    'ai.tx_tooltip': 'Kiểm tra biên lai giao dịch trên Sepolia Etherscan',
    'ai.member': 'Thành viên dự án',
    'ai.guest': 'Khách vãng lai',
    'ai.clear_tooltip': 'Làm mới lịch sử chat',
    'ai.suggested_questions': 'Có thể bạn muốn hỏi:',
    'ai.tooltip': 'Trợ lý ảo AI hỗ trợ 24/7',
    'ai.error_connect':
      '⚠️ Không thể kết nối với máy chủ AI. Vui lòng kiểm tra lại đường truyền mạng hoặc thử lại sau.',

    // How It Works / Quy trình
    'nav.how_it_works': 'Quy trình hoạt động',
    'how.title': 'Cách thức hoạt động & Quy định chung',
    'how.subtitle':
      'Hướng dẫn chi tiết từng bước giúp nhà sáng lập gọi vốn thành công và người ủng hộ đóng góp vốn an tâm, minh bạch qua 4 bước đơn giản.',
    'how.step.1': '01. Tạo dự án & Chia giai đoạn',
    'how.step.2': '02. Mở chiến dịch gọi vốn',
    'how.step.3': '03. Triển khai & Duyệt kết quả',
    'how.step.4': '04. Nhận giải ngân & Hoàn tiền',

    // Step 1 Details
    'how.phase1.title': 'Bước 1: Tạo dự án và gửi bản thảo',
    'how.phase1.subtitle':
      'Nhà sáng lập thiết lập hồ sơ dự án chi tiết và cấu hình chiến dịch gọi vốn trực tiếp trên hệ thống.',
    'how.phase1.step1.title': '1. Cung cấp thông tin cơ bản',
    'how.phase1.step1.desc':
      'Đặt tên dự án, viết mô tả giới thiệu ý tưởng, tải lên hình ảnh và video minh họa. Xác định tổng số vốn cần gọi và thời gian mở cổng gọi vốn.',
    'how.phase1.step2.title': '2. Thiết lập các giai đoạn lộ trình',
    'how.phase1.step2.desc':
      'Chia nhỏ lộ trình phát triển thành các giai đoạn cụ thể. Với mỗi giai đoạn, cần xác định rõ số ngày thực hiện, sản phẩm bàn giao thực tế và số tiền phân bổ. Tổng số tiền của tất cả các giai đoạn phải bằng đúng mục tiêu gọi vốn ban đầu.',
    'how.phase1.step3.title': '3. Giới thiệu đội ngũ phát triển',
    'how.phase1.step3.desc':
      'Cập nhật thông tin các thành viên tham gia để tăng tính minh bạch và uy tín cho dự án.',
    'how.phase1.step4.title': '4. Tài liệu đính kèm',
    'how.phase1.step4.desc':
      'Tải lên các tài liệu bổ sung như bản kế hoạch chi tiết hoặc hồ sơ năng lực để người ủng hộ tham khảo.',
    'how.phase1.step5.title': '5. Phê duyệt và phát hành dự án',
    'how.phase1.step5.desc':
      'Hệ thống sẽ kiểm duyệt nội dung dự án để tránh thông tin rác. Sau khi được duyệt, nhà sáng lập có thể phát hành dự án lên blockchain để bắt đầu chiến dịch.',

    'how.badge.guide': 'Hướng dẫn vận hành',
    'how.phase1.rule_header': 'Quy định bắt buộc',
    'how.phase1.rule1.title':
      'Tổng phân bổ giai đoạn phải khớp mục tiêu gọi vốn',
    'how.phase1.rule1.desc':
      'Tổng ngân sách chia cho các giai đoạn bắt buộc phải bằng chính xác 100% mục tiêu gọi vốn của dự án để đảm bảo dự án có đủ kinh phí hoàn thiện sản phẩm.',
    'how.phase1.rule2.title': 'Kiểm duyệt hồ sơ nghiêm túc',
    'how.phase1.rule2.desc':
      'Hệ thống đánh giá hồ sơ để loại bỏ dự án rác hoặc thông tin không rõ ràng. Chỉ dự án được duyệt mới được phép phát hành để gọi vốn.',
    'how.phase1.rule3.title': 'Hỗ trợ Chế độ thử nghiệm',
    'how.phase1.rule3.desc':
      'Nhà sáng lập có thể chọn Chế độ thử nghiệm để rút ngắn thời gian gọi vốn và thực hiện xuống còn 5 phút, giúp dễ dàng chạy thử nghiệm toàn bộ luồng hoạt động.',

    // Step 2 Details
    'how.phase2.title': 'Bước 2: Mở chiến dịch gọi vốn an toàn',
    'how.phase2.subtitle':
      'Nguồn vốn tài trợ được bảo vệ an toàn bằng công nghệ hợp đồng thông minh trên blockchain.',
    'how.phase2.desc':
      'Khi chiến dịch bắt đầu, người ủng hộ có thể đóng góp vốn vào dự án. Toàn bộ số tiền tài trợ sẽ được tự động khóa trong két thông minh trên blockchain. Cả nhà sáng lập lẫn quản trị viên đều không thể tự ý rút tiền trước thời hạn, bảo vệ tài sản tuyệt đối cho người ủng hộ.',
    'how.phase2.rule1.title': 'Nguyên tắc bảo vệ vốn tối đa',
    'how.phase2.rule1.desc':
      'Dự án bắt buộc phải đạt 100% mục tiêu gọi vốn mới được tính là thành công. Nếu không đạt mục tiêu khi kết thúc thời hạn, toàn bộ số tiền đã đóng góp sẽ được trả lại nguyên vẹn cho người ủng hộ.',
    'how.phase2.rule2.title': 'Thông tin tài chính công khai',
    'how.phase2.rule2.desc':
      'Mọi giao dịch đóng góp và số dư hiện tại trong két thông minh đều được lưu trữ vĩnh viễn trên sổ cái blockchain. Bất kỳ ai cũng có thể vào kiểm tra số liệu tài chính bất cứ lúc nào.',

    // Step 3 Details
    'how.phase3.title': 'Bước 3: Triển khai dự án và nghiệm thu kết quả',
    'how.phase3.subtitle':
      'Giải ngân vốn theo từng giai đoạn thực tế nhằm bảo vệ dòng tiền và giảm thiểu rủi ro cho người ủng hộ.',
    'how.phase3.desc':
      'Thay vì nhận toàn bộ số tiền gọi vốn một lần, nhà sáng lập chỉ được nhận ngân sách của từng giai đoạn sau khi đã hoàn thành và chứng minh được kết quả bàn giao thực tế.',
    'how.phase3.step1.title': '1. Nộp báo cáo và sản phẩm bàn giao',
    'how.phase3.step1.desc':
      'Khi hoàn thành một giai đoạn, nhà sáng lập nộp báo cáo tiến độ chi tiết kèm theo bằng chứng cụ thể như video chạy thử sản phẩm, tài liệu kỹ thuật hoặc liên kết dùng thử.',
    'how.phase3.step2.title': '2. Nghiệm thu sản phẩm',
    'how.phase3.step2.desc':
      'Hệ thống sẽ tiến hành kiểm tra, đối chiếu kết quả. Nếu sản phẩm đạt chất lượng và đúng cam kết ban đầu, giai đoạn đó mới được duyệt nghiệm thu.',
    'how.phase3.step3.title': '3. Kích hoạt giai đoạn tiếp theo',
    'how.phase3.step3.desc':
      'Sau khi giai đoạn cũ được giải ngân thành công, thời gian thực hiện của giai đoạn tiếp theo mới bắt đầu tính, giúp tiến độ công việc luôn rõ ràng.',
    'how.phase3.safety_header': 'Tại sao cơ chế này bảo vệ người ủng hộ?',
    'how.phase3.safety.1':
      'Người ủng hộ không sợ bị nhà sáng lập nhận tiền xong dừng dự án hoặc biến mất.',
    'how.phase3.safety.2':
      'Kinh phí giải ngân được kiểm soát chặt chẽ dựa trên kết quả nghiệm thu thực tế.',
    'how.phase3.safety.3':
      'Lộ trình rõ ràng buộc đội ngũ phát triển phải làm việc nghiêm túc.',

    // Step 4 Details
    'how.phase4.title': 'Bước 4: Giải ngân vốn hoặc Hoàn tiền tự động',
    'how.phase4.subtitle':
      'Hệ thống phân phối dòng tiền thông minh: Giải ngân cho nhà sáng lập khi đạt giai đoạn; Hoàn tiền cho người ủng hộ nếu dự án dừng.',
    'how.phase4.withdraw.title': 'Giải ngân vốn cho nhà sáng lập',
    'how.phase4.withdraw.desc':
      'Khi giai đoạn được duyệt nghiệm thu, nhà sáng lập thực hiện rút phần ngân sách tương ứng đã khóa cho giai đoạn đó về ví của mình.',
    'how.phase4.refund.title': 'Hoàn trả tự động cho người ủng hộ',
    'how.phase4.refund.desc':
      'Trong các trường hợp dự án không thể tiếp tục hoặc vi phạm cam kết, người ủng hộ sẽ nhận lại tiền đóng góp của mình.',
    'how.phase4.creator_badge': 'Dành cho nhà sáng lập',
    'how.phase4.withdraw.step1.title':
      'Bước 1: Được duyệt nghiệm thu thành công',
    'how.phase4.withdraw.step1.desc':
      'Sau khi nhà sáng lập nộp bằng chứng sản phẩm, hệ thống đối chiếu và phê duyệt giai đoạn sang trạng thái nghiệm thu thành công.',
    'how.phase4.withdraw.step2.title': 'Bước 2: Xác nhận giao dịch qua ví',
    'how.phase4.withdraw.step2.desc':
      'Nhà sáng lập bấm nút "Rút vốn cột mốc" trên trang quản lý, kết nối ví điện tử và xác nhận giao dịch rút tiền.',
    'how.phase4.withdraw.step3.title': 'Bước 3: Nhận kinh phí về ví',
    'how.phase4.withdraw.step3.desc':
      'Ngay sau khi giao dịch được xác nhận thành công trên blockchain, tiền của giai đoạn đó sẽ tự động chuyển thẳng về ví cá nhân của nhà sáng lập.',

    'how.phase4.backer_badge': 'Dành cho người ủng hộ',
    'how.phase4.refund.case1.title': 'Trường hợp 1: Gọi vốn không thành công',
    'how.phase4.refund.case1.desc':
      'Nếu hết thời gian gọi vốn mà dự án không đạt đủ 100% mục tiêu ban đầu, chiến dịch sẽ tự động đóng. Người ủng hộ chỉ cần bấm nút "Nhận lại tiền hoàn trả" trên trang dự án để nhận lại 100% số vốn đã đóng góp về ví của mình hoàn toàn miễn phí.',
    'how.phase4.refund.case2.title':
      'Trường hợp 2: Dự án bị dừng do vi phạm tiến độ hoặc sản phẩm không đạt yêu cầu',
    'how.phase4.refund.case2.desc':
      'Trong quá trình triển khai, nếu dự án không thể hoàn thành sản phẩm bàn giao hoặc bị từ chối nghiệm thu vĩnh viễn, dự án sẽ bị chấm dứt hoạt động. Khi đó, toàn bộ số vốn chưa giải ngân còn lại trong két thông minh sẽ được tự động hoàn trả lại cho người ủng hộ theo tỷ lệ đóng góp ban đầu. Số tiền của các giai đoạn đã hoàn thành trước đó sẽ không bị ảnh hưởng.',

    'how.phase4.warning':
      'Thông tin bảo mật: Két sắt hợp đồng thông minh hoạt động tự động bằng mã nguồn trên blockchain. Tài sản của người ủng hộ chỉ được giải ngân khi sản phẩm được nghiệm thu minh bạch. Không ai có quyền can thiệp trái phép vào nguồn tài sản này.',

    'how.cta.title': 'Sẵn sàng đồng hành khởi chạy ý tưởng?',
    'how.cta.desc':
      'Dù bạn là một nhà sáng lập đầy nhiệt huyết hay một nhà ủng hộ muốn tìm kiếm những giải pháp công nghệ thực tế, FundHive luôn đem lại điểm tựa an tâm nhất cho bạn.',
    'how.cta.btn_new': 'Tạo dự án mới ngay',
    ...errorsVi
  },
  en: {
    // Card Translations
    'card.funding': 'FUNDING',
    'card.active': 'ACTIVE',
    'card.completed': 'COMPLETED',
    'card.pending': 'PENDING',
    'card.backers_one': '{{count}} backer',
    'card.backers_other': '{{count}} backers',
    'card.sys_progress': 'SYS.PROGRESS',
    'card.sys_roadmap': 'SYS.ROADMAP',
    'card.raised': 'raised',
    'card.goal': 'Goal',
    'card.done': 'DONE',
    'card.updated': 'UPDATED',
    'card.days_left': 'DAYS LEFT',
    'card.milestones': 'MILESTONES',
    'card.init_support': 'Initialize Support',
    'card.view_protocol': 'View Protocol',

    // Navigation / Header
    'nav.home': 'Home',
    'tab.story': 'Story',
    'tab.milestone': 'Milestone',
    'tab.updates': 'Updates',
    'tab.review': 'Review',
    'tab.attachments': 'Attachments',
    'tab.teams': 'Teams',
    'detail.ready_to_launch': 'Ready to Launch',
    'detail.approved_desc':
      'Your project has been approved! It is time to launch it on the blockchain.',
    'detail.publish_btn': 'Publish to Blockchain',
    'detail.funding_progress': 'Funding Progress',
    'detail.raised': 'raised',
    'detail.goal': 'Goal',
    'detail.fund_btn': 'Fund This Project',
    'detail.project_status': 'Project Status',
    'detail.active_status_desc':
      'This project has reached its funding goal and is currently executing milestones.',
    'detail.project_completed': 'Project Completed',
    'detail.success_status_desc':
      'This project has successfully completed all its milestones and all funds have been disbursed!',
    'detail.roadmap_milestones': 'Roadmap & Milestones',
    'detail.withdraw': 'Withdraw',
    'detail.pending': 'Pending...',
    'detail.advantages': 'Advantages',
    'detail.challenges': 'Challenges',
    'detail.expected_outcome': 'Expected Outcome',
    'detail.official_update_report': 'Official Update Report',
    'detail.completed': 'Completed',
    'detail.blockers': 'Blockers / Delays',
    'detail.watch_demo': 'Watch Demo',
    'detail.external_link': 'External Link',
    'detail.withdrawn': 'Withdrawn',
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
    'common.locale': 'en-US',
    'common.view_file': 'View File',

    // Milestones
    'milestones.title': 'Define Project Milestones',
    'milestones.desc':
      'Break your project into manageable phases for transparency and accountability.',
    'milestones.totalBudget': 'Total Budget',
    'milestones.remainingBudget': 'Remaining: {{remaining}} USDT',
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
    'milestones.budget': 'Budget Allocation (USDT)',
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
    'team.no_description': 'No description provided.',
    'team.no_members': 'No team members assigned',
    'team.empty_hint': 'Team members are added when the project is created.',

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
    'attachments.no_attachments_found': 'No Attachments Found',
    'attachments.no_attachments_desc':
      "This project hasn't uploaded any additional documents or files.",
    'attachments.project_documents': 'Project Documents',
    'attachments.files_count': '({{count}} files)',
    'media.no_media': 'No media available',
    'media.images': 'Images',
    'media.video': 'Video',
    'investors.title': 'Investors',
    'investors.empty': 'No investors yet. Be the first!',
    'investors.top': 'Top',
    'investors.recent': 'Recent',
    'investors.anonymous': 'Anonymous',
    'updates.submitted_late': 'Submitted late',
    'updates.progress_title': 'Progress',
    'updates.blockers_title': 'Blockers',
    'updates.view_update': 'View update',
    'updates.hide': 'Hide',
    'updates.close': 'Close',
    'updates.edit_update': 'Edit Update',
    'updates.update': 'Update',
    'updates.late_tag': '(Late)',
    'updates.complete_prev_first': 'Complete previous milestone first',
    'updates.starts_on': 'Starts {{date}}',
    'updates.no_milestones': 'No milestones defined',
    'updates.no_milestones_desc':
      'Milestones are set when the project is created.',
    'updates.title': 'Progress Updates',
    'updates.phases_count': '{{count}} phase',
    'updates.phases_count_plural': '{{count}} phases',
    'updates.only_owner_can_submit':
      'Only the project owner can submit progress updates.',
    'updates.starts_in': 'starts in {{days}}d',
    'updates.ends_today': 'ends today',
    'updates.days_left': '{{days}}d left',
    'updates.days_overdue': '{{days}}d overdue',
    'updates.status.done': 'DONE',
    'updates.status.progress': 'PROGRESS',
    'updates.status.late': 'LATE',
    'updates.status.closed': 'CLOSED',
    'updates.status.locked': 'LOCKED',
    'reviews.comments_count': '{{count}} Comment',
    'reviews.comments_count_plural': '{{count}} Comments',
    'reviews.title': 'Reviews & Discussions',
    'reviews.write_placeholder': 'Write a comment...',
    'reviews.connect_wallet_warning':
      'Please connect your wallet to comment on this project.',
    'reviews.empty': 'No comments yet — be the first to share your thoughts!',
    'reviews.send_error': 'Failed to submit comment.',
    'reviews.show_less': 'Show less',
    'reviews.see_more': 'See more',
    'reviews.reply_error': 'Failed to submit reply.',
    'reviews.edit_error': 'Failed to edit comment.',
    'reviews.delete_confirm':
      'Delete this comment? Replies will also be removed.',
    'reviews.delete_success': 'Comment deleted successfully!',
    'reviews.delete_error': 'Failed to delete comment.',
    'reviews.owner_badge': 'Owner',
    'reviews.team_badge': 'Team',
    'reviews.edit': 'Edit',
    'reviews.delete': 'Delete',
    'reviews.cancel': 'Cancel',
    'reviews.save': 'Save',
    'reviews.reply': 'Reply',
    'reviews.reply_placeholder': 'Reply to {{name}}...',
    'reviews.view_more_reply': 'View 1 more reply',
    'reviews.view_more_replies': 'View {{count}} more replies',
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
      'Total milestone budget ({{total}} USDT) must exactly equal your funding goal ({{goal}} USDT).',
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
      'This milestone exceeds the remaining budget of {{remaining}} USDT.',
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
    'toast.like_success': 'Liked project successfully!',
    'toast.unlike_success': 'Unliked project successfully!',
    'toast.like_error': 'Failed to like project.',
    'toast.unlike_error': 'Failed to unlike project.',
    'toast.like_wallet_required':
      'Please connect your wallet to like this project.',

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
    'toast.email_invalid': 'Invalid email address.',
    'Invalid email': 'Invalid email address.',
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
    'toast.tx_rejected': 'Transaction signature request rejected.',
    'toast.invalid_amount': 'Please enter a valid amount',
    'toast.amount_exceeds_remaining':
      'You can only invest up to {{remaining}} USDT (remaining project funding goal)',
    'toast.insufficient_balance': 'Insufficient balance',
    'toast.waiting_approve_tx': 'Waiting for approval transaction...',
    'toast.confirming_investment_chain': 'Confirming investment on chain...',
    'toast.invest_error': 'An error occurred during investment',
    'toast.invest_success': 'Investment successful!',
    'toast.amount_exceeds_remaining_usdt':
      'You can only invest up to {{remaining}} USDT (remaining project funding goal)',
    'invest.title': 'BACK THIS PROJECT',
    'invest.available_balance': 'Available Balance',
    'invest.amount_placeholder': 'Enter USDT amount',
    'invest.optional_message': 'Encouragement message (Optional)',
    'invest.message_placeholder':
      'Do you want to send any message to the Founder?',
    'invest.confirm_btn': 'CONFIRM INVESTMENT',
    'invest.processing_btn': 'PROCESSING...',
    'publish.title': 'Publish to Blockchain',
    'publish.description':
      'Your project has been approved by the Admin. You now need to deploy the Smart Contract for this project on chain (Requires gas fee on Sepolia network).',
    'publish.funding_goal': 'Funding Goal:',
    'publish.milestones_count': 'Milestones:',
    'publish.demo_mode': 'Demo Mode',
    'publish.demo_on': 'ON — Funding 5m, withdraw immediately',
    'publish.demo_off': 'OFF — Use Real Launch Date',
    'publish.confirm_btn': 'Confirm & Launch',
    'updates.form.success': 'Update submitted successfully',
    'updates.form.late_warning':
      'This update is past the milestone deadline. It will be marked as late.',
    'updates.form.completed_label': 'What was completed',
    'updates.form.completed_placeholder':
      'Describe what has been delivered in this phase...',
    'updates.form.blockers_label': 'Blockers / Delays',
    'updates.form.blockers_placeholder': 'Any issues or delays to report...',
    'updates.form.images_label': 'Progress Images',
    'updates.form.images_helper': 'optional · max 4',
    'updates.form.uploading_images': 'Uploading images...',
    'updates.form.upload_failed': 'Upload failed',
    'updates.form.upload_failed_desc': 'Failed to upload some images.',
    'updates.form.try_again': 'Please try again.',
    'updates.form.video_label': 'Demo Video',
    'updates.form.video_selected': 'Video selected',
    'updates.form.video_upload_label': 'Upload demo video',
    'updates.form.video_uploading': 'Uploading, please wait...',
    'updates.form.video_click_replace': 'Click to replace',
    'updates.form.video_constraints': 'MP4, WEBM or MOV · Max 100MB',
    'updates.form.change': 'Change',
    'updates.form.upload': 'Upload',
    'updates.form.link_label': 'External Link',
    'updates.form.submit_failed': 'Failed to submit update. Please try again.',
    'updates.form.submitting': 'Submitting...',
    'updates.form.submit_btn': 'Submit Update',
    'withdraw.title': 'WITHDRAW MILESTONE FUNDS',
    'withdraw.milestone_label': 'Milestone',
    'withdraw.amount_label': 'Amount',
    'withdraw.release_passed': 'Release time passed ({{date}})',
    'withdraw.release_pending': 'Release time not reached: {{date}}',
    'withdraw.note': 'Note: ',
    'withdraw.warning_prefix':
      'This transaction cannot be undone. The smart contract will transfer ',
    'withdraw.warning_suffix':
      ' to your wallet. The system will need ~10 seconds to confirm.',
    'withdraw.admin_approved': 'Milestone approved by Admin',
    'toast.sending_tx_blockchain': 'Sending transaction to Blockchain...',
    'toast.withdraw_success':
      'Withdraw request recorded! The system will verify in a few seconds.',
    'toast.error_occurred': 'An error occurred',
    'withdraw.not_ready_btn': 'WITHDRAWAL NOT READY',
    'withdraw.confirm_btn': 'CONFIRM WITHDRAWAL',

    // Overview
    'overview.projectOverview': 'Project overview',
    'content.core_vision': 'Core Vision',
    'content.no_vision': 'No project vision provided.',
    'content.comprehensive_details': 'Comprehensive Details',
    'content.data_log': 'Data Log',
    'content.start': 'Start',
    'content.end': 'End',
    'content.location': 'Location',
    'content.global_operations': 'Global Operations',
    'content.category': 'Category',
    'content.uncategorized': 'Uncategorized',
    'content.risks_challenges': 'Risks & Challenges',
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
    'stats.goal_reached_pct': '{{percent}}% of minimum goal reached',
    'stats.days_left': 'Days Left',
    'stats.likes': 'Likes',
    'stats.total_likes': '{{count}} Total Likes',
    'stats.total_reviews': '{{count}} Total Reviews',

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
    'hero.badge': 'Non-Profit Web3 Crowdfunding Launchpad',
    'hero.titleMain': 'Support Trusted',
    'hero.titleHighlight': 'Non-profit Projects',
    'hero.titleEnd': 'With Full Escrow.',
    'hero.subtitle':
      'A secure on-chain donation platform protecting your philanthropic contributions. Pledged funds are locked and released sequentially as real deliverables are verified.',
    'hero.btn.launch': 'Launch Your Idea',
    'hero.btn.explore': 'Explore Projects',
    'hero.stats.poolValue': '100%',
    'hero.stats.poolLabel': 'Project Success Rate',
    'hero.stats.title': '100% Non-profit',
    'hero.stats.tag': 'Direct Support',

    // Landing / Featured Pools
    'landing.featured_pools': 'Featured Pools',
    'landing.featured_pools_desc':
      'Vetted decentralized projects ready for capital injection or successfully built. Governed by smart contracts, transparent to the world.',
    'landing.view_all_pools': 'View All Pools',
    'landing.no_active_projects': 'No active projects found.',

    // Landing / Stats
    'landing.stats.title': 'Protocol Statistics',
    'landing.stats.desc':
      'Track the growth and operational status of projects within our decentralized ecosystem.',
    'landing.stats.total': 'Total Projects',
    'landing.stats.total_desc': 'Created tech ideas and pools',
    'landing.stats.fundraising': 'Funding',
    'landing.stats.fundraising_desc': 'Actively accepting community backing',
    'landing.stats.active': 'Active',
    'landing.stats.active_desc': 'Developing core product milestones',
    'landing.stats.success': 'Successful',
    'landing.stats.success_desc': 'Completed and delivered milestones',
    'landing.stats.chart_label': 'Number of Projects',

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
