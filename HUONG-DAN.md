# Hướng dẫn — Web "Điều tra viên số" (Bài 9, Tin học 10)

Trang web tương tác bám theo KHBD `KHBD_Tin10_Bai9_An_toan_khong_gian_mang.docx`:
8 slide tương ứng Mở đầu → HĐ1 → HĐ2 → HĐ3 → HĐ4 → HĐ5 → HĐ6 → Tổng kết,
tự chấm điểm theo thang 10 của phụ lục KHBD, nộp bài về Google Sheet.

Hỗ trợ **hai chế độ**: làm theo nhóm hoặc học sinh làm một mình (chọn ở đầu trang Mở đầu) —
chế độ cá nhân tự đổi cách gọi "nhóm em" thành "em" và chỉ yêu cầu 2/5 vai ở HĐ4.

```
10A5/
├── index.html                  ← trang chính
├── css/style.css
├── js/
│   ├── img-fallback.js         ← cho phép thay ảnh bằng mọi đuôi (svg/png/jpg…)
│   ├── visuals.js              ← chèn ảnh minh họa + xem ảnh phóng to
│   ├── data.js                 ← toàn bộ câu hỏi & đáp án (sửa nội dung ở đây)
│   ├── config.js               ← DÁN LINK APPS SCRIPT VÀO ĐÂY
│   ├── app.js                  ← logic bài học, chấm điểm, nộp bài
│   ├── decor-static.js         ← vị trí ảnh trang trí đã "chốt"
│   └── decor.js                ← cơ chế kéo–thả ảnh (như PowerPoint)
├── assets/
│   ├── decor/                  ← 6 ảnh trang trí đã chốt (hd1.png … hd6.png)
│   ├── illustrations/          ← ảnh minh họa lớn
│   └── scenarios/, roles/      ← ảnh tình huống, icon nghề
└── apps-script/Code.gs         ← code dán vào Google Apps Script
```

---

## PHẦN 1 — Nối vào Google Sheet (làm 1 lần, ~5 phút)

### Bước 1. Tạo Google Sheet
Vào [sheets.new](https://sheets.new), đặt tên file: **BaiLam_10A5_Bai9**.
Không cần tạo cột hay tab gì — script tự tạo tab `BaiLam` và dòng tiêu đề.

### Bước 2. Mở Apps Script và dán code
Trong Sheet: **Tiện ích mở rộng (Extensions) → Apps Script**.
Xoá hết code mẫu trong `Code.gs`, rồi **copy toàn bộ nội dung file
`apps-script/Code.gs` của project này dán vào**. Bấm 💾 (Ctrl+S).

> 👉 Đây chính là phần "copy vào Google Sheet" mà bạn cần: chỉ 1 file duy nhất `apps-script/Code.gs`.

### Bước 3. Deploy thành Web app
Bấm **Triển khai (Deploy) → Tuỳ chọn triển khai mới (New deployment)**:

| Mục | Chọn |
|---|---|
| Loại (Select type ⚙️) | **Ứng dụng web (Web app)** |
| Mô tả | v1 |
| Thực thi với tư cách (Execute as) | **Tôi (Me)** |
| Người có quyền truy cập (Who has access) | **Bất kỳ ai (Anyone)** ← bắt buộc |

→ **Triển khai** → **Cho phép quyền truy cập (Authorize access)** → chọn tài khoản Google
→ màn hình cảnh báo thì bấm **Nâng cao (Advanced) → Đi tới … (unsafe)** → **Cho phép (Allow)**.

Copy **URL ứng dụng web**, dạng:
```
https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxxx/exec
```

### Bước 4. Dán link vào web
Mở `js/config.js`, dán vào dòng `GAS_URL`:
```js
const CONFIG = {
  GAS_URL: "https://script.google.com/macros/s/AKfycb..../exec",
  ...
};
```

### Bước 5. Kiểm tra
- Mở link `/exec` trên trình duyệt → thấy `{"ok":true,...}` là script sống.
- Hoặc trong Apps Script chọn hàm `test_ThemDongGia` → **Chạy** → Sheet xuất hiện 1 dòng giả.
  Xoá dòng đó, hoặc chạy hàm `xoaToanBoBaiLam` để làm sạch trước khi dạy.
- Mở web, điền tên + nhóm, bấm **NỘP BÀI** → Sheet có thêm dòng mới.

> ⚠️ Mỗi lần sửa `Code.gs` đều phải **Deploy lại**: Triển khai → Quản lý triển khai →
> ✏️ → Phiên bản: **Mới** → Triển khai. (URL không đổi.)

---

## PHẦN 2 — Deploy lên GitHub Pages

```bash
cd "E:\Lưu tài liệu các môn\Thực tập\Tuần 3\10A5"
git init
git add .
git commit -m "Web bai 9 An toan tren khong gian mang - 10A5"
git branch -M main
git remote add origin https://github.com/<TEN-GITHUB>/attt-10a5.git
git push -u origin main
```

Trên GitHub: repo → **Settings → Pages** → Source: **Deploy from a branch**,
Branch: **main**, folder: **/ (root)** → Save. Sau ~1 phút truy cập:
```
https://<TEN-GITHUB>.github.io/attt-10a5/
```

Không cần build gì, đây là HTML tĩnh thuần. (File `.docx` trong thư mục cũng được đẩy lên
— nếu không muốn công khai KHBD thì xoá nó khỏi repo hoặc thêm vào `.gitignore`.)

---

## PHẦN 3 — Kéo thả ảnh trang trí (như PowerPoint)

Cơ chế đã sẵn sàng. Cách dùng:

1. Mở web, bấm nút **🖼️** góc phải thanh trên (hoặc **Ctrl + Alt + D**).
2. **Kéo ảnh từ Explorer thả thẳng vào trang**, hoặc bấm *➕ Thêm ảnh*.
   Ảnh sẽ được gắn vào **slide đang mở**.
3. Sắp xếp:
   | Thao tác | Kết quả |
   |---|---|
   | Click ảnh | chọn ảnh |
   | Kéo ảnh | di chuyển |
   | Kéo ô vuông góc dưới–phải | phóng to / thu nhỏ |
   | Kéo nút tròn vàng phía trên | xoay (giữ Shift: nhảy 15°) |
   | ← ↑ → ↓ | dịch 0,5% (giữ Shift: 2%) |
   | `+` / `-` | to / nhỏ 1% |
   | `[` / `]` | xuống dưới / lên trên lớp khác |
   | `f` | đưa ảnh **lên trên** nội dung chữ |
   | `0` | trả góc xoay về 0 |
   | Ctrl + D | nhân đôi ảnh |
   | Delete | xoá ảnh |
4. Xong thì bấm **💾 Xuất vị trí (JSON)** → JSON được copy vào clipboard và tải về `decor.json`.
5. Bấm **⬇ Lưu ảnh vào máy** → trình duyệt tải các ảnh vừa kéo vào, đã đặt sẵn tên
   theo slide (`hd1.png`, `hd2.png`…). Chuyển chúng vào `assets/decor/`.
6. Gửi `decor.json` cho Claude → mình chốt vị trí vào `js/decor-static.js`.
7. Bấm **↺ Dùng bản đã chốt** để xoá bản nháp trong trình duyệt và kiểm tra
   đúng bản sẽ deploy lên GitHub Pages.

Vị trí lưu theo **phần trăm kích thước slide**, nên ảnh không bị lệch khi đổi kích thước
màn hình. Khi tắt chế độ trang trí, ảnh không chặn chuột và nằm dưới nội dung
(trừ ảnh bật `front`).

> Lưu ý: khi kéo ảnh vào, ảnh được lưu tạm trong bộ nhớ trình duyệt (localStorage).
> Ảnh rất lớn (>3–4 MB) có thể không lưu được — nên nén ảnh trước, và luôn bấm
> **Xuất vị trí (JSON)** để giữ kết quả.

---

## PHẦN 4 — Những thứ giáo viên có thể sửa nhanh

| Muốn sửa | Mở file | Chỗ nào |
|---|---|---|
| Câu hỏi, đáp án, lời giải | `js/data.js` | `hd1`, `hd2`, `hd3`, `hd4`, `hd5`, `hd6` |
| Tên trường, lớp, khẩu hiệu | `js/data.js` | `meta` |
| 6 thẻ nghề nghiệp | `js/data.js` | `ngheNghiep` |
| Số giây của Thử thách 10 giây | `js/data.js` | `hd5.giay` |
| Nhiệm vụ "Cam kết 3 ngày an toàn số" | `js/data.js` | `hd6.raSoat`, `hd6.lanToa` |
| Câu "ống kính" của từng nghề | `js/data.js` | `ngheNghiep[].ongKinh` |
| Khối "Việc cần làm" của mỗi hoạt động | `js/data.js` | `hd1.nhiemVu` … `hd6.nhiemVu` |
| Số vai cần điền để đủ điểm HĐ4 | `js/app.js` | hàm `vaiCanThiet()` |
| Cách tính điểm thang 10 | `js/app.js` | hàm `computeScore()` |
| Cột trong Google Sheet | `apps-script/Code.gs` | mảng `FIELDS` (sửa xong Deploy lại) |
| Màu sắc, phông chữ | `css/style.css` | khối `:root` |

Nút **🖨️ In / lưu PDF** ở slide Tổng kết in cả 8 slide thành phiếu học tập giấy
(mỗi hoạt động 1 trang).
