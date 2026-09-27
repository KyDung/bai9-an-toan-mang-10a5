/* =========================================================
   decor-static.js — VỊ TRÍ ẢNH TRANG TRÍ ĐÃ "CHỐT"
   ---------------------------------------------------------
   Đây là bản trang trí chính thức của trang web, lấy từ file
   decor.json do giáo viên xuất ra ngày 27/09/2026.

   ⚠️ CẦN LÀM MỘT LẦN: đặt 6 ảnh vào thư mục assets/decor/ với
   đúng tên dưới đây. Ảnh gốc đang nằm trong bộ nhớ trình duyệt —
   bật chế độ trang trí (Ctrl + Alt + D) rồi bấm "⬇ Lưu ảnh vào máy",
   trình duyệt sẽ tải về đúng 6 tên file này, chỉ việc kéo vào assets/decor/.

   Tên file đặt theo slide cho dễ nhớ và an toàn khi deploy
   (không dấu, không dấu cách — tên có dấu như "tải xuống (1).png"
   rất dễ lỗi đường dẫn trên GitHub Pages).

   Ý nghĩa các trường:
     step : slide chứa ảnh ("s0".."s7", "all" = mọi slide)
     src  : đường dẫn ảnh
     xPct/yPct : vị trí TÂM ảnh, theo % chiều rộng/cao của slide
     wPct : chiều rộng ảnh theo % chiều rộng slide
     rot  : góc xoay (độ) · op: độ mờ (0–1) · z: thứ tự lớp
     front: true = nằm trên nội dung chữ, false = nằm dưới
   ========================================================= */
const DECOR_STATIC = [
  // Slide HĐ1 · Tín hiệu — góc trên phải  (ảnh gốc: ThamTu.png)
  { step: "s1", src: "assets/decor/hd1.png", xPct: 85.1, yPct: 2.6, wPct: 10.5, rot: 0, op: 1, z: 1, front: false },

  // Slide HĐ2 · Hồ sơ vụ án  (ảnh gốc: tải xuống.png)
  { step: "s2", src: "assets/decor/hd2.png", xPct: 86.8, yPct: -0.2, wPct: 18.7, rot: 0, op: 1, z: 2, front: false },

  // Slide HĐ3 · Có được phép?  (ảnh gốc: tải xuống (1).png)
  { step: "s3", src: "assets/decor/hd3.png", xPct: 88.8, yPct: 2.8, wPct: 13, rot: 0, op: 1, z: 3, front: false },

  // Slide HĐ4 · Nhiều góc nhìn  (ảnh gốc: tải xuống (4).png)
  { step: "s4", src: "assets/decor/hd4.png", xPct: 71.8, yPct: 2.5, wPct: 9, rot: 0, op: 1, z: 5, front: false },

  // Slide HĐ5 · Thử thách 10s  (ảnh gốc: tải xuống (5).png)
  { step: "s5", src: "assets/decor/hd5.png", xPct: 87.8, yPct: 7.6, wPct: 9.7, rot: 0, op: 1, z: 6, front: false },

  // Slide HĐ6 · Vận dụng  (ảnh gốc: tải xuống (2).png)
  { step: "s6", src: "assets/decor/hd6.png", xPct: 87.7, yPct: 4.2, wPct: 18.5, rot: 0, op: 1, z: 4, front: false }
];

/* Tên file mong muốn cho từng slide — dùng cho nút "⬇ Lưu ảnh vào máy".
   Nhờ bảng này, ảnh tải về đã đúng tên, không phải đổi tên tay. */
const DECOR_FILENAMES = {
  s0: "hd0.png", s1: "hd1.png", s2: "hd2.png", s3: "hd3.png",
  s4: "hd4.png", s5: "hd5.png", s6: "hd6.png", s7: "hd7.png", all: "chung.png"
};
