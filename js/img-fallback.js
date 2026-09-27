/* =========================================================
   img-fallback.js — nhận MỌI đuôi ảnh, không chỉ .svg
   ---------------------------------------------------------
   Toàn bộ ảnh minh họa trong trang được gọi theo TÊN KHÔNG ĐUÔI
   (ví dụ "assets/scenarios/free-gallery"). Khi hiển thị, trang sẽ
   tự thử lần lượt các đuôi trong EXTS cho đến khi tìm được ảnh.

   ⇒ Bạn muốn thay ảnh: chỉ cần đặt file MỚI cùng tên, đuôi bất kỳ
     trong danh sách dưới đây (svg, png, jpg, jpeg, webp, gif),
     bỏ file cũ đi (hoặc để cả 2 cũng không sao, ảnh đứng đầu danh
     sách EXTS sẽ được ưu tiên hiển thị trước).

   File này phải nạp TRƯỚC js/visuals.js và js/app.js trong index.html.
   ========================================================= */
(function () {
  "use strict";

  // Thứ tự ưu tiên khi dò tìm — sửa thứ tự này nếu muốn ưu tiên đuôi khác.
  const EXTS = ["svg", "png", "jpg", "jpeg", "webp", "gif"];

  /** Chuỗi thuộc tính để chèn thẳng vào trong <img ...>. */
  function imgAttrs(base) {
    return `data-base="${base}" data-exts="${EXTS.join(",")}" data-i="0" `
         + `src="${base}.${EXTS[0]}" onerror="window.__imgFallback(this)"`;
  }

  /** Gán ảnh (có dự phòng đuôi) cho một <img> dùng lại nhiều lần (vd: ảnh ở HĐ5).
   *  Mỗi lần gán có một "thẻ" riêng để sự kiện lỗi của ảnh CŨ không phá ảnh MỚI. */
  let seq = 0;
  function setImgSrc(img, base) {
    if (!img) return;
    img.classList.remove("img-missing");      // xoá dấu "thiếu ảnh" của lần gán trước
    if (!base) {                              // gọi sai (vd: script cũ còn trong cache)
      img.removeAttribute("src");
      img.classList.add("img-missing");
      console.warn("[img-fallback] thiếu đường dẫn ảnh (base rỗng)");
      return;
    }
    const token = String(++seq);
    img.dataset.token = token;
    img.dataset.base = base;
    img.dataset.exts = EXTS.join(",");
    img.dataset.i = "0";
    img.onerror = () => window.__imgFallback(img, token);
    img.src = `${base}.${EXTS[0]}`;
  }

  /** Được <img onerror="…"> gọi khi một đuôi ảnh không tồn tại. */
  window.__imgFallback = function (img, token) {
    // Sự kiện lỗi đến muộn của ảnh trước đó → bỏ qua, không đụng vào ảnh đang hiện.
    if (token !== undefined && img.dataset.token !== token) return;
    const exts = (img.dataset.exts || "").split(",");
    const i = Number(img.dataset.i || 0) + 1;
    if (i >= exts.length) {
      img.onerror = null;                 // đã thử hết mọi đuôi, dừng lại
      img.classList.add("img-missing");   // hiện khung "thiếu ảnh" thay vì icon ảnh vỡ
      console.warn("[img-fallback] không tìm thấy ảnh:", img.dataset.base, "(.%s)", EXTS.join("/.") );
      return;
    }
    img.dataset.i = String(i);
    img.src = `${img.dataset.base}.${exts[i]}`;
  };

  window.IMG_FALLBACK = { attrs: imgAttrs, set: setImgSrc, EXTS };
})();
