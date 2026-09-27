# Danh mục ảnh — Web "Điều tra viên số" (Bài 9, Tin học 10)

File này liệt kê **toàn bộ ảnh** đang dùng trong trang web: ảnh gì, nằm ở đâu,
kích thước gốc, và ảnh nào là ảnh minh họa tạm (AI/icon) nên thay bằng ảnh thật.

> **Cách thay ảnh:** đặt file mới **cùng tên** vào đúng thư mục trong `assets/`.
> Đuôi ảnh nào cũng được (svg, png, jpg, jpeg, webp, gif) — trang tự dò.
> ⚠️ Nếu đổi sang đuôi khác (ví dụ `.svg` → `.jpg`) thì **phải xoá file cũ**,
> vì trang ưu tiên đuôi tìm thấy trước theo thứ tự svg → png → jpg → jpeg → webp → gif.
> Nếu muốn đổi cả *tên file*, phải sửa thêm đường dẫn trong `js/data.js`
> (mục `visual`) hoặc `js/visuals.js` — báo lại để mình sửa cùng.

---

## 🟠 NHÓM 1 — Ảnh minh họa lớn (nên thay bằng ảnh thật/ảnh chụp)

Đây là ảnh AI tạo tạm, khổ lớn (1536×1024px, ~2MB/ảnh). Khuyến nghị: thay bằng
ảnh chụp học sinh thật (đã xin phép/ẩn danh khuôn mặt nếu cần), ảnh minh họa
bạn tự thiết kế, hoặc ảnh từ kho miễn phí có giấy phép rõ ràng (Pexels, Unsplash…).
Giữ tỉ lệ ngang khoảng **3:2** để không bị méo khi hiển thị.

| # | File cần thay | Kích thước gốc | Hiển thị ở đâu | Ý tưởng nội dung ảnh |
|---|---|---|---|---|
| 1 | `assets/illustrations/digital-detectives.png` | 1536×1024 | Slide 0 – Mở đầu (ảnh hero, đầu trang) | 2–3 học sinh cùng quan sát máy tính/điện thoại, vẻ tò mò, đang "điều tra" một tin nhắn/trang web |
| 2 | `assets/illustrations/an-recruitment.png` | 1536×1024 | Slide HĐ2 (2.2), cạnh khung tin nhắn giả | Một học sinh ngồi bàn học, cầm điện thoại, biểu cảm suy nghĩ/nghi ngờ khi đọc tin tuyển dụng |
| 3 | `assets/illustrations/team-website.png` | 1536×1024 | Slide HĐ4 (3.1), trước phần tình huống nhóm | Một nhóm 4–5 học sinh cùng làm việc quanh máy tính, đang thiết kế website |
| 4 | `assets/hero.png` *(= ảnh gốc "10A5_an toan thong tin.png")* | 1491×1055 | **Chưa hiển thị** — chỉ có trong ví dụ tắt (comment) ở `js/decor-static.js`, dùng cho chế độ trang trí kéo–thả 🖼️ | Ảnh chủ đề chung, dùng khi bạn tự kéo-thả trang trí |

---

## 🟡 NHÓM 2 — Icon nghề nghiệp (SVG nhỏ, nguồn OpenMoji)

Icon cảm xúc/nghề nghiệp dạng emoji-style, dùng làm ảnh đại diện 6 thẻ nghề ở
slide Mở đầu (phần B). Có thể giữ nguyên (giấy phép mở, không cần đổi), hoặc
thay bằng icon/ảnh khác nếu muốn phong cách khác — miễn giữ **hình vuông**,
nền trong (transparent PNG hoặc SVG).

| File | Nghề đại diện | Đang dùng? |
|---|---|---|
| `assets/roles/attt.svg` | Chuyên viên An toàn thông tin | ✅ Có dùng |
| `assets/roles/coder.svg` | Lập trình viên | ✅ Có dùng |
| `assets/roles/creator.svg` | Nhà sáng tạo nội dung số | ✅ Có dùng |
| `assets/roles/hr.svg` | Chuyên viên Tuyển dụng (HR) | ✅ Có dùng |
| `assets/roles/phapche.svg` | Chuyên viên Pháp chế | ✅ Có dùng |
| `assets/roles/truyenthong.svg` | Chuyên viên Truyền thông | ✅ Có dùng |
| `assets/roles/pause.svg` | Icon đồng hồ (màn hình bắt đầu HĐ5) | ✅ Có dùng |
| `assets/roles/password.svg` | Icon quy tắc "mật khẩu/OTP" | ✅ Dùng ở HĐ6 (5 KHÔNG và 5 NÊN) |
| `assets/roles/permission.svg` | Icon quy tắc "xin phép, ghi nguồn" | ✅ Dùng ở HĐ6 (5 NÊN) |
| `assets/roles/support.svg` | Icon quy tắc "báo bố mẹ, thầy cô" | ✅ Dùng ở HĐ6 (5 NÊN) |
| `assets/roles/verify.svg` | Icon quy tắc "xác minh thông tin" | ✅ Dùng ở HĐ6 (5 NÊN) |

---

## 🟢 NHÓM 3 — Ảnh minh họa tình huống (SVG, nguồn OpenMoji)

Ảnh nhỏ đi kèm mỗi tình huống ở HĐ1, HĐ3 và HĐ5 (bấm vào để phóng to).
Nội dung mô phỏng (tin nhắn, màn hình web, ảnh...) — **giữ nguyên được**, hoặc
thay bằng ảnh chụp màn hình thật/ảnh vẽ tay nếu muốn sinh động hơn. Nên giữ
tỉ lệ ngang **~16:9** (khớp khung hiển thị 720×410).

**Dùng ở HĐ1 — Nắm bắt tín hiệu nguy hiểm:**
| File | Tình huống minh họa |
|---|---|
| `assets/scenarios/free-gallery.jpg` | TH1 – Website cho tải ảnh miễn phí, không ghi giấy phép **(đã thay bằng ảnh của giáo viên)** |
| `assets/scenarios/teacher-transfer.svg` | TH2 – Tài khoản giả danh giáo viên yêu cầu chuyển tiền |
| `assets/scenarios/copy-article.svg` | TH3 – Chép nguyên bài viết vào sản phẩm nhóm |
| `assets/scenarios/recruiter-otp.svg` | TH4 – Nhà tuyển dụng đòi mã OTP |
| `assets/scenarios/photo-permission.svg` | TH5 – Bạn đồng ý cho dùng ảnh |
| `assets/scenarios/unread-license.svg` | TH6 – Lấy mã GitHub, chưa đọc giấy phép |

**Dùng ở HĐ3 — "Có được phép không?":**
| File | Sản phẩm minh họa |
|---|---|
| `assets/scenarios/unknown-photo.svg` | SP A – Ảnh trên Internet không rõ tác giả *(dùng lại ở HĐ5, câu 2)* |
| `assets/scenarios/licensed-photo.svg` | SP B – Ảnh có giấy phép CC BY 4.0 |
| `assets/scenarios/repost-article.svg` | SP C – Bài viết sao chép lên fanpage |
| `assets/scenarios/code-license.svg` | SP D – Mã nguồn GitHub chưa đọc giấy phép |
| `assets/scenarios/classmate-video.svg` | SP E – Video của bạn cùng lớp |

**Dùng ở HĐ5 — Thử thách 10 giây:**
| File | Câu minh họa |
|---|---|
| `assets/scenarios/job-deposit.svg` | Câu 1 – Yêu cầu chuyển 200.000đ để nhận việc |
| *(dùng lại `unknown-photo.svg`)* | Câu 2 – Ảnh chưa rõ tác giả |
| `assets/scenarios/friend-otp.svg` | Câu 3 – Bạn nhờ đăng nhập hộ bằng OTP |
| `assets/scenarios/credited-photo.svg` | Câu 4 – Ảnh có giấy phép, có ghi nguồn |
| `assets/scenarios/lookalike-teacher.svg` | Câu 5 – Tài khoản giống tên giáo viên |


---

## 📋 Tệp cấu hình liên quan (không phải ảnh, chỉ để bạn biết)
- `assets/roles-manifest.json`, `assets/scenarios-manifest.json` — danh sách
  ảnh do phiên làm việc trước tạo ra để theo dõi bộ icon; không bắt buộc phải
  cập nhật khi bạn tự thay ảnh, có thể bỏ qua.

---

## Nguồn & giấy phép
- **Ảnh minh họa lớn** (Nhóm 1): tạo bằng AI riêng cho bài học này, chỉ dùng nội bộ lớp học.
- **Icon & ảnh tình huống** (Nhóm 2, 3): [OpenMoji](https://openmoji.org/) —
  giấy phép [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), không sửa đổi màu/hình gốc.
- Khi thay bằng ảnh của riêng bạn: nếu dùng ảnh học sinh thật, cần có sự đồng ý
  của học sinh/phụ huynh trước khi đăng công khai lên GitHub Pages.
