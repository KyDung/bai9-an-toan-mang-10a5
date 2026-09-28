/* Local illustrations and accessible image viewer. No network requests required. */
const LESSON_VISUALS = (() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const scene = (name, alt, caption) => ({base: `assets/scenarios/${name}`, alt, caption});
  const hd1 = [
    scene('free-gallery', 'Website quảng cáo tải ảnh miễn phí; mục tác giả và giấy phép để trống.', 'Kho ảnh tải miễn phí'),
    scene('teacher-transfer', 'Tài khoản tên Cô chủ nhiệm yêu cầu học sinh chuyển tiền gấp.', 'Tin nhắn từ tài khoản giáo viên'),
    scene('copy-article', 'Một bài viết trên website được sao chép sang sản phẩm của nhóm.', 'Bài gốc và sản phẩm nhóm'),
    scene('recruiter-otp', 'Người tuyển dụng yêu cầu gửi mã OTP để xác nhận hồ sơ.', 'Yêu cầu xác nhận hồ sơ'),
    scene('photo-permission', 'Bạn cùng lớp đồng ý cho dùng ảnh trong poster của nhóm.', 'Trao đổi về ảnh poster'),
    scene('app-permission', 'Ứng dụng chỉnh sửa ảnh xin quyền truy cập danh bạ, tin nhắn SMS và ảnh trên máy.', 'Màn hình xin cấp quyền')
  ];
  const hd3 = [
    scene('unknown-photo', 'Ảnh phong cảnh trên Internet không có thông tin tác giả, nguồn và giấy phép.', 'Ảnh trên Internet'),
    scene('licensed-photo', 'Ảnh của tác giả giả định Minh Anh kèm CC BY 4.0 và điều kiện ghi công.', 'Ảnh kèm giấy phép'),
    scene('repost-article', 'Bản nháp trên fanpage chứa toàn bộ bài viết từ một website khác.', 'Bài đăng trên fanpage'),
    scene('code-license', 'Đoạn mã đã được sao chép; tệp LICENSE của dự án chưa được đọc.', 'Mã nguồn lấy từ GitHub'),
    scene('classmate-video', 'Video do bạn cùng lớp tự quay và đăng; nhóm muốn cắt vào clip của mình.', 'Video của bạn cùng lớp')
  ];
  const hd5 = [
    scene('job-deposit', 'Tin tuyển dụng yêu cầu chuyển 200.000 đồng trước khi nhận việc.', 'Phí nhận việc'),
    hd3[0],
    scene('friend-otp', 'Bạn gửi mã OTP và nhờ đăng nhập hộ tài khoản.', 'Bạn nhờ đăng nhập hộ'),
    scene('credited-photo', 'Ảnh có giấy phép cho phép sử dụng và dòng ghi tên tác giả, giấy phép, nguồn.', 'Ảnh trong sản phẩm nhóm'),
    scene('lookalike-teacher', 'Tài khoản có tên và ảnh giống giáo viên nhắn tin nhờ chuyển tiền.', 'Tài khoản có tên quen thuộc')
  ];
  DATA.hd1.items.forEach((it, i) => it.visual = hd1[i]);
  DATA.hd3.items.forEach((it, i) => it.visual = hd3[i]);
  DATA.hd5.items.forEach((it, i) => it.visual = hd5[i]);

  function figure(v, classes = '', eager = false) {
    const attrs = window.IMG_FALLBACK.attrs(v.base);
    return `<figure class="lesson-figure ${classes}"><button type="button" class="image-zoom" data-zoom-base="${esc(v.base)}" data-zoom-alt="${esc(v.alt)}" data-zoom-caption="${esc(v.caption)}" aria-label="Phóng to: ${esc(v.caption)}"><img ${attrs} alt="${esc(v.alt)}" width="720" height="410" loading="${eager ? 'eager' : 'lazy'}" decoding="async"><span class="zoom-hint" aria-hidden="true">⤢ Phóng to</span></button><figcaption>${esc(v.caption)}</figcaption></figure>`;
  }
  const art = {
    intro: {base:'assets/illustrations/digital-detectives',alt:'Ba học sinh cùng điều tra nguồn ảnh, tin nhắn và tài khoản trên máy tính.',caption:'Quan sát · đặt câu hỏi · kiểm chứng'},
    an: {base:'assets/illustrations/an-recruitment',alt:'Bạn An ngồi ở bàn học, suy nghĩ khi đọc tin tuyển dụng trên điện thoại.',caption:'Nếu là An, em sẽ làm gì tiếp theo?'},
    team: {base:'assets/illustrations/team-website',alt:'Năm học sinh cùng thiết kế website, chuẩn bị ảnh, bài viết và video.',caption:'Một sản phẩm chung, nhiều góc nhìn'}
  };

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('#s0 .hero');
    const heroCopy = document.createElement('div');
    while (hero.firstChild) heroCopy.appendChild(hero.firstChild);
    hero.appendChild(heroCopy);
    hero.insertAdjacentHTML('beforeend', figure(art.intro, 'story-art', true));
    hero.classList.add('visual-hero');

    const phone = document.querySelector('#s2 .phone');
    const caseGrid = document.createElement('div');
    caseGrid.className = 'case-visual-grid';
    phone.before(caseGrid);
    caseGrid.innerHTML = figure(art.an, 'story-art');
    caseGrid.appendChild(phone);
    document.querySelector('#s2 .phone-top').insertAdjacentHTML('beforeend', '<small class="simulation-label">Tin nhắn mô phỏng</small>');

    const situ = document.querySelector('#s4 .situ');
    const teamGrid = document.createElement('div');
    teamGrid.className = 'team-visual-grid';
    situ.before(teamGrid);
    teamGrid.innerHTML = figure(art.team, 'story-art');
    teamGrid.appendChild(situ);

    document.querySelector('#hd5Start').insertAdjacentHTML('afterbegin', `<img class="challenge-art" ${window.IMG_FALLBACK.attrs('assets/roles/pause')} alt="Đồng hồ bấm giờ" width="100" height="100" loading="lazy">`);
    document.querySelector('#hd5Txt').insertAdjacentHTML('beforebegin', '<div class="game-visual"><img id="hd5Image" width="720" height="410" alt="" decoding="sync"></div>');
    // Các ảnh này được nạp trước để không bị giật khi thử thách 5 giây bắt đầu.
    hd5.forEach(v => { window.IMG_FALLBACK.set(new Image(), v.base); });

    const credits = `<details class="asset-credits"><summary>Nguồn ảnh &amp; minh họa</summary><p>Ảnh nhân vật: tạo bằng AI cho bài học này. Hình tin nhắn, website và sản phẩm số: minh họa gốc của dự án; tên, nội dung và giao diện chỉ là mô phỏng dùng để học tập.</p><p>Biểu tượng: <a href="https://openmoji.org/" target="_blank" rel="noopener noreferrer">OpenMoji</a> — <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>, không sửa đổi. Thông tin đầy đủ trong <a href="assets/NGUON-ANH.md" target="_blank" rel="noopener noreferrer">danh mục nguồn ảnh</a>.</p></details>`;
    document.querySelector('#s7 .result-card').insertAdjacentHTML('afterend', credits);
    document.querySelector('#s1 .legend').insertAdjacentHTML('beforebegin', '<p class="visual-instruction">Quan sát hình và đọc tình huống trước khi phân loại. Bấm vào hình để phóng to.</p>');
    document.querySelector('#s3 .legend').insertAdjacentHTML('beforebegin', '<p class="visual-instruction">Quan sát thông tin tác giả, nguồn và giấy phép trong từng hình mô phỏng.</p>');

    document.body.insertAdjacentHTML('beforeend', `<dialog id="imageViewer" class="image-viewer" aria-labelledby="imageViewerTitle"><div class="viewer-toolbar"><h2 id="imageViewerTitle">Hình minh họa</h2><button type="button" class="viewer-close" aria-label="Đóng ảnh phóng to">Đóng ✕</button></div><img id="imageViewerImg" alt=""><p id="imageViewerCaption"></p></dialog>`);
    const viewer = document.querySelector('#imageViewer');
    let trigger;
    document.addEventListener('click', e => {
      const button = e.target.closest('[data-zoom-base]');
      if (!button) return;
      trigger = button;
      document.querySelector('#imageViewerTitle').textContent = button.dataset.zoomCaption;
      window.IMG_FALLBACK.set(document.querySelector('#imageViewerImg'), button.dataset.zoomBase);
      document.querySelector('#imageViewerImg').alt = button.dataset.zoomAlt;
      document.querySelector('#imageViewerCaption').textContent = button.dataset.zoomAlt;
      viewer.showModal();
    });
    viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
    viewer.addEventListener('close', () => trigger?.focus({preventScroll:true}));
  });
  return { figure };
})();
