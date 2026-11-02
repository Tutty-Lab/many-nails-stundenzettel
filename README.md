# Many Nails

App lịch làm việc và Stundenzettel. Source nền Kichi, cấu hình riêng Many Nails.
Wormser Straße 23, 67227 Frankenthal.

- Giờ làm: T2–Chủ nhật 09:30–19:30. Ngày lễ Rheinland-Pfalz đóng cửa.
- T2–T4 vắng hơn; T5–T7 đông hơn. Từ 14:00 đông; buổi sáng vẫn có khách.
- Ngày 01–10 và 23–cuối tháng đông hơn.
- Ít nhất 2 nhân viên, không tính chủ. Ít nhất 1 nhân viên đến 19:30; tối thứ Sáu ít nhất 2.
- Chủ thường có mặt; khi nghỉ, tắt hỗ trợ chủ trong tab nhân viên.

Giờ hợp đồng chưa được cung cấp. 5 nhân viên mẫu có giờ mục tiêu 0, cần nhập giờ/hợp đồng trước khi tạo lịch thực tế. Không suy ra Vollzeit hoặc số giờ từ Brutto.
Repo public không chứa tên nhân viên thật, lương, PDF, số thuế/BHXH hoặc địa chỉ cá nhân. Bảng tổng hợp lương giữ local trong private/payroll.json (Git bỏ qua), không được bundle. Nhập thông tin nhân viên bằng tab Nhân viên.

Hệ số nhu cầu chỉ là trọng số tương đối: T2–T4 0.8; T5 1.2; T6 1.4; T7 1.5; CN 1. Ngày đông trong tháng nhân 1.25. Đây là tham số lập lịch, chưa phải tỷ lệ Umsatz đã xác nhận. Mục tiêu giờ vẫn chuẩn hóa theo tuần. Ngày nghỉ thêm dịp Tết cần nhập ngày cụ thể trong Cài đặt.

```sh
npm ci
npm run dev
npm run build
npm test
```

Mật khẩu mặc định 1991 chỉ khóa giao diện trên trình duyệt; không phải xác thực server. Đồng bộ Supabase cần backend riêng; không tái sử dụng cấu hình store cũ.
