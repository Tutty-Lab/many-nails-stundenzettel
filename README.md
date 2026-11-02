# Many Nails

App lịch làm việc và Stundenzettel. Source nền Kichi, cấu hình riêng Many Nails.
Wormser Straße 23, 67227 Frankenthal.

- Giờ làm: T2–T7 09:30–19:30; Chủ nhật đóng cửa. Ngày lễ Rheinland-Pfalz đóng cửa.
- T2–T4 vắng hơn; T5–T7 đông hơn đông hơn. Từ 14:00 đông; buổi sáng vẫn có khách.
- Ngày 01–10 và 23–cuối tháng đông hơn.
- Ít nhất 2 nhân viên, không tính chủ. Ít nhất 1 nhân viên đến 19:30; tối thứ Sáu ít nhất 2.
- Chủ thường có mặt; khi nghỉ, tắt hỗ trợ chủ trong tab nhân viên.

Bảng lương không ghi giờ hợp đồng. App quy đổi tạm tính theo Brutto ÷ 13,90 €/h: 603 € ≈ 43,38 h; 1.700 € ≈ 122,30 h; 1.200 € ≈ 86,33 h; 1.200 € ≈ 86,33 h; 1.500 € ≈ 107,91 h/tháng. Các số giờ này là ước tính, cần xác nhận lại với chủ trước khi dùng chính thức.
Repo public chứa mức Brutto với nhãn nhân viên ẩn danh để quy đổi giờ; không chứa tên nhân viên thật, PDF, số thuế/BHXH hoặc địa chỉ cá nhân. Bảng tổng hợp lương giữ local trong private/payroll.json (Git bỏ qua), không được bundle. Nhập thông tin nhân viên bằng tab Nhân viên.

Hệ số nhu cầu chỉ là trọng số tương đối: T2–T4 0.8; T5 1.2; T6 1.4; T7 1.5; CN 1. Ngày đông trong tháng nhân 1.25. Đây là tham số lập lịch, chưa phải tỷ lệ Umsatz đã xác nhận. Mục tiêu giờ vẫn chuẩn hóa theo tuần. Ngày nghỉ thêm dịp Tết cần nhập ngày cụ thể trong Cài đặt.

```sh
npm ci
npm run dev
npm run build
npm test
```

Mật khẩu mặc định 1991 chỉ khóa giao diện trên trình duyệt; không phải xác thực server. Đồng bộ Supabase cần backend riêng; không tái sử dụng cấu hình store cũ.

Ưu tiên bắt buộc: tối thứ Sáu 17:00–19:30 có ít nhất 2 nhân viên; mỗi ngày mở cửa có ít nhất 1 nhân viên 19:00–19:30. Chủ không được tính. Luật 2 nhân viên cả ngày vẫn được kiểm tra; ngân sách hiện tại chưa đủ để phủ mọi khung. Tạo lại lịch để áp dụng luật mới.
