/* =========================================================
   app.js — logic phiếu học tập tương tác
   ========================================================= */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- TRẠNG THÁI ---------------- */
  const STORE_KEY = "attt10a5.answers.v3";
  const S = {
    mode: "nhom",                     // "nhom" | "canhan"
    info: { hoten: "", lop: CONFIG.LOP || "10A5", nhom: "", danhhieu: "", nhonhat: "" },
    thanhvien: ["", "", ""],          // danh sách thành viên, thêm/bớt được
    nghe: "",
    hd1: {}, hd1worst: "", hd1why: "",
    hd2: { flags: [], dec: "", w: ["", "", ""] },
    hd3: {}, hd3trap: "",
    hd4: { yKien: {}, loNhat: {}, giaiPhap: {}, slogan: "" },
    hd5: { answers: {}, score: 0, done: false },
    hd6: { raSoat: {}, quanhe: "", hinhthuc: "", tin: "" },
    checked: {},
    submitted: false
  };

  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      Object.assign(S, JSON.parse(raw));
    } catch (e) {}
  }

  /* =========================================================
     GIỌNG VĂN — đổi cách gọi giữa "nhóm em" và "em"
     Bản gốc (giọng nhóm) được giữ lại để khi chuyển về là khôi phục nguyên văn.
     ========================================================= */
  const VOICE = (() => {
    const goc = new WeakMap();                  // node/element -> văn bản gốc
    const LUAT = [
      [/\bNhóm em\b/g, "Em"],   [/\bnhóm em\b/g, "em"],
      [/\bCả nhóm\b/g, "Em"],   [/\bcả nhóm\b/g, "em"],
      [/\bMỗi nhóm\b/g, "Em"],  [/\bmỗi nhóm\b/g, "em"],
      [/\bCác nhóm\b/g, "Em"],  [/\bcác nhóm\b/g, "em"],
      [/\bcủa nhóm\b/g, "của em"],
      [/\bnhóm ghi\b/g, "em ghi"],
      [/\bthư kí ghi lại\b/g, "em ghi lại"],
      [/\bmỗi bạn\b/g, "em"],
      [/\bMỗi bạn\b/g, "Em"]
    ];
    const doi = s => LUAT.reduce((t, [re, v]) => t.replace(re, v), s);

    function duyet(root, fn) {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: n => (n.nodeValue && n.nodeValue.trim() && !/^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName))
          ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      });
      let n; while ((n = w.nextNode())) fn(n);
    }

    /** Áp giọng văn cho toàn bộ nội dung bài học. */
    function apply() {
      const canhan = S.mode === "canhan";
      const root = $("#deck"); if (!root) return;

      duyet(root, n => {
        if (!goc.has(n)) goc.set(n, n.nodeValue);
        const g = goc.get(n);
        const moi = canhan ? doi(g) : g;
        if (n.nodeValue !== moi) n.nodeValue = moi;
      });

      // placeholder của ô nhập cũng phải đổi theo
      $$("#deck [placeholder]").forEach(el => {
        if (!goc.has(el)) goc.set(el, el.placeholder);
        const g = goc.get(el);
        const moi = canhan ? doi(g) : g;
        if (el.placeholder !== moi) el.placeholder = moi;
      });
    }
    return { apply };
  })();

  /** Nhãn thay đổi theo chế độ làm bài. */
  function applyMode() {
    const canhan = S.mode === "canhan";
    document.body.classList.toggle("mode-canhan", canhan);

    $$("#modePick .mode-btn").forEach(b =>
      b.setAttribute("aria-pressed", String(b.dataset.mode === S.mode)));

    $("#infoTitle").textContent = canhan ? "Thông tin của em" : "Lập đội điều tra";
    $("#infoSub").innerHTML = canhan
      ? "Điền họ tên và <b>tự đặt cho mình một danh hiệu điều tra viên</b> — danh hiệu này theo em suốt tiết học."
      : "Điền thông tin nhóm và <b>đặt danh hiệu cho đội</b> ngay bây giờ — danh hiệu này theo nhóm em suốt tiết học.";
    $("#lblHoTen").textContent = canhan ? "Họ và tên của em" : "Nhóm trưởng / người ghi phiếu";
    $("#lblDanhHieu").textContent = canhan ? "Danh hiệu của em" : "Danh hiệu của đội";
    $("#resLbl").textContent = canhan ? "Điểm của em (thang 10)" : "Điểm của nhóm em (thang 10)";

    VOICE.apply();
    updateScore();
  }

  /* =========================================================
     ỐNG KÍNH NGHỀ — nghề đã chọn hiện xuyên suốt các hoạt động
     ========================================================= */
  function renderLens() {
    const n = DATA.ngheNghiep.find(x => x.id === S.nghe);

    // chip trên thanh tiêu đề
    const chip = $("#roleChip");
    chip.innerHTML = n ? `${n.icon} <span>${esc(n.ten)}</span>` : `🎭 <span>Chưa chọn nghề</span>`;
    chip.classList.toggle("empty", !n);

    // dải "ống kính" đầu mỗi hoạt động
    $$(".lens-slot").forEach(slot => {
      slot.innerHTML = n
        ? `<div class="lens"><span class="lens-ic">${n.icon}</span>
             <span><b>Em đang nhìn bằng con mắt của ${esc(n.ten)}</b>
             <span class="lens-q">Câu hỏi của nghề này: ${esc(n.ongKinh)}</span></span></div>`
        : `<div class="lens lens-empty"><span class="lens-ic">🎭</span>
             <span><b>Em chưa chọn nghề để nhập vai</b>
             <span class="lens-q">Quay lại Hoạt động 1 (bước 3) chọn một nghề — mọi hoạt động sẽ có thêm câu hỏi định hướng riêng cho nghề đó.</span></span></div>`;
    });

    // HĐ3: nhóm Pháp chế / Sáng tạo nội dung làm cố vấn cho cả lớp (theo KHBD)
    const ad = $("#hd3Advisor");
    if (n && n.coVan) {
      ad.hidden = false;
      ad.innerHTML = `<b>⭐ Em là CỐ VẤN của lớp ở hoạt động này.</b>
        Ngoài việc tự phân loại, khi nhóm khác hỏi “cái này có được dùng không?”,
        em trả lời giúp với vai ${esc(n.ten)} và nêu rõ lí do.`;
    } else {
      ad.hidden = true;
    }
    VOICE.apply();
  }

  /* ---------------- KHỞI TẠO GIAO DIỆN ---------------- */
  function buildIntro() {
    $("#q5list").innerHTML = DATA.cauHoiDieuTra.map(q => `<li>${esc(q)}</li>`).join("");

    $("#roleGrid").innerHTML = DATA.ngheNghiep.map(n => `
      <button class="role" type="button" data-nghe="${n.id}" aria-pressed="false">
        <img class="role-image" ${window.IMG_FALLBACK.attrs('assets/roles/' + n.id)} alt="" width="56" height="56" loading="lazy">
        <span><b>${esc(n.ten)}</b><span>${esc(n.quanTam)}</span></span>
      </button>`).join("");

    $$("#roleGrid .role").forEach(b => b.addEventListener("click", () => {
      S.nghe = S.nghe === b.dataset.nghe ? "" : b.dataset.nghe;
      syncRoles(); save();
    }));

    const map = { fHoTen: "hoten", fLop: "lop", fNhom: "nhom", fDanhHieu: "danhhieu", fNhoNhat: "nhonhat" };
    Object.entries(map).forEach(([id, key]) => {
      const el = $("#" + id); if (!el) return;
      if (S.info[key]) el.value = S.info[key]; else S.info[key] = el.value;
      el.addEventListener("input", () => { S.info[key] = el.value; save(); });
    });

    buildMembers();
    $("#btnAddMember").addEventListener("click", () => {
      S.thanhvien.push(""); save(); buildMembers();
      const rows = $$("#memberList input");
      rows[rows.length - 1]?.focus();
    });

    // công tắc Cá nhân / Nhóm
    $$("#modePick .mode-btn").forEach(b => b.addEventListener("click", () => {
      S.mode = b.dataset.mode; save(); applyMode();
    }));

    // chip nghề trên thanh tiêu đề → quay về bước chọn nghề
    $("#roleChip").addEventListener("click", () => {
      go(0);
      setTimeout(() => $("#roleGrid").scrollIntoView({ behavior: "smooth", block: "center" }), 350);
    });
  }

  /* ---- Danh sách thành viên: thêm / bớt từng dòng ---- */
  function buildMembers() {
    if (!Array.isArray(S.thanhvien) || !S.thanhvien.length) S.thanhvien = ["", "", ""];
    $("#memberList").innerHTML = S.thanhvien.map((ten, i) => `
      <div class="member-row">
        <span class="member-no">${i + 1}</span>
        <input type="text" data-i="${i}" value="${esc(ten)}" placeholder="Họ và tên bạn thứ ${i + 1}" autocomplete="off">
        <button class="member-del" type="button" data-del="${i}" title="Bỏ dòng này" aria-label="Bỏ thành viên ${i + 1}">✕</button>
      </div>`).join("");

    $$("#memberList input").forEach(el => el.addEventListener("input", () => {
      S.thanhvien[Number(el.dataset.i)] = el.value;
      countMembers(); save();
    }));

    $$("#memberList .member-del").forEach(b => b.addEventListener("click", () => {
      const i = Number(b.dataset.del);
      S.thanhvien.splice(i, 1);
      if (!S.thanhvien.length) S.thanhvien = [""];
      save(); buildMembers();
    }));
    countMembers();
  }

  function countMembers() {
    const n = S.thanhvien.filter(x => x.trim()).length;
    $("#memberCount").textContent = n ? n + " bạn" : "chưa có tên";
  }

  /** Danh sách thành viên dạng một dòng, dùng khi nộp bài. */
  function membersText() { return S.thanhvien.filter(x => x.trim()).join(", "); }

  function syncRoles() {
    $$("#roleGrid .role").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.nghe === S.nghe)));
    const n = DATA.ngheNghiep.find(x => x.id === S.nghe);
    const lbl = $("#hd2Role");
    if (lbl) lbl.textContent = n ? n.icon + " " + n.ten : "(chưa chọn nghề ở Hoạt động 1)";
    renderLens();
    markHd4Role();
  }

  /** HĐ4: nói rõ nhóm cần mấy vai (theo số thành viên) và vai nào trùng nghề đã chọn.
   *  Ở hoạt động này nhóm vẫn phải đi qua ĐỦ các góc nhìn — nghề chọn ở Hoạt động 1
   *  chỉ quyết định vai nào nhóm phải phân tích sâu nhất, không thay thế các vai khác. */
  function markHd4Role() {
    const n = DATA.ngheNghiep.find(x => x.id === S.nghe);
    const can = vaiCanThiet();
    const soBan = S.mode === "canhan" ? 1 : S.thanhvien.filter(x => x.trim()).length;

    const note = $("#hd4VaiNote");
    if (note) {
      const veSo = S.mode === "canhan"
        ? `Em làm một mình → cần nêu ý kiến của ít nhất <b>${can} vai</b> (chọn vai nào cũng được).`
        : soBan
          ? `Nhóm em có <b>${soBan} bạn</b> → cần nêu ý kiến của ít nhất <b>${can} vai</b>.`
            + (soBan < 5 ? " Nhóm ít bạn thì một bạn giữ 2 vai." : " Mỗi bạn một vai.")
          : `Chưa điền danh sách thành viên ở Hoạt động 1 → tạm yêu cầu đủ <b>5 vai</b>.`;
      const veNghe = n
        ? ` Nghề nhóm em nhập vai là <b>${esc(n.ten)}</b> → vai được đánh dấu bên dưới là vai nhóm em phải phân tích <b>sâu nhất</b>, nhưng các vai còn lại vẫn phải có ý kiến.`
        : "";
      note.innerHTML = veSo + veNghe;
    }

    $$("#hd4Roles .slot").forEach(s => {
      const khop = !!n && s.dataset.vai === n.vaiHd4;
      s.classList.toggle("suggested", khop);
      let tag = $(".slot-tag", s);
      if (khop && !tag) {
        tag = document.createElement("span");
        tag.className = "slot-tag";
        tag.textContent = "⬅ trùng nghề nhóm em nhập vai — phân tích sâu nhất";
        $(".slot-h", s).appendChild(tag);
      } else if (!khop && tag) {
        tag.remove();
      }
    });
  }

  /** Khối "Việc cần làm" — dùng chung cho mọi hoạt động. */
  function buildTaskSteps(sel, list) {
    const el = $(sel); if (!el || !list) return;
    el.innerHTML = list.map(n => `
      <li><b>Bước ${n.b} — ${esc(n.ten)}</b>${n.phut ? ` <span class="step-time">${esc(n.phut)}</span>` : ""}
        <span class="step-do">${esc(n.mo)}</span></li>`).join("");
  }

  /* ---- Bộ phân loại 3 mức dùng chung cho HĐ1 & HĐ3 ---- */
  function buildClassifier(cfg) {
    $(cfg.legendSel).innerHTML = cfg.nhan
      .map(n => `<span class="lg-${n.mau}">${n.icon} ${esc(n.ten)}</span>`).join("");

    $(cfg.listSel).innerHTML = cfg.items.map((it, i) => `
      <div class="qitem${it.visual ? ' with-visual' : ''}" data-id="${it.id}">
        ${it.visual ? LESSON_VISUALS.figure(it.visual) : ''}
        <p class="qi-txt"><span class="tag">Câu ${i + 1}${cfg.maKhbd ? ` <i>· ${cfg.maKhbd}${it.id}</i>` : ""}</span>${esc(it.text)}</p>
        <div class="opt3">
          ${cfg.nhan.map(n => `<button type="button" class="c-${n.mau}" data-v="${n.v}"
              title="${esc(n.ten)}" aria-pressed="false">${n.icon}</button>`).join("")}
        </div>
      </div>`).join("");

    $$(cfg.listSel + " .opt3 button").forEach(b => b.addEventListener("click", () => {
      const item = b.closest(".qitem"), id = item.dataset.id, v = Number(b.dataset.v);
      cfg.state[id] = cfg.state[id] === v ? undefined : v;
      if (cfg.state[id] === undefined) delete cfg.state[id];
      syncClassifier(cfg); save();
    }));
    syncClassifier(cfg);
  }

  function syncClassifier(cfg) {
    $$(cfg.listSel + " .qitem").forEach(item => {
      const cur = cfg.state[item.dataset.id];
      $$(".opt3 button", item).forEach(b => b.setAttribute("aria-pressed", String(Number(b.dataset.v) === cur)));
    });
  }

  /* ---------------- HĐ1 ---------------- */
  function buildHd1() {
    buildTaskSteps("#hd1NhiemVu", DATA.hd1.nhiemVu);
    buildClassifier({ legendSel: "#hd1Legend", listSel: "#hd1List", nhan: DATA.hd1.nhan,
      items: DATA.hd1.items, state: S.hd1, maKhbd: "TH" });

    const sel = $("#hd1Worst");
    sel.innerHTML = `<option value="">— chọn —</option>` +
      DATA.hd1.items.map((it, i) => `<option value="${it.id}">Câu ${i + 1} — ${esc(it.text.slice(0, 48))}…</option>`).join("");
    sel.value = S.hd1worst || "";
    sel.addEventListener("change", () => { S.hd1worst = sel.value; save(); });

    const why = $("#hd1Why");
    why.value = S.hd1why || "";
    why.addEventListener("input", () => { S.hd1why = why.value; save(); });
  }

  /* ---------------- HĐ2 ---------------- */
  function buildHd2() {
    buildTaskSteps("#hd2NhiemVu", DATA.hd2.nhiemVu);
    $("#hd2Msg").innerHTML = DATA.hd2.tinNhan.map(t => `<p>${esc(t)}</p>`).join("");

    // Ô chọn có huy hiệu chữ + cắm "cờ đỏ" khi học sinh tick (màu theo lựa chọn
    // của học sinh, KHÔNG theo đáp án — nếu theo đáp án thì lộ bài).
    $("#hd2Flags").innerHTML = DATA.hd2.dauHieu.map((d, i) => `
      <label class="opt opt-flag" data-id="${d.id}">
        <input type="checkbox" value="${d.id}">
        <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
        <span>${esc(d.text)}</span>
        <span class="opt-flagic" aria-hidden="true">🚩</span>
      </label>`).join("");

    $$("#hd2Flags input").forEach(cb => {
      cb.checked = S.hd2.flags.includes(cb.value);
      cb.addEventListener("change", () => {
        S.hd2.flags = $$("#hd2Flags input:checked").map(x => x.value);
        syncHd2(); save();
      });
    });

    $("#hd2Dec").innerHTML = DATA.hd2.quyetDinh.map((q, i) => `
      <label class="opt opt-pick" data-id="${q.id}">
        <input type="radio" name="hd2dec" value="${q.id}">
        <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
        <span>${esc(q.text)}</span>
      </label>`).join("");
    $$("#hd2Dec input").forEach(r => {
      r.checked = S.hd2.dec === r.value;
      r.addEventListener("change", () => { S.hd2.dec = r.value; syncHd2(); save(); });
    });

    // Không đặt gợi ý đáp án vào placeholder (học sinh sẽ chép lại) —
    // placeholder viết sẵn trong index.html chỉ nói về THỨ TỰ việc làm.
    ["hd2W1", "hd2W2", "hd2W3"].forEach((id, i) => {
      const el = $("#" + id);
      el.value = S.hd2.w[i] || "";
      el.addEventListener("input", () => { S.hd2.w[i] = el.value; save(); });
    });
    syncHd2();
  }

  function syncHd2() {
    $("#hd2Count").textContent = S.hd2.flags.length;
    $$("#hd2Flags .opt").forEach(l => l.classList.toggle("sel", $("input", l).checked));
    $$("#hd2Dec .opt").forEach(l => l.classList.toggle("sel", $("input", l).checked));
  }

  /* ---------------- HĐ3 ---------------- */
  function buildHd3() {
    buildTaskSteps("#hd3NhiemVu", DATA.hd3.nhiemVu);
    buildClassifier({ legendSel: "#hd3Legend", listSel: "#hd3List", nhan: DATA.hd3.nhan,
      items: DATA.hd3.items, state: S.hd3, maKhbd: "Sản phẩm " });

    $("#hd3TrapQ").textContent = DATA.hd3.bay.cauHoi;
    $("#hd3Trap").innerHTML = DATA.hd3.bay.luaChon.map((c, i) => `
      <label class="opt opt-pick" data-id="${c.id}">
        <input type="radio" name="hd3trap" value="${c.id}">
        <span class="opt-badge">${String.fromCharCode(65 + i)}</span>
        <span>${esc(c.text)}</span>
      </label>`).join("");
    $$("#hd3Trap input").forEach(r => {
      r.checked = S.hd3trap === r.value;
      r.addEventListener("change", () => {
        S.hd3trap = r.value;
        $$("#hd3Trap .opt").forEach(l => l.classList.toggle("sel", $("input", l).checked));
        save();
      });
    });
    $$("#hd3Trap .opt").forEach(l => l.classList.toggle("sel", $("input", l).checked));
  }

  /* ---------------- HĐ4 ---------------- */
  function buildHd4() {
    const H = DATA.hd4;
    $("#hd4BoiCanh").textContent = H.boiCanh;
    $("#hd4DeXuatLead").textContent = H.deXuatCuaBan;
    $("#hd4CauHoiLon").textContent = H.cauHoiLon;

    // 5 vấn đề, đánh số rõ để bước 1 và bước 2 tham chiếu được
    $("#hd4DeXuat").innerHTML = H.deXuat.map(d => `
      <div class="propose-item">
        <span class="p-no">${d.id}</span>
        <span class="p-ic">${d.ic}</span>
        <span><b>Vấn đề ${d.id} · ${esc(d.ten)}</b>${esc(d.noiDung)}</span>
      </div>`).join("");

    buildTaskSteps("#hd4NhiemVu", H.nhiemVu);
    $("#hd4LuuYVai").textContent = H.luuYVai;

    /* --- Bước 1: mỗi vai chọn vấn đề lo nhất + đề nghị của mình --- */
    const opts = v => `<option value="">— chọn vấn đề —</option>` + H.deXuat.map(d =>
      `<option value="${d.id}">Vấn đề ${d.id} · ${esc(d.ten)}${d.id === v.vanDeGoiY ? " (thường là vai này)" : ""}</option>`).join("");

    $("#hd4Roles").innerHTML = H.vai.map(v => `
      <div class="slot" data-vai="${v.id}">
        <p class="slot-h">${esc(v.ten)}</p>
        <p class="slot-q">${esc(v.dinhHuong)}</p>
        <div class="slot-row">
          <label>Vấn đề vai này lo nhất
            <select data-lo="${v.id}">${opts(v)}</select>
          </label>
          <label>Vai này đề nghị nhóm làm gì?
            <input type="text" data-vai="${v.id}" placeholder="Em đề nghị nhóm…" autocomplete="off">
          </label>
        </div>
      </div>`).join("");

    $$("#hd4Roles input[data-vai]").forEach(el => {
      const k = el.dataset.vai;
      el.value = S.hd4.yKien[k] || "";
      el.addEventListener("input", () => { S.hd4.yKien[k] = el.value; save(); });
    });
    $$("#hd4Roles select[data-lo]").forEach(el => {
      const k = el.dataset.lo;
      el.value = S.hd4.loNhat[k] || "";
      el.addEventListener("change", () => { S.hd4.loNhat[k] = el.value; save(); });
    });

    /* --- Bước 2: bảng 5 vấn đề, mỗi vấn đề 2 ô --- */
    $("#hd4Table").innerHTML = `
      <div class="vd-head"><span>Vấn đề</span><span>KHÔNG nên làm gì</span><span>NÊN làm gì thay thế</span></div>` +
      H.deXuat.map(d => `
      <div class="vd-row" data-vd="${d.id}">
        <span class="vd-name"><b>${d.id}. ${esc(d.ten)}</b><i>${esc(d.noiDung.slice(0, 54))}…</i></span>
        <input type="text" data-vd="${d.id}" data-f="khong" placeholder="Không nên…" autocomplete="off">
        <input type="text" data-vd="${d.id}" data-f="nen" placeholder="Nên…" autocomplete="off">
      </div>`).join("");

    $$("#hd4Table input").forEach(el => {
      const id = el.dataset.vd, f = el.dataset.f;
      S.hd4.giaiPhap[id] = S.hd4.giaiPhap[id] || { khong: "", nen: "" };
      el.value = S.hd4.giaiPhap[id][f] || "";
      el.addEventListener("input", () => {
        S.hd4.giaiPhap[id][f] = el.value;
        countVanDe(); save();
      });
    });

    const sl = $("#hd4Slogan");
    sl.value = S.hd4.slogan || "";
    sl.addEventListener("input", () => { S.hd4.slogan = sl.value; save(); });

    countVanDe();
  }

  /** Một vấn đề coi là đã xử lí khi có cả ô KHÔNG nên và ô NÊN. */
  function vanDeXong(id) {
    const g = S.hd4.giaiPhap[id] || {};
    return (g.khong || "").trim().length > 3 && (g.nen || "").trim().length > 3;
  }

  function countVanDe() {
    const n = DATA.hd4.deXuat.filter(d => vanDeXong(d.id)).length;
    $("#hd4Count").textContent = n;
    $$("#hd4Table .vd-row").forEach(r => r.classList.toggle("done", vanDeXong(r.dataset.vd)));
  }

  /* ---------------- HĐ5 — thử thách 10 giây (chọn đáp án) ---------------- */
  const GIAY = DATA.hd5.giay || 10;                 // số giây cho mỗi câu
  const G = { i: 0, t: null, left: GIAY, locked: false };
  const RING = 2 * Math.PI * 44;

  function buildHd5() {
    buildTaskSteps("#hd5NhiemVu", DATA.hd5.nhiemVu);
    $("#hd5Ask").textContent = DATA.hd5.cauHoi;
    $("#hd5Cards").innerHTML = DATA.hd5.the.map(t => `
      <button type="button" class="c-${t.mau}" data-v="${t.v}">
        <span class="ic">${t.icon}</span>${esc(t.ten)}
        <small>${esc(t.moTa)}</small>
      </button>`).join("");
    $$("#hd5Cards button").forEach(b => b.addEventListener("click", () => pick(b.dataset.v)));
    $("#hd5Go").addEventListener("click", startGame);
    $("#hd5Again").addEventListener("click", startGame);
    if (S.hd5.done) showGameEnd();
  }

  function startGame() {
    S.hd5 = { answers: {}, score: 0, done: false };
    G.i = 0; save();
    $("#hd5Start").hidden = true; $("#hd5End").hidden = true; $("#hd5Play").hidden = false;
    showQuestion();
  }

  function showQuestion() {
    const it = DATA.hd5.items[G.i];
    if (!it) return endGame();
    G.locked = false; G.left = GIAY;
    $("#hd5Idx").textContent = `Câu ${G.i + 1} / ${DATA.hd5.items.length}`;
    $("#hd5Txt").textContent = it.text;
    window.IMG_FALLBACK.set($("#hd5Image"), it.visual.base);
    $("#hd5Image").alt = it.visual.alt;
    $("#hd5Fb").textContent = "";
    $$("#hd5Cards button").forEach(b => { b.disabled = false; b.className = "c-" + colorOf(b.dataset.v); });
    tickUI();
    clearInterval(G.t);
    G.t = setInterval(() => {
      G.left--; tickUI();
      if (G.left <= 0) { clearInterval(G.t); pick(null); }
    }, 1000);
  }

  function colorOf(v) { const t = DATA.hd5.the.find(x => x.v === v); return t ? t.mau : "green"; }

  function tickUI() {
    $("#hd5Num").textContent = Math.max(G.left, 0);
    const ring = $("#hd5Ring");
    ring.style.strokeDashoffset = String(RING * (1 - Math.max(G.left, 0) / GIAY));
    ring.style.stroke = G.left <= 3 ? "var(--red)" : G.left <= 5 ? "var(--yellow)" : "var(--cyan)";
  }

  function pick(v) {
    if (G.locked) return;
    G.locked = true; clearInterval(G.t);
    const it = DATA.hd5.items[G.i];
    const right = v === it.dap;
    S.hd5.answers[it.id] = v || "(hết giờ)";
    if (right) S.hd5.score++;
    save();

    $$("#hd5Cards button").forEach(b => {
      b.disabled = true;
      if (b.dataset.v === it.dap) b.classList.add("right");
      if (v && b.dataset.v === v && !right) b.classList.add("wrong");
      if (v && b.dataset.v === v) b.classList.add("picked");
    });
    $("#hd5Fb").innerHTML = (v === null ? `⏰ <b>Hết ${GIAY} giây!</b> ` : right ? "✅ <b>Chính xác!</b> " : "❌ <b>Chưa đúng.</b> ")
      + esc(it.giai);
    setTimeout(() => { G.i++; showQuestion(); }, 2000);
  }

  function endGame() {
    S.hd5.done = true; save();
    showGameEnd(); updateScore();
  }

  function showGameEnd() {
    $("#hd5Start").hidden = true; $("#hd5Play").hidden = true; $("#hd5End").hidden = false;
    $("#hd5Score").textContent = S.hd5.score;
    $("#hd5Review").innerHTML = DATA.hd5.items.map(it => {
      const a = S.hd5.answers[it.id];
      const ok = a === it.dap;
      const ten = v => { const t = DATA.hd5.the.find(x => x.v === v); return t ? t.icon + " " + t.ten : v; };
      return `<li><b>${ok ? "✅" : "❌"} Câu ${it.id}:</b> ${esc(it.text)}<br>
        Đáp án: <b>${ten(it.dap)}</b> — ${esc(it.giai)}${ok ? "" : `<br><i>Nhóm em chọn: ${esc(ten(a) || "—")}</i>`}</li>`;
    }).join("");
  }

  /* ---------------- HĐ6 — "3 ngày an toàn số" (làm ở nhà) ---------------- */
  function buildHd6() {
    const H = DATA.hd6;
    const row = (arr, icons) => arr.map((t, i) => `<p class="rule"><img ${window.IMG_FALLBACK.attrs('assets/roles/' + icons[i])} alt="" width="42" height="42" loading="lazy"><span><b>${i + 1}.</b> ${esc(t)}</span></p>`).join("");
    $("#hd6No").innerHTML = row(H.khong, ["password", "hr", "coder", "creator", "truyenthong"]);
    $("#hd6Yes").innerHTML = row(H.nen, ["password", "verify", "permission", "support", "pause"]);

    buildTaskSteps("#hd6NhiemVu", H.nhiemVu);
    $("#hd6Intro").textContent = H.gioiThieu;
    $("#hd6HanNop").textContent = "📅 " + H.hanNop;

    /* Bước 1 – cam kết việc sẽ làm trong 3 ngày tới */
    $("#hd6CamKetTitle").textContent = H.camKetTieuDe;
    $("#hd6CamKetDesc").textContent = H.camKetMoTa;
    $("#hd6RaSoat").innerHTML = H.raSoat.map(r => `
      <div class="hc-item" data-id="${r.id}">
        <label class="opt">
          <input type="checkbox" value="${r.id}">
          <span><span class="hc-ic">${r.ic}</span>${esc(r.text)}</span>
        </label>
      </div>`).join("");

    $$("#hd6RaSoat input[type=checkbox]").forEach(cb => {
      cb.checked = !!S.hd6.raSoat[cb.value];
      cb.closest(".hc-item").classList.toggle("done", cb.checked);
      cb.addEventListener("change", () => {
        S.hd6.raSoat[cb.value] = cb.checked;
        cb.closest(".hc-item").classList.toggle("done", cb.checked);
        countCamKet(); save();
      });
    });
    countCamKet();

    /* Bước 2 – chọn người thân + hình thức lừa đảo sẽ kể */
    const L = H.lanToa;
    $("#hd6LanToaTitle").textContent = L.tieuDe;
    $("#hd6LanToaDesc").textContent = L.moTa;

    const sel = $("#hd6QuanHe");
    sel.innerHTML = `<option value="">— chọn —</option>` + L.quanHe.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join("");
    sel.value = S.hd6.quanhe || "";
    sel.addEventListener("change", () => { S.hd6.quanhe = sel.value; save(); });

    const ht = $("#hd6HinhThuc");
    ht.innerHTML = `<option value="">— chọn —</option>` + L.hinhThuc.map(q => `<option value="${esc(q)}">${esc(q)}</option>`).join("");
    ht.value = S.hd6.hinhthuc || "";
    ht.addEventListener("change", () => { S.hd6.hinhthuc = ht.value; save(); });

    /* Bước 3 – viết tin nhắn cảnh báo ngay tại lớp */
    $("#hd6TinDesc").textContent = H.tinMoTa;
    const tin = $("#hd6Tin");
    tin.value = S.hd6.tin || "";
    countTin();
    tin.addEventListener("input", () => { S.hd6.tin = tin.value; countTin(); save(); });
  }

  function countCamKet() {
    $("#hd6Count").textContent = DATA.hd6.raSoat.filter(r => S.hd6.raSoat[r.id]).length;
  }

  function countTin() {
    const s = (S.hd6.tin || "").trim();
    const n = s ? s.split(/\s+/).length : 0;
    const el = $("#hd6TinCount");
    el.textContent = n + " chữ" + (n && n < 8 ? " — hơi ngắn, viết rõ hơn một chút nhé" : n >= 8 ? " ✔" : "");
    el.classList.toggle("ok", n >= 8);
  }

  /* ---------------- KIỂM TRA & CHẤM ---------------- */
  function checkHd1() {
    let ok = 0;
    $$("#hd1List .qitem").forEach(item => {
      const it = DATA.hd1.items.find(x => String(x.id) === item.dataset.id);
      const cur = S.hd1[it.id];
      const right = cur === it.dap;
      if (right) ok++;
      item.classList.toggle("ok", right);
      item.classList.toggle("no", cur !== undefined && !right);
      let exp = $(".qi-exp", item);
      if (!exp) { exp = document.createElement("p"); exp.className = "qi-exp"; item.appendChild(exp); }
      const ten = DATA.hd1.nhan.find(n => n.v === it.dap);
      exp.innerHTML = `Đáp án: <b>${ten.icon} ${esc(ten.ten)}</b> — ${esc(it.giai)}`;
    });
    S.checked.hd1 = ok;
    fb("#fbHd1", ok, DATA.hd1.items.length,
      ok === 6 ? "Xuất sắc! Nhóm em đọc tín hiệu rất chuẩn." : "Xem lại phần giải thích ở từng tình huống nhé.");
    $("#conclHd1").hidden = false;
    finish();
  }

  function checkHd2() {
    const dh = DATA.hd2.dauHieu;
    const chosen = new Set(S.hd2.flags);
    let hit = 0, miss = 0;
    $$("#hd2Flags .opt").forEach(l => {
      const d = dh.find(x => x.id === l.dataset.id);
      const sel = chosen.has(d.id);
      l.classList.remove("sel");
      l.classList.toggle("ok", d.do);
      l.classList.toggle("no", sel && !d.do);
      if (d.do && sel) hit++;
      if (!d.do && sel) miss++;
      let m = $(".mark", l);
      if (!m) { m = document.createElement("span"); m.className = "mark"; l.appendChild(m); }
      m.textContent = d.do ? "🚩 dấu hiệu đỏ" : sel ? "✖ không phải" : "";
    });

    const decOk = DATA.hd2.quyetDinh.find(q => q.id === S.hd2.dec)?.dung === true;
    $$("#hd2Dec .opt").forEach(l => {
      const q = DATA.hd2.quyetDinh.find(x => x.id === l.dataset.id);
      l.classList.remove("sel");
      l.classList.toggle("ok", q.dung);
      l.classList.toggle("no", S.hd2.dec === q.id && !q.dung);
    });

    const wDone = S.hd2.w.filter(x => x.trim().length > 2).length;
    S.checked.hd2 = { hit, miss, decOk, wDone };

    const li = [];
    li.push(`Dấu hiệu đỏ: tìm đúng <b>${hit}/5</b>${miss ? `, chọn sai <b>${miss}</b>` : ""}.`);
    li.push(decOk ? "Quyết định: <b>chính xác</b> — dừng lại, xác minh, báo người có trách nhiệm."
                  : "Quyết định: <b>chưa đúng</b> — tuyệt đối không chuyển tiền, không gửi OTP/CCCD.");
    li.push(`Ba việc làm đầu tiên: đã ghi <b>${wDone}/3</b>. Gợi ý: ${DATA.hd2.goiY3Viec.map(esc).join(" · ")}`);
    fbHtml("#fbHd2", hit === 5 && miss === 0 && decOk ? "good" : hit >= 3 ? "mid" : "bad",
      "Kết quả điều tra hồ sơ", li);
    $("#conclHd2").hidden = false;
    finish();
  }

  function checkHd3() {
    let ok = 0;
    $$("#hd3List .qitem").forEach(item => {
      const it = DATA.hd3.items.find(x => x.id === item.dataset.id);
      const cur = S.hd3[it.id];
      const right = cur === it.dap || (it.dapPhu && cur === it.dapPhu);
      if (right) ok++;
      item.classList.toggle("ok", right);
      item.classList.toggle("no", cur !== undefined && !right);
      let exp = $(".qi-exp", item);
      if (!exp) { exp = document.createElement("p"); exp.className = "qi-exp"; item.appendChild(exp); }
      const ten = DATA.hd3.nhan.find(n => n.v === it.dap);
      exp.innerHTML = `Đáp án: <b>${ten.icon} ${esc(ten.ten)}</b>${it.dapPhu ? " (chấp nhận cả mức ③)" : ""} — ${esc(it.giai)}`;
    });

    const trapOk = DATA.hd3.bay.luaChon.find(c => c.id === S.hd3trap)?.dung === true;
    $$("#hd3Trap .opt").forEach(l => {
      const c = DATA.hd3.bay.luaChon.find(x => x.id === l.dataset.id);
      l.classList.remove("sel");
      l.classList.toggle("ok", c.dung);
      l.classList.toggle("no", S.hd3trap === c.id && !c.dung);
    });

    S.checked.hd3 = { ok, trapOk };
    fbHtml("#fbHd3", ok >= 4 && trapOk ? "good" : ok >= 3 ? "mid" : "bad", "Kết quả phân loại quyền sử dụng", [
      `Phân loại đúng <b>${ok}/5</b> sản phẩm số.`,
      trapOk ? "Câu hỏi bẫy: <b>đúng</b> — “có trên Internet” ≠ “được dùng tự do”."
             : "Câu hỏi bẫy: <b>chưa đúng</b> — mọi tác phẩm đều được bảo hộ quyền tác giả, trừ khi tác giả cho phép hoặc thuộc phạm vi công cộng."
    ]);
    $("#conclHd3").hidden = false;
    finish();
  }

  /** Số vai cần nêu ý kiến để được đủ điểm phần nhập vai HĐ4.
   *  Chia theo SỐ THÀNH VIÊN thật của nhóm: nhóm 3 bạn chỉ cần 3 vai. */
  function vaiCanThiet() {
    if (S.mode === "canhan") return 2;
    const n = S.thanhvien.filter(x => x.trim()).length;
    if (!n) return 5;                                  // chưa điền thành viên → yêu cầu đủ 5
    return Math.max(2, Math.min(5, n));
  }

  function checkHd4() {
    const H = DATA.hd4;
    const filled = H.vai.filter(v => (S.hd4.yKien[v.id] || "").trim().length > 2).length;
    const xong = H.deXuat.filter(d => vanDeXong(d.id)).length;
    const hasSlogan = S.hd4.slogan.trim().length > 4;
    const can = vaiCanThiet();
    S.checked.hd4 = { filled, xong, hasSlogan };

    // đánh dấu từng dòng vấn đề: đã xử lí hay còn thiếu
    $$("#hd4Table .vd-row").forEach(r => {
      r.classList.toggle("missing", !vanDeXong(r.dataset.vd));
    });

    const tenVai = id => (H.vai.find(v => v.id === id) || {}).ten || id;
    const dong = H.deXuat.map(d =>
      `<b>Vấn đề ${d.id} — ${esc(d.ten)}</b>${vanDeXong(d.id) ? " ✔" : " <i>(nhóm em chưa ghi đủ)</i>"}<br>
       <span class="fb-no">KHÔNG nên:</span> ${esc(d.khongNen)}<br>
       <span class="fb-yes">NÊN:</span> ${esc(d.nen)}<br>
       <span class="fb-who">Vai thường lo vấn đề này: ${d.vaiLo.map(v => esc(tenVai(v))).join(", ")}</span>`);

    fbHtml("#fbHd4",
      xong === 5 && filled >= can && hasSlogan ? "good" : xong >= 3 ? "mid" : "bad",
      `Gợi ý đáp án — đã xử lí ${xong}/5 vấn đề, nêu ý kiến ${filled}/5 vai (cần ${can} vai)`,
      [
        ...dong,
        `<b>Khẩu quyết mẫu:</b> “Trước khi sử dụng hoặc chia sẻ, hãy hỏi: Ai tạo ra? Ai sở hữu? Có được phép? Có an toàn? Có trách nhiệm?”`
      ]);
    finish();
  }

  function fb(sel, ok, total, msg) {
    const cls = ok === total ? "good" : ok >= total / 2 ? "mid" : "bad";
    fbHtml(sel, cls, `Đúng ${ok}/${total} tình huống`, [esc(msg)]);
  }

  function fbHtml(sel, cls, title, lines) {
    const el = $(sel);
    el.className = "feedback " + cls;
    el.innerHTML = `<h4>${title}</h4><ul>${lines.map(l => `<li>${l}</li>`).join("")}</ul>`;
    el.hidden = false;
    VOICE.apply();
  }

  /* ---------------- ĐIỂM (thang 10 theo phụ lục KHBD) ---------------- */
  function computeScore() {
    // 1) Nhận diện tín hiệu nguy hiểm (HĐ1 + HĐ5) — tối đa 3đ
    const hd1ok = DATA.hd1.items.filter(it => S.hd1[it.id] === it.dap).length;
    const hd5ok = S.hd5.done ? S.hd5.score : 0;
    const tong = hd1ok + hd5ok;                       // /11
    let p1 = tong >= 9 ? 3 : tong >= 6 ? 2 : tong >= 3 ? 1 : 0;

    // 2) Phân tích hồ sơ vụ án số (HĐ2) — tối đa 3đ
    const hit  = DATA.hd2.dauHieu.filter(d => d.do && S.hd2.flags.includes(d.id)).length;
    const miss = DATA.hd2.dauHieu.filter(d => !d.do && S.hd2.flags.includes(d.id)).length;
    const decOk = DATA.hd2.quyetDinh.find(q => q.id === S.hd2.dec)?.dung === true;
    const wDone = S.hd2.w.filter(x => x.trim().length > 2).length;
    let p2 = Math.max(0, hit * 0.3 - miss * 0.3) + (decOk ? 1 : 0) + (wDone / 3) * 0.5;
    p2 = Math.min(3, p2);

    // 3) Phân loại quyền sử dụng (HĐ3) — tối đa 2đ
    const hd3ok = DATA.hd3.items.filter(it => S.hd3[it.id] === it.dap || (it.dapPhu && S.hd3[it.id] === it.dapPhu)).length;
    const trapOk = DATA.hd3.bay.luaChon.find(c => c.id === S.hd3trap)?.dung === true;
    let p3 = (hd3ok / 5) * 1.5 + (trapOk ? 0.5 : 0);

    // 4) Hợp tác, nhập vai, trình bày (HĐ4) — tối đa 2đ
    // Số vai cần nêu ý kiến tính theo số thành viên thật của nhóm (cá nhân: 2 vai).
    const filled = DATA.hd4.vai.filter(v => (S.hd4.yKien[v.id] || "").trim().length > 2).length;
    const canVai = vaiCanThiet();
    const vdXong = DATA.hd4.deXuat.filter(d => vanDeXong(d.id)).length;
    let p4 = Math.min(1, filled / canVai) * 0.75          // ý kiến theo vai
           + (vdXong / DATA.hd4.deXuat.length) * 0.75      // xử lí đủ 5 vấn đề
           + (S.hd4.slogan.trim().length > 4 ? 0.5 : 0);   // khẩu quyết
    p4 = Math.min(2, p4);

    const r = n => Math.round(n * 4) / 4;   // làm tròn 0,25đ
    const parts = { p1: r(p1), p2: r(p2), p3: r(p3), p4: r(p4) };
    parts.total = r(parts.p1 + parts.p2 + parts.p3 + parts.p4);
    parts.detail = { hd1ok, hd5ok, hit, miss, decOk, wDone, hd3ok, trapOk, filled, canVai, vdXong };
    return parts;
  }

  function updateScore() {
    const s = computeScore();
    $("#scoreChip").innerHTML = `${s.total}<small>/10</small>`;
    $("#resScore").textContent = s.total;
    $("#resRubric").innerHTML = [
      ["Nhận diện tín hiệu nguy hiểm (HĐ1 + HĐ5)", s.p1, 3, `đúng ${s.detail.hd1ok}/6 tín hiệu · ${s.detail.hd5ok}/5 thử thách 5 giây`],
      ["Phân tích hồ sơ vụ án số (HĐ2)", s.p2, 3, `${s.detail.hit}/5 dấu hiệu đỏ · quyết định ${s.detail.decOk ? "đúng" : "chưa đúng"} · ${s.detail.wDone}/3 việc làm`],
      ["Phân loại quyền sử dụng sản phẩm số (HĐ3)", s.p3, 2, `đúng ${s.detail.hd3ok}/5 · câu bẫy ${s.detail.trapOk ? "đúng" : "chưa đúng"}`],
      ["Hợp tác, nhập vai và trình bày (HĐ4)", s.p4, 2,
        `${s.detail.vdXong}/5 vấn đề đã xử lí · ${s.detail.filled}/5 vai nêu ý kiến (cần ${s.detail.canVai} vai)`]
    ].map(([t, p, m, d]) => `<li><span style="flex:1"><b>${t}</b><br><small style="color:var(--txt-dim)">${d}</small></span><span>${p}/${m}</span></li>`).join("");
    $("#q5recall").innerHTML = DATA.cauHoiDieuTra.map(q => `<b>${esc(q)}</b>`).join("");
    return s;
  }
  function finish() { updateScore(); save(); }

  /* ---------------- ĐIỀU HƯỚNG SLIDE ---------------- */
  const steps = $$(".step");
  let cur = 0;

  function buildDots() {
    $("#dots").innerHTML = steps.map((s, i) =>
      `<button type="button" data-i="${i}" title="${esc(s.dataset.title)} · ${esc(s.dataset.time || "")}">${i}</button>`).join("");
    $$("#dots button").forEach(b => b.addEventListener("click", () => go(Number(b.dataset.i))));
  }

  function go(i) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    steps.forEach((s, k) => s.classList.toggle("active", k === cur));
    $$("#dots button").forEach((b, k) => {
      b.setAttribute("aria-current", String(k === cur));
      b.classList.toggle("done", k < cur);
    });
    $("#progressBar").style.width = ((cur) / (steps.length - 1) * 100) + "%";
    $("#navInfo").textContent = `${steps[cur].dataset.title} · ${steps[cur].dataset.time || ""}`;
    $("#btnPrev").disabled = cur === 0;
    $("#btnNext").disabled = cur === steps.length - 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
    try { localStorage.setItem("attt10a5.step", String(cur)); } catch (e) {}
    VOICE.apply();        // nội dung vừa dựng lại cũng phải đúng giọng văn
    if (window.DECOR) window.DECOR.relayout();
  }

  /* ---------------- NỘP BÀI ---------------- */
  function payload() {
    const s = updateScore();
    const nghe = DATA.ngheNghiep.find(n => n.id === S.nghe);
    const lbl3 = v => (DATA.hd3.nhan.find(n => n.v === v) || {}).ten || "";
    const lbl1 = v => (DATA.hd1.nhan.find(n => n.v === v) || {}).ten || "";
    const lbl5 = v => (DATA.hd5.the.find(t => t.v === v) || {}).ten || v || "";

    return {
      bai: CONFIG.BAI,
      thoiGian: new Date().toISOString(),
      cheDo: S.mode === "canhan" ? "Cá nhân" : "Nhóm",
      hoTen: S.info.hoten,
      lop: S.info.lop,
      nhom: S.mode === "canhan" ? "(làm cá nhân)" : S.info.nhom,
      danhHieu: S.info.danhhieu,
      soThanhVien: S.mode === "canhan" ? 1 : S.thanhvien.filter(x => x.trim()).length,
      thanhVien: S.mode === "canhan" ? S.info.hoten : membersText(),
      ngheNhapVai: nghe ? nghe.ten : "",
      hd1_phanLoai: DATA.hd1.items.map((it, i) => `Câu ${i + 1}: ${lbl1(S.hd1[it.id]) || "—"}`).join(" | "),
      hd1_soDung: s.detail.hd1ok + "/6",
      hd1_nguyHiemNhat: S.hd1worst ? "Câu " + S.hd1worst : "",
      hd1_viSao: S.hd1why,
      hd2_dauHieuChon: S.hd2.flags.map(id => (DATA.hd2.dauHieu.find(d => d.id === id) || {}).text).join(" | "),
      hd2_dauHieuDung: s.detail.hit + "/5",
      hd2_quyetDinh: (DATA.hd2.quyetDinh.find(q => q.id === S.hd2.dec) || {}).text || "",
      hd2_quyetDinhDung: s.detail.decOk ? "Đúng" : "Chưa đúng",
      hd2_baViecLam: S.hd2.w.filter(Boolean).join(" | "),
      hd3_phanLoai: DATA.hd3.items.map((it, i) => `Câu ${i + 1} (SP ${it.id}): ${lbl3(S.hd3[it.id]) || "—"}`).join(" | "),
      hd3_soDung: s.detail.hd3ok + "/5",
      hd3_cauBay: s.detail.trapOk ? "Đúng" : "Chưa đúng",
      hd4_yKienTheoVai: DATA.hd4.vai.map(v =>
        `${v.ten} (lo vấn đề ${S.hd4.loNhat[v.id] || "—"}): ${S.hd4.yKien[v.id] || "—"}`).join(" | "),
      hd4_soVanDeXuLy: s.detail.vdXong + "/5",
      hd4_giaiPhap: DATA.hd4.deXuat.map(d => {
        const g = S.hd4.giaiPhap[d.id] || {};
        return `VĐ${d.id} ${d.ten} → KHÔNG: ${g.khong || "—"} / NÊN: ${g.nen || "—"}`;
      }).join(" | "),
      hd4_khauQuyet: S.hd4.slogan,
      hd5_traLoi: DATA.hd5.items.map(it => `Câu ${it.id}: ${lbl5(S.hd5.answers[it.id])}`).join(" | "),
      hd5_diem: (S.hd5.done ? S.hd5.score : 0) + "/5",
      hd6_soViecCamKet: DATA.hd6.raSoat.filter(r => S.hd6.raSoat[r.id]).length + "/5",
      hd6_vieCamKet: DATA.hd6.raSoat.filter(r => S.hd6.raSoat[r.id])
        .map((r, i) => `${i + 1}) ${r.text}`).join(" | "),
      hd6_nguoiThan: S.hd6.quanhe,
      hd6_hinhThucLuaDao: S.hd6.hinhthuc,
      hd6_tinCanhBao: S.hd6.tin,
      hd6_nhoNhat: S.info.nhonhat,
      diem_HD1_HD5: s.p1,
      diem_HD2: s.p2,
      diem_HD3: s.p3,
      diem_HD4: s.p4,
      diem_TONG: s.total
    };
  }

  async function submit() {
    const btn = $("#btnSubmit"), note = $("#submitNote");
    const thieu = [];
    if (!S.info.hoten.trim()) thieu.push("<b>Họ và tên</b>");
    if (S.mode === "nhom" && !S.info.nhom.trim()) thieu.push("<b>Nhóm số</b>");
    if (thieu.length) {
      note.innerHTML = "⚠️ Chưa điền " + thieu.join(" và ") +
        " ở <b>Hoạt động 1 · bước 2</b> (trang Mở đầu). Trang web vừa chuyển em về đó.";
      go(0);
      setTimeout(() => $("#fHoTen").focus(), 400);
      return;
    }
    const data = payload();

    if (!CONFIG.GAS_URL) {
      note.innerHTML = "⚠️ Chưa cấu hình link Google Apps Script trong <b>js/config.js</b>. Bài làm đã lưu tại máy, chưa gửi được về giáo viên.";
      console.log("Payload (chưa gửi):", data);
      go(7); return;
    }

    btn.disabled = true; btn.textContent = "⏳ Đang gửi…";
    note.textContent = "Đang gửi bài về bảng tổng hợp của giáo viên…";
    try {
      const res = await fetch(CONFIG.GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },  // tránh preflight CORS
        body: JSON.stringify(data),
        redirect: "follow"
      });
      const txt = await res.text();
      if (!res.ok || txt.indexOf("error") > -1 && txt.indexOf("\"ok\"") === -1) throw new Error(txt.slice(0, 120));
      S.submitted = true; save();
      btn.textContent = "✅ ĐÃ NỘP BÀI";
      note.innerHTML = "🎉 Nộp bài thành công! Nhóm em xem điểm ở slide <b>Tổng kết</b>.";
      go(7);
    } catch (err) {
      // Dự phòng: gửi lại kiểu no-cors (không đọc được phản hồi nhưng dữ liệu vẫn tới Sheet)
      try {
        await fetch(CONFIG.GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify(data) });
        S.submitted = true; save();
        btn.textContent = "✅ ĐÃ NỘP BÀI";
        note.innerHTML = "🎉 Đã gửi bài (chế độ dự phòng). Nhóm em xem điểm ở slide <b>Tổng kết</b>.";
        go(7);
      } catch (e2) {
        btn.disabled = false; btn.textContent = "📤 NỘP BÀI CHO GIÁO VIÊN";
        note.innerHTML = "❌ Gửi thất bại: " + esc(String(err.message || err)) +
          ". Kiểm tra lại link Apps Script hoặc kết nối mạng. Bài làm vẫn được lưu tại máy.";
      }
    }
  }

  /* ---------------- BOOT ---------------- */
  function init() {
    load();
    buildIntro(); buildHd1(); buildHd2(); buildHd3(); buildHd4(); buildHd5(); buildHd6();
    syncRoles(); buildDots();

    $$("[data-check]").forEach(b => b.addEventListener("click", () => {
      ({ hd1: checkHd1, hd2: checkHd2, hd3: checkHd3, hd4: checkHd4 })[b.dataset.check]();
    }));
    $("#btnPrev").addEventListener("click", () => go(cur - 1));
    $("#btnNext").addEventListener("click", () => go(cur + 1));
    $("#btnSubmit").addEventListener("click", submit);
    $("#btnPrint").addEventListener("click", () => window.print());

    document.addEventListener("keydown", e => {
      if (document.querySelector('#imageViewer[open]')) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (document.body.classList.contains("decor-on")) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") go(cur + 1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") go(cur - 1);
    });

    applyMode();          // đặt nhãn + giọng văn theo chế độ đã lưu (gọi sau khi dựng xong)

    let last = 0;
    try { last = Number(localStorage.getItem("attt10a5.step")) || 0; } catch (e) {}
    go(last);
    updateScore();
  }

  document.addEventListener("DOMContentLoaded", init);
  window.APP = { go: i => go(i), state: S };
})();
