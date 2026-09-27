/* =========================================================
   decor.js — LỚP TRANG TRÍ KÉO–THẢ KIỂU POWERPOINT
   ---------------------------------------------------------
   Bật/tắt: nút 🖼️ trên thanh trên, hoặc Ctrl + Alt + D
   Trong chế độ trang trí:
     • Kéo ảnh từ máy (Explorer) thả vào trang  → thêm ảnh
     • Click ảnh → chọn · kéo → di chuyển · nút góc → phóng to
     • Nút tròn vàng phía trên → xoay
     • ← ↑ → ↓ dịch 0,5% · Shift + phím: dịch 2%
     • Delete / Backspace: xoá · [ ]: đổi lớp · f: đưa lên trên nội dung
     • Ctrl/Cmd + D: nhân đôi ảnh đang chọn
   Toạ độ lưu theo % của slide đang chứa ảnh → co giãn đúng trên mọi màn hình.
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const LS = "attt10a5.decor.v1";

  /* Chỉ giáo viên chỉnh trang trí trên máy mình (mở file:// hoặc localhost) mới
     thấy nút 🖼️ và dùng được phím tắt Ctrl+Alt+D. Trên bản đã deploy (GitHub Pages…)
     học sinh KHÔNG thấy công cụ này — ảnh trang trí đã chốt vẫn hiển thị bình thường,
     chỉ ẩn phần "chỉnh sửa". Vị trí ảnh sau khi kéo xong thì xuất JSON, chốt vào
     decor-static.js rồi mới deploy — xem HUONG-DAN.md. */
  const isLocalEdit = location.protocol === "file:" ||
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  const layer = $("#decorLayer");
  const bar   = $("#decorBar");
  const info  = $("#decorInfo");

  let items = [];      // {id, step, src, file, xPct, yPct, wPct, rot, op, z, front}
  let nodes = new Map(); // id -> element
  let sel = null;
  let on = false;
  let uid = 1;

  /* ---------- nạp dữ liệu ---------- */
  function loadItems() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) {}
    const base = (saved && Array.isArray(saved) && saved.length) ? saved
               : (typeof DECOR_STATIC !== "undefined" ? DECOR_STATIC : []);
    items = base.map(o => Object.assign({
      id: "d" + (uid++), step: "s0", src: "", file: "", xPct: 50, yPct: 50,
      wPct: 20, rot: 0, op: 1, z: 1, front: false
    }, o));
    items.forEach(it => { if (String(it.id).startsWith("d")) uid = Math.max(uid, Number(String(it.id).slice(1)) + 1 || uid); });
  }

  function persist() {
    try {
      localStorage.setItem(LS, JSON.stringify(items));
    } catch (e) {
      toast("⚠️ Không lưu được vào bộ nhớ trình duyệt (ảnh quá lớn). Hãy bấm “Xuất vị trí (JSON)” để giữ kết quả.");
    }
  }

  /* ---------- vẽ ---------- */
  function render() {
    layer.innerHTML = ""; nodes.clear();
    items.slice().sort((a, b) => (a.z || 1) - (b.z || 1)).forEach(it => {
      const d = document.createElement("div");
      d.className = "decor-item";
      d.dataset.id = it.id;
      d.innerHTML = `<img src="${it.src}" alt="" draggable="false">
        <span class="h h-se" data-h="se"></span><span class="h h-rot" data-h="rot"></span>`;
      layer.appendChild(d);
      nodes.set(it.id, d);
    });
    relayout();
  }

  function stepEl(it) {
    if (it.step === "all") return $("#deck");
    return document.getElementById(it.step) || $("#deck");
  }

  function relayout() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    items.forEach(it => {
      const node = nodes.get(it.id); if (!node) return;
      const host = stepEl(it);
      const visible = it.step === "all" || host.classList.contains("active") || on;
      if (!host || !visible || host.offsetParent === null) { node.style.display = "none"; return; }
      node.style.display = "";
      const r = host.getBoundingClientRect();
      const w = (it.wPct / 100) * r.width;
      const cx = r.left + scrollX + (it.xPct / 100) * r.width;
      const cy = r.top + scrollY + (it.yPct / 100) * r.height;
      node.style.width = w + "px";
      node.style.left = cx + "px";
      node.style.top = cy + "px";
      node.style.opacity = it.op;
      node.style.zIndex = String((it.front ? 100 : 0) + (it.z || 1));
      node.style.transform = `translate(-50%,-50%) rotate(${it.rot}deg)`;
      node.classList.toggle("sel", sel === it.id);
    });
    showInfo();
  }
  window.DECOR = { relayout };

  /* ---------- chế độ ---------- */
  function setMode(v) {
    on = v;
    document.body.classList.toggle("decor-on", on);
    bar.hidden = !on;
    info.hidden = !on;
    $("#btnDecor").classList.toggle("on", on);
    if (!on) { sel = null; }
    relayout();
  }

  function activeStepId() {
    const a = $(".step.active");
    return a ? a.id : "s0";
  }

  /* ---------- thêm ảnh ---------- */
  function addFiles(files, pt) {
    const list = Array.from(files).filter(f => /^image\//.test(f.type));
    if (!list.length) return;
    list.forEach((f, i) => {
      const fr = new FileReader();
      fr.onload = () => {
        const host = document.getElementById(activeStepId());
        const r = host.getBoundingClientRect();
        let xPct = 50, yPct = 30;
        if (pt) {
          xPct = ((pt.x - r.left) / r.width) * 100;
          yPct = ((pt.y - r.top) / r.height) * 100;
        }
        const it = {
          id: "d" + (uid++), step: activeStepId(), src: fr.result, file: f.name,
          xPct: round(xPct + i * 3), yPct: round(yPct + i * 3), wPct: 22, rot: 0, op: 1,
          z: (items.reduce((m, x) => Math.max(m, x.z || 1), 0) + 1), front: false
        };
        items.push(it); sel = it.id;
        render(); persist();
        toast(`Đã thêm “${f.name}”. Nhớ copy ảnh này vào thư mục assets/ của project.`);
      };
      fr.readAsDataURL(f);
    });
  }

  const round = n => Math.round(n * 10) / 10;

  /* ---------- kéo / phóng / xoay ---------- */
  let drag = null;

  layer.addEventListener("pointerdown", e => {
    if (!on) return;
    const node = e.target.closest(".decor-item"); if (!node) return;
    e.preventDefault();
    sel = node.dataset.id;
    const it = items.find(x => x.id === sel); if (!it) return;
    const host = stepEl(it), r = host.getBoundingClientRect();
    const mode = e.target.dataset.h || "move";
    drag = {
      mode, id: it.id, r,
      sx: e.clientX, sy: e.clientY,
      x0: it.xPct, y0: it.yPct, w0: it.wPct, rot0: it.rot,
      cx: r.left + (it.xPct / 100) * r.width,
      cy: r.top + (it.yPct / 100) * r.height
    };
    if (mode === "rot") drag.a0 = Math.atan2(e.clientY - drag.cy, e.clientX - drag.cx) * 180 / Math.PI;
    document.body.classList.add("dragging");
    node.setPointerCapture?.(e.pointerId);
    relayout();
  });

  layer.addEventListener("pointermove", e => {
    if (!drag) return;
    const it = items.find(x => x.id === drag.id); if (!it) return;
    const r = drag.r;
    if (drag.mode === "move") {
      it.xPct = round(drag.x0 + ((e.clientX - drag.sx) / r.width) * 100);
      it.yPct = round(drag.y0 + ((e.clientY - drag.sy) / r.height) * 100);
    } else if (drag.mode === "se") {
      const d = (e.clientX - drag.sx) / r.width * 100;
      it.wPct = Math.max(2, round(drag.w0 + d * 2));
    } else if (drag.mode === "rot") {
      const a = Math.atan2(e.clientY - drag.cy, e.clientX - drag.cx) * 180 / Math.PI;
      let rot = drag.rot0 + (a - drag.a0);
      if (e.shiftKey) rot = Math.round(rot / 15) * 15;
      it.rot = Math.round(rot);
    }
    relayout();
  });

  function endDrag() {
    if (!drag) return;
    drag = null;
    document.body.classList.remove("dragging");
    persist();
  }
  layer.addEventListener("pointerup", endDrag);
  layer.addEventListener("pointercancel", endDrag);

  /* ---------- kéo ảnh từ máy vào trang ---------- */
  let hotT = null;
  window.addEventListener("dragover", e => {
    if (!on) return;
    if (!Array.from(e.dataTransfer.types || []).includes("Files")) return;
    e.preventDefault();
    document.body.classList.add("drop-hot");
    clearTimeout(hotT);
    hotT = setTimeout(() => document.body.classList.remove("drop-hot"), 160);
  });
  window.addEventListener("drop", e => {
    if (!on) return;
    e.preventDefault();
    document.body.classList.remove("drop-hot");
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files, { x: e.clientX, y: e.clientY });
  });

  /* ---------- bàn phím ---------- */
  document.addEventListener("keydown", e => {
    if (!isLocalEdit) return;   // học sinh trên bản deploy: phím tắt không có tác dụng
    if (e.ctrlKey && e.altKey && (e.key === "d" || e.key === "D")) { e.preventDefault(); setMode(!on); return; }
    if (!on) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;

    if ((e.ctrlKey || e.metaKey) && (e.key === "d" || e.key === "D")) { e.preventDefault(); dup(); return; }
    const it = items.find(x => x.id === sel);
    if (!it) return;
    const stp = e.shiftKey ? 2 : 0.5;
    const k = e.key;
    if (k === "ArrowLeft")  { it.xPct = round(it.xPct - stp); }
    else if (k === "ArrowRight") { it.xPct = round(it.xPct + stp); }
    else if (k === "ArrowUp")    { it.yPct = round(it.yPct - stp); }
    else if (k === "ArrowDown")  { it.yPct = round(it.yPct + stp); }
    else if (k === "Delete" || k === "Backspace") { del(); return; }
    else if (k === "[") { it.z = Math.max(0, (it.z || 1) - 1); }
    else if (k === "]") { it.z = (it.z || 1) + 1; }
    else if (k === "f" || k === "F") { it.front = !it.front; }
    else if (k === "+" || k === "=") { it.wPct = round(it.wPct + 1); }
    else if (k === "-") { it.wPct = Math.max(2, round(it.wPct - 1)); }
    else if (k === "0") { it.rot = 0; }
    else if (k === "Escape") { sel = null; relayout(); return; }
    else return;
    e.preventDefault();
    relayout(); persist();
  });

  /* ---------- lệnh trên thanh công cụ ---------- */
  function del() {
    if (!sel) return;
    items = items.filter(x => x.id !== sel);
    sel = null; render(); persist();
  }
  function dup() {
    const it = items.find(x => x.id === sel); if (!it) return;
    const c = Object.assign({}, it, { id: "d" + (uid++), xPct: round(it.xPct + 4), yPct: round(it.yPct + 4),
      z: (it.z || 1) + 1 });
    items.push(c); sel = c.id; render(); persist();
  }
  function zStep(d) {
    const it = items.find(x => x.id === sel); if (!it) return;
    it.z = Math.max(0, (it.z || 1) + d); relayout(); persist();
  }

  function exportJSON() {
    const out = items.map(it => ({
      step: it.step,
      src: it.file ? "assets/" + it.file : it.src.slice(0, 40),
      xPct: it.xPct, yPct: it.yPct, wPct: it.wPct,
      rot: it.rot, op: it.op, z: it.z, front: !!it.front
    }));
    const txt = JSON.stringify(out, null, 2);
    navigator.clipboard?.writeText(txt).then(
      () => toast("✅ Đã copy JSON vào clipboard. Dán cho Claude để chốt vị trí."),
      () => toast("Đã tải file decor.json (không copy được clipboard).")
    );
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "application/json" }));
    a.download = "decor.json"; a.click();
    URL.revokeObjectURL(a.href);
    console.log("=== DECOR JSON ===\n" + txt);
  }

  /** Tải các ảnh đang nằm trong bộ nhớ trình duyệt ra file, đặt sẵn tên
   *  theo slide (hd1.png, hd2.png…) để chỉ việc kéo vào assets/decor/. */
  function saveImages() {
    const ds = items.filter(it => /^data:/.test(it.src || ""));
    if (!ds.length) {
      toast("Không có ảnh nào đang lưu trong trình duyệt (các ảnh hiện tại đã là file trong assets/).");
      return;
    }
    const dem = {};
    ds.forEach((it, i) => {
      const base = (typeof DECOR_FILENAMES !== "undefined" && DECOR_FILENAMES[it.step]) || (it.step + ".png");
      dem[base] = (dem[base] || 0) + 1;
      const ten = dem[base] > 1 ? base.replace(/\.png$/, "-" + dem[base] + ".png") : base;
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = it.src;
        a.download = ten;
        a.click();
      }, i * 350);                       // giãn nhịp để trình duyệt không chặn
    });
    toast(`Đang tải ${ds.length} ảnh về máy. Hãy chuyển chúng vào thư mục assets/decor/ của project.`);
  }

  function importJSON() {
    const txt = prompt("Dán nội dung JSON vị trí ảnh vào đây:");
    if (!txt) return;
    try {
      const arr = JSON.parse(txt);
      if (!Array.isArray(arr)) throw new Error("JSON phải là một mảng");
      items = arr.map(o => Object.assign({ id: "d" + (uid++), step: "s0", xPct: 50, yPct: 50,
        wPct: 20, rot: 0, op: 1, z: 1, front: false }, o));
      render(); persist(); toast("✅ Đã nhập " + items.length + " ảnh.");
    } catch (e) { toast("❌ JSON không hợp lệ: " + e.message); }
  }

  let toastT = null;
  function toast(msg) {
    info.hidden = false;
    info.textContent = msg;
    clearTimeout(toastT);
    toastT = setTimeout(() => { showInfo(); }, 4200);
  }

  function showInfo() {
    if (!on) { info.hidden = true; return; }
    const it = items.find(x => x.id === sel);
    info.hidden = false;
    info.textContent = it
      ? `slide ${it.step} · x ${it.xPct}% · y ${it.yPct}% · w ${it.wPct}% · ${it.rot}° · z${it.z}${it.front ? " · trên nội dung" : ""}`
      : `${items.length} ảnh · slide hiện tại: ${activeStepId()} · kéo ảnh từ máy vào đây`;
  }

  /* ---------- gắn sự kiện ---------- */
  if (isLocalEdit) {
    $("#btnDecor").addEventListener("click", () => setMode(!on));
    $("#decorClose").addEventListener("click", () => setMode(false));
    $("#decorDel").addEventListener("click", del);
    $("#decorBack").addEventListener("click", () => zStep(-1));
    $("#decorFront").addEventListener("click", () => zStep(1));
    $("#decorExport").addEventListener("click", exportJSON);
    $("#decorSave").addEventListener("click", saveImages);
    $("#decorReset").addEventListener("click", () => {
      if (!confirm("Xoá bản trang trí nháp trong trình duyệt và dùng đúng bản đã chốt trong decor-static.js?\n\n(Ảnh nào chưa có file trong assets/ sẽ không hiện nữa.)")) return;
      try { localStorage.removeItem(LS); } catch (e) {}
      sel = null; uid = 1;
      loadItems(); render();
      toast("Đã chuyển sang bản đã chốt trong decor-static.js (" + items.length + " ảnh).");
    });
    $("#decorImport").addEventListener("click", importJSON);
    $("#decorFile").addEventListener("change", e => { addFiles(e.target.files, null); e.target.value = ""; });
  } else {
    // Bản đã deploy: ẩn hẳn nút bật chế độ trang trí, học sinh không thấy công cụ này.
    $("#btnDecor").style.display = "none";
  }

  window.addEventListener("resize", relayout);
  window.addEventListener("scroll", relayout, { passive: true });
  document.addEventListener("click", e => {
    if (on && !e.target.closest(".decor-item") && !e.target.closest(".decor-bar")) { sel = null; relayout(); }
  });

  loadItems();
  render();
  setTimeout(relayout, 300);   // chờ web-font tải xong, đo lại
  window.addEventListener("load", relayout);
})();
