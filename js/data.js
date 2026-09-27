/* =========================================================
   DỮ LIỆU BÀI HỌC — Bài 9: An toàn trên không gian mạng
   Tin học 10 · 1 tiết (45 phút)
   Muốn sửa câu hỏi / đáp án: sửa ngay trong file này.
   ========================================================= */

const DATA = {
  meta: {
    truong: "Trường THPT ……………………",
    lop: "10A5",
    bai: "BÀI 9: AN TOÀN TRÊN KHÔNG GIAN MẠNG",
    thoiluong: "01 tiết – 45 phút",
    khauhieu: "Suy nghĩ đúng – Hành động đúng – An toàn số",
  },

  /* 5 câu hỏi điều tra (Phần A của phiếu học tập) */
  cauHoiDieuTra: [
    "Ai tạo ra nó?",
    "Ai sở hữu nó?",
    "Mình có được phép sử dụng không?",
    "Có an toàn để chia sẻ không?",
    "Chia sẻ thế nào là có trách nhiệm?",
  ],

  /* Phần B – 6 thẻ nghề nghiệp số
     ongKinh  = câu hỏi nghề này LUÔN tự hỏi, hiện ở đầu mỗi hoạt động
     vaiHd4   = vai tương ứng ở HĐ4 (để trang web gợi ý HS nhận vai đó)
     coVan    = true → ở HĐ3 nhóm này làm cố vấn cho cả lớp (theo KHBD) */
  ngheNghiep: [
    {
      id: "attt",
      icon: "🛡️",
      ten: "Chuyên viên An toàn thông tin",
      vaiHd4: "attt",
      quanTam: "Bảo vệ tài khoản, mật khẩu, OTP, dữ liệu cá nhân.",
      ongKinh:
        "Thông tin này có làm lộ tài khoản, mật khẩu, OTP hay dữ liệu cá nhân của ai không?",
    },
    {
      id: "phapche",
      icon: "⚖️",
      ten: "Chuyên viên Pháp chế",
      vaiHd4: "phapche",
      coVan: true,
      quanTam: "Bản quyền, sở hữu trí tuệ, tuân thủ pháp luật.",
      ongKinh:
        "Việc này có đúng luật không? Ai là chủ sở hữu và mình đã được phép chưa?",
    },
    {
      id: "truyenthong",
      icon: "📣",
      ten: "Chuyên viên Truyền thông",
      vaiHd4: "tt",
      quanTam: "Thông tin chính xác, nguồn uy tín, giữ uy tín tổ chức.",
      ongKinh:
        "Thông tin này có chính xác và đến từ nguồn uy tín không? Lan ra thì ảnh hưởng uy tín ai?",
    },
    {
      id: "coder",
      icon: "💻",
      ten: "Lập trình viên",
      vaiHd4: "coder",
      quanTam: "Giấy phép mã nguồn, website an toàn, không mã độc.",
      ongKinh:
        "Đường link, tệp tải về, đoạn mã này có an toàn và có giấy phép rõ ràng không?",
    },
    {
      id: "hr",
      icon: "🧑‍💼",
      ten: "Chuyên viên Tuyển dụng (HR)",
      vaiHd4: "tt",
      quanTam: "Nhận diện tin tuyển dụng giả mạo, bảo vệ ứng viên.",
      ongKinh:
        "Lời mời này có thật không? Doanh nghiệp thật có bao giờ đòi tiền hay OTP của ứng viên không?",
    },
    {
      id: "creator",
      icon: "🎨",
      ten: "Nhà sáng tạo nội dung số",
      vaiHd4: "design",
      coVan: true,
      quanTam: "Tự tạo nội dung, ghi nguồn, tôn trọng tác giả khác.",
      ongKinh:
        "Nếu đây là sản phẩm của mình bị người khác lấy dùng thì mình có thấy công bằng không?",
    },
  ],

  /* HĐ1 – 6 tín hiệu: 1 An toàn · 2 Cảnh giác · 3 Dừng lại */
  hd1: {
    nhiemVu: [
      {
        b: 1,
        ten: "Phân loại 6 tình huống",
        phut: "4 phút",
        mo: "Đọc từng tình huống và hình minh họa, chọn 1 trong 3 mức: An toàn, Cảnh giác hoặc Dừng lại.",
      },
      {
        b: 2,
        ten: "Chọn tình huống nguy hiểm nhất",
        phut: "1 phút",
        mo: "Chọn 1 tình huống nguy hiểm nhất và viết lí do trong đúng một câu.",
      },
      {
        b: 3,
        ten: "Kiểm tra đáp án",
        phut: "1 phút",
        mo: "Bấm nút kiểm tra, đọc giải thích của những câu chưa đúng rồi sửa lại.",
      },
    ],
    nhan: [
      { v: 1, ten: "An toàn", mau: "green", icon: "🟢" },
      { v: 2, ten: "Cảnh giác", mau: "yellow", icon: "🟡" },
      { v: 3, ten: "Dừng lại", mau: "red", icon: "🔴" },
    ],
    items: [
      {
        id: 1,
        text: "Một website cho tải miễn phí hàng nghìn ảnh nhưng không ghi rõ giấy phép sử dụng.",
        dap: 2,
        giai: "Chưa rõ tác giả và giấy phép, trang web còn có thể chứa mã độc.",
      },
      {
        id: 2,
        text: "Người tự xưng là giáo viên nhắn tin yêu cầu chuyển tiền gấp.",
        dap: 3,
        giai: "Đây là thủ đoạn giả danh người quen, thúc ép chuyển tiền.",
      },
      {
        id: 3,
        text: "Tìm thấy một bài viết rất hay và muốn chép toàn bộ vào sản phẩm của nhóm.",
        dap: 2,
        giai: "Cần xin phép, trích dẫn và ghi nguồn đầy đủ.",
      },
      {
        id: 4,
        text: "Nhà tuyển dụng online yêu cầu gửi mã OTP để “xác nhận hồ sơ”.",
        dap: 3,
        giai: "OTP là chìa khoá tài khoản — không bao giờ cung cấp cho ai.",
      },
      {
        id: 5,
        text: "Bạn của em đồng ý cho em dùng ảnh của bạn ấy trong poster.",
        dap: 1,
        giai: "Đã có sự đồng ý của chủ sở hữu.",
      },
      {
        id: 6,
        text: "Nhóm lấy một đoạn mã trên GitHub nhưng chưa đọc điều kiện giấy phép.",
        dap: 2,
        giai: "Phải đọc giấy phép (license) trước khi dùng.",
      },
    ],
  },

  /* HĐ2 – Hồ sơ vụ án số: “Việc nhẹ lương cao” */
  hd2: {
    nhiemVu: [
      {
        b: 1,
        ten: "Đọc hồ sơ vụ án",
        phut: "1 phút",
        mo: "Đọc kĩ tin nhắn bạn An nhận được, để ý những chỗ khiến em thấy bất thường.",
      },
      {
        b: 2,
        ten: "Săn dấu hiệu đỏ",
        phut: "3 phút",
        mo: "Trong 8 phương án, tick đúng 5 phương án là dấu hiệu đáng ngờ thật.",
      },
      {
        b: 3,
        ten: "Ra quyết định",
        phut: "1 phút",
        mo: "Chọn 1 cách xử lí mà em cho là đúng nếu em là bạn An.",
      },
      {
        b: 4,
        ten: "Ba việc làm theo vai nghề",
        phut: "3 phút",
        mo: "Viết 3 việc đúng theo nghề em đã nhập vai ở Hoạt động 1, theo thứ tự làm trước – làm sau.",
      },
      {
        b: 5,
        ten: "Kiểm tra đáp án",
        phut: "2 phút",
        mo: "Bấm nút kiểm tra và đối chiếu với quy tắc “3 KHÔNG”.",
      },
    ],
    tinNhan: [
      "🔔 TUYỂN CTV NHẬP DỮ LIỆU ONLINE",
      "Thu nhập 500.000 – 1.000.000đ/NGÀY, không cần kinh nghiệm!",
      "Làm tại nhà, 2–3 giờ/ngày. SỐ LƯỢNG CÓ HẠN — ĐĂNG KÍ NGAY!",
      "👉 Đăng kí tại: vieclam-2026.top",
      "(Sau khi đăng kí) Bạn chuyển 300.000đ phí kích hoạt tài khoản và gửi họ tên, số CCCD, số tài khoản ngân hàng, mã OTP để hoàn tất hồ sơ nhé!",
    ],
    /* Bước 1 – chọn đúng 5 dấu hiệu đỏ trong 8 phương án */
    dauHieu: [
      {
        id: "a",
        text: "Thu nhập cao bất thường, không cần kinh nghiệm.",
        do: true,
      },
      { id: "b", text: "Thúc ép “số lượng có hạn, đăng kí ngay”.", do: true },
      {
        id: "c",
        text: "Đường link tên miền lạ, không phải trang chính thức của doanh nghiệp.",
        do: true,
      },
      {
        id: "d",
        text: "Bắt chuyển tiền trước (phí kích hoạt, phí giữ chỗ).",
        do: true,
      },
      {
        id: "e",
        text: "Đòi số CCCD, số tài khoản ngân hàng và mã OTP.",
        do: true,
      },
      { id: "f", text: "Công việc là nhập dữ liệu trên máy tính.", do: false },
      { id: "g", text: "Tin nhắn được gửi vào buổi tối.", do: false },
      { id: "h", text: "Tin nhắn có sử dụng biểu tượng cảm xúc.", do: false },
    ],
    /* Bước 2 – quyết định */
    quyetDinh: [
      {
        id: "q1",
        text: "Đăng kí ngay cho kịp “số lượng có hạn”.",
        dung: false,
      },
      {
        id: "q2",
        text: "Chuyển 300.000đ để thử xem có thật không.",
        dung: false,
      },
      {
        id: "q3",
        text: "Không cung cấp thông tin, dừng lại; xác minh doanh nghiệp qua kênh chính thức; báo cho bố mẹ, thầy cô.",
        dung: true,
      },
      {
        id: "q4",
        text: "Gửi CCCD trước, giữ lại OTP để an toàn hơn.",
        dung: false,
      },
    ],
    goiY3Viec: [
      "Chặn người gửi, không bấm vào đường link.",
      "Chụp màn hình làm bằng chứng, báo cáo nền tảng và gửi cảnh báo tại canhbao.khonggianmang.gov.vn.",
      "Cảnh báo bạn bè, người thân. Nếu đã lỡ cung cấp thông tin: đổi mật khẩu, gọi ngân hàng khoá tài khoản.",
    ],
  },

  /* HĐ3 – “Có được phép không?” */
  hd3: {
    nhiemVu: [
      {
        b: 1,
        ten: "Phân loại 5 sản phẩm số",
        phut: "7 phút",
        mo: "Với mỗi sản phẩm, tìm trong hình xem ai là tác giả, có giấy phép hay chưa, rồi chọn 1 trong 3 mức.",
      },
      {
        b: 2,
        ten: "Trả lời câu hỏi bẫy",
        phut: "2 phút",
        mo: "Chọn 1 phương án và nhớ lí do vì sao phương án đó đúng.",
      },
      {
        b: 3,
        ten: "Kiểm tra đáp án",
        phut: "2 phút",
        mo: "Bấm nút kiểm tra, ghi lại quy trình 4 bước cần làm trước khi dùng tư liệu của người khác.",
      },
    ],
    nhan: [
      {
        v: 1,
        ten: "Có thể sử dụng sau khi kiểm tra điều kiện",
        mau: "green",
        icon: "🟢",
      },
      { v: 2, ten: "Cần xin phép hoặc xác minh", mau: "yellow", icon: "🟡" },
      { v: 3, ten: "Không nên tự ý sử dụng", mau: "red", icon: "🔴" },
    ],
    items: [
      {
        id: "A",
        text: "Ảnh tìm thấy trên Internet, không ghi tác giả, không ghi giấy phép.",
        dap: 3,
        giai: "Không xác định được chủ sở hữu → không nên tự ý dùng.",
      },
      {
        id: "B",
        text: "Hình ảnh do tác giả công bố kèm giấy phép cho phép sử dụng theo điều kiện.",
        dap: 1,
        giai: "Được dùng nếu tuân thủ điều kiện của giấy phép và ghi nguồn.",
      },
      {
        id: "C",
        text: "Bài viết trên website khác, nhóm em sao chép nguyên văn lên fanpage.",
        dap: 2,
        dapPhu: 3,
        giai: "Phải xin phép tác giả; chép nguyên văn khi chưa xin phép là vi phạm.",
      },
      {
        id: "D",
        text: "Đoạn mã nguồn lấy từ GitHub, nhóm chưa đọc giấy phép kèm theo.",
        dap: 2,
        giai: "Cần đọc giấy phép (MIT, GPL…) rồi mới quyết định cách dùng.",
      },
      {
        id: "E",
        text: "Video do bạn cùng lớp tự quay và đăng lên mạng, em muốn cắt một đoạn đưa vào clip của nhóm.",
        dap: 2,
        giai: "Bạn ấy là tác giả → cần xin phép và ghi tên bạn ấy.",
      },
    ],
    bay: {
      cauHoi:
        "“Đã có trên Internet” có nghĩa là “được phép sử dụng tự do” không?",
      luaChon: [
        {
          id: "b1",
          text: "Có. Đã công khai trên mạng thì ai cũng được dùng.",
          dung: false,
        },
        {
          id: "b2",
          text: "Không. Mọi tác phẩm đều có tác giả và được bảo hộ quyền tác giả, trừ khi tác giả cho phép hoặc tác phẩm thuộc phạm vi công cộng.",
          dung: true,
        },
        { id: "b3", text: "Có, miễn là không bán lấy tiền.", dung: false },
      ],
    },
  },

  /* HĐ4 – Một tình huống, nhiều góc nhìn */
  hd4: {
    /* Bối cảnh: kể chuyện để học sinh hình dung mình đang ở trong tình huống */
    boiCanh:
      "Trường tổ chức Ngày hội hướng nghiệp. Nhóm em được giao làm một website giới thiệu nghề nghiệp cho học sinh THPT, hạn nộp còn 3 ngày mà nhóm vẫn thiếu tư liệu.",
    /* 5 VẤN ĐỀ trong đề xuất của bạn — mỗi vấn đề là một dòng nhóm phải giải quyết.
       vaiLo   = những vai thường lo vấn đề này nhất (dùng để gợi ý và nhận xét)
       khongNen / nen = đáp án gợi ý riêng cho từng vấn đề */
    deXuatCuaBan:
      "Trong lúc gấp, một bạn đề xuất 5 việc sau cho nhanh. Mỗi việc là một VẤN ĐỀ nhóm em phải xử lí:",
    deXuat: [
      {
        id: 1,
        ic: "🖼️",
        ten: "Ảnh minh họa",
        noiDung:
          "Vào Google Hình ảnh, thấy ảnh nào đẹp thì tải về dùng, không cần xem nguồn.",
        vaiLo: ["design", "phapche"],
        khongNen: "Tải ảnh không rõ tác giả, không rõ giấy phép về dùng.",
        nen: "Tự chụp, tự thiết kế, hoặc dùng kho ảnh có giấy phép (Creative Commons) và ghi nguồn đầy đủ.",
      },
      {
        id: 2,
        ic: "📄",
        ten: "Bài giới thiệu nghề",
        noiDung:
          "Sao chép nguyên văn một bài viết từ website hướng nghiệp khác dán vào trang của nhóm.",
        vaiLo: ["tt", "phapche"],
        khongNen:
          "Chép nguyên văn bài của người khác, không xin phép, không ghi nguồn.",
        nen: "Tự viết bằng lời của nhóm; nếu cần dẫn lại thì trích một đoạn ngắn có ghi rõ nguồn và tác giả.",
      },
      {
        id: 3,
        ic: "🏛️",
        ten: "Logo trường đại học",
        noiDung: "Lấy logo của một trường đại học đặt lên trang cho “uy tín”.",
        vaiLo: ["phapche", "tt"],
        khongNen:
          "Dùng logo của tổ chức khác khi chưa được phép — người xem còn hiểu nhầm là trường đó bảo trợ cho web của nhóm.",
        nen: "Xin phép nhà trường; hoặc chỉ nêu tên trường như một thông tin và tự thiết kế hình ảnh riêng của nhóm.",
      },
      {
        id: 4,
        ic: "🎵",
        ten: "Nhạc nền cho video",
        noiDung: "Chèn một bài nhạc đang nổi trên mạng vào video giới thiệu.",
        vaiLo: ["phapche", "design"],
        khongNen:
          "Chèn nhạc đang có bản quyền vào video — video có thể bị chặn hoặc bị khiếu nại.",
        nen: "Dùng nhạc miễn phí bản quyền từ thư viện âm thanh có giấy phép, hoặc nhóm tự thu âm.",
      },
      {
        id: 5,
        ic: "🧩",
        ten: "Plugin lạ và form xin thông tin",
        noiDung:
          "Tải một plugin lạ từ trang chia sẻ cho web có hiệu ứng đẹp, và thêm một form xin số điện thoại, email của bạn xem web để “thống kê”.",
        vaiLo: ["coder", "attt"],
        khongNen:
          "Cài plugin không rõ nguồn và tự ý thu số điện thoại, email của người xem.",
        nen: "Chỉ dùng plugin có giấy phép rõ ràng, tải từ trang chính thức; không thu thập thông tin cá nhân người xem, nếu thật cần thì phải nói rõ mục đích và xin phép; đặt mật khẩu mạnh cho tài khoản quản trị web.",
      },
    ],
    cauHoiLon:
      "Nếu làm đúng 5 điều đó, nhóm em có thể gặp rắc rối gì? Với từng vấn đề, nhóm nên làm thế nào cho vừa nhanh, vừa hợp pháp, vừa an toàn?",
    /* Nhiệm vụ của nhóm — nói rõ từng bước, làm gì, trong bao lâu */
    nhiemVu: [
      {
        b: 1,
        ten: "Phân vai theo số bạn trong nhóm",
        phut: "1 phút",
        mo: "Nhóm có bao nhiêu bạn thì nhận bấy nhiêu vai (tối đa 5). Nhóm ít bạn thì một bạn có thể giữ 2 vai — trang web sẽ nói rõ nhóm em cần ít nhất mấy vai.",
      },
      {
        b: 2,
        ten: "Mỗi vai chọn vấn đề mình lo nhất",
        phut: "2 phút",
        mo: "Đọc 5 vấn đề bằng “con mắt” của vai mình, chọn vấn đề em lo nhất rồi ghi em đề nghị nhóm làm gì thay thế.",
      },
      {
        b: 3,
        ten: "Xử lí lần lượt cả 5 vấn đề",
        phut: "3 phút",
        mo: "Ở bảng bước 2, mỗi vấn đề ghi rõ KHÔNG nên làm gì và NÊN làm gì thay thế. Cuối cùng đặt một khẩu quyết thật ngắn.",
      },
    ],
    /* Ghi chú quan trọng cho học sinh: vai không chia theo tỉ lệ 1 vai = 1 vấn đề */
    luuYVai:
      "Không phải một vai chỉ lo một vấn đề. Một vấn đề có thể bị nhiều vai phản đối, và một vai có thể lo nhiều vấn đề — nhưng cả 5 vấn đề đều phải được nhóm xử lí ở bước 2.",
    vai: [
      {
        id: "design",
        ten: "Designer",
        vanDeGoiY: 1,
        dinhHuong:
          "Ảnh, logo, hình trong video này của ai? Nhóm có cách nào tự làm hình ảnh của mình không?",
        goiY: "Ảnh và logo đều có chủ sở hữu; nên tự thiết kế hoặc dùng kho ảnh có giấy phép.",
      },
      {
        id: "tt",
        ten: "Chuyên viên Truyền thông",
        vanDeGoiY: 2,
        dinhHuong:
          "Nội dung sao chép có chính xác, có nguồn uy tín không? Người xem có bị hiểu nhầm điều gì không?",
        goiY: "Thông tin phải chính xác, nguồn uy tín, không gây hiểu nhầm và không ảnh hưởng uy tín của tổ chức khác.",
      },
      {
        id: "phapche",
        ten: "Chuyên viên Pháp chế",
        vanDeGoiY: 3,
        dinhHuong:
          "Việc nào trong 5 vấn đề là vi phạm quyền tác giả, nhãn hiệu? Muốn dùng hợp pháp thì phải làm gì trước?",
        goiY: "Sao chép bài viết, dùng logo, dùng nhạc khi chưa xin phép đều là vi phạm quyền tác giả và quyền sở hữu trí tuệ.",
      },
      {
        id: "coder",
        ten: "Lập trình viên",
        vanDeGoiY: 5,
        dinhHuong:
          "Plugin, mã nguồn nhóm định dùng có giấy phép không? Tải từ đâu? Có nguy cơ chứa mã độc không?",
        goiY: "Mã nguồn, plugin phải có giấy phép rõ ràng và tải từ nguồn chính thức; website không chứa link, tệp độc hại.",
      },
      {
        id: "attt",
        ten: "Chuyên viên An toàn thông tin",
        vanDeGoiY: 5,
        dinhHuong:
          "Web có thu thập thông tin cá nhân của người xem không? Tài khoản quản trị web được bảo vệ thế nào?",
        goiY: "Không thu thập dữ liệu cá nhân người xem trái phép; bảo vệ tài khoản quản trị bằng mật khẩu mạnh và xác thực hai lớp.",
      },
    ],
  },

  /* HĐ5 – Thử thách 10 giây: mỗi câu có 10 giây để CHỌN đáp án đúng */
  hd5: {
    giay: 10, // số giây cho mỗi câu — đổi ở đây là đổi cả đồng hồ
    nhiemVu: [
      {
        b: 1,
        ten: "Bấm Bắt đầu",
        phut: "",
        mo: "Cả nhóm ngồi sẵn sàng rồi mới bấm, vì đồng hồ chạy ngay.",
      },
      {
        b: 2,
        ten: "Chọn đáp án trong 10 giây",
        phut: "2 phút",
        mo: "Mỗi tình huống trả lời câu “em nên làm gì?” bằng 1 trong 3 tín hiệu: AN TOÀN, CẢNH GIÁC hoặc DỪNG LẠI. Hết 10 giây chưa chọn thì mất điểm câu đó.",
      },
      {
        b: 3,
        ten: "Xem lại 5 câu",
        phut: "3 phút",
        mo: "Đọc bảng kết quả cuối, xem lại giải thích của những câu chọn sai.",
      },
    ],
    /* Câu hỏi chung cho cả 5 tình huống — hiện ngay trên 3 phương án
       để học sinh hiểu mình đang chọn cái gì. */
    cauHoi: "Gặp tình huống này, em nên làm gì?",
    /* Ba phương án dùng ĐÚNG ba mức của HĐ1 (An toàn – Cảnh giác – Dừng lại)
       để cả bài chỉ có một bộ tín hiệu, không sinh thêm khái niệm mới. */
    the: [
      {
        v: "xanh",
        ten: "AN TOÀN",
        moTa: "Cứ làm / dùng / chia sẻ được",
        mau: "green",
        icon: "🟢",
      },
      {
        v: "vang",
        ten: "CẢNH GIÁC",
        moTa: "Phải kiểm tra, xác minh trước",
        mau: "yellow",
        icon: "🟡",
      },
      {
        v: "do",
        ten: "DỪNG LẠI",
        moTa: "Không làm theo, báo người lớn",
        mau: "red",
        icon: "🔴",
      },
    ],
    items: [
      {
        id: 1,
        text: "Nhận tin nhắn tuyển dụng, yêu cầu chuyển 200.000đ để nhận việc.",
        dap: "do",
        giai: "Đòi tiền trước là dấu hiệu lừa đảo → DỪNG LẠI, không chuyển tiền.",
      },
      {
        id: 2,
        text: "Muốn dùng một bức ảnh trên Internet nhưng chưa biết tác giả.",
        dap: "vang",
        giai: "Chưa rõ tác giả và giấy phép → CẢNH GIÁC, phải kiểm tra trước khi dùng.",
      },
      {
        id: 3,
        text: "Bạn gửi mã OTP và nhờ em đăng nhập hộ tài khoản.",
        dap: "do",
        giai: "Không nhận, không dùng OTP của người khác → DỪNG LẠI.",
      },
      {
        id: 4,
        text: "Dùng hình ảnh được cung cấp kèm giấy phép cho phép, có ghi nguồn.",
        dap: "xanh",
        giai: "Có giấy phép cho phép và đã ghi nguồn → AN TOÀN, dùng và chia sẻ được.",
      },
      {
        id: 5,
        text: "Tài khoản giống tên giáo viên nhắn tin nhờ chuyển tiền.",
        dap: "do",
        giai: "DỪNG LẠI và xác minh lại qua một kênh liên lạc khác.",
      },
    ],
  },

  /* HĐ6 – Vận dụng: "CAM KẾT 3 NGÀY AN TOÀN SỐ"
     Làm xong và NỘP NGAY TẠI LỚP trong 3 phút: chọn việc sẽ làm, chọn người thân
     sẽ nhắc, và viết luôn tin nhắn cảnh báo. Ba ngày sau mới thực hiện ở nhà. */
  hd6: {
    ten: "Cam kết 3 ngày an toàn số",
    nhiemVu: [
      {
        b: 1,
        ten: "Chọn việc sẽ làm",
        phut: "1 phút",
        mo: "Tick những việc em cam kết làm trong 3 ngày tới.",
      },
      {
        b: 2,
        ten: "Chọn người sẽ nhắc",
        phut: "30 giây",
        mo: "Chọn một người thân và một hình thức lừa đảo em sẽ kể cho họ.",
      },
      {
        b: 3,
        ten: "Viết tin nhắn cảnh báo",
        phut: "1 phút 30",
        mo: "Viết ngay tại lớp 1–2 câu gửi vào nhóm chat gia đình. Đây là sản phẩm chính của hoạt động.",
      },
      {
        b: 4,
        ten: "Nộp bài",
        phut: "",
        mo: "Bấm NỘP BÀI ở cuối trang. Ba ngày sau em thực hiện đúng cam kết, tiết sau báo cáo 1 phút.",
      },
    ],
    gioiThieu:
      "Ngay tại lớp em chọn những việc mình cam kết làm, chọn người thân mình sẽ nhắc, và viết luôn tin nhắn cảnh báo — rồi nộp bài.",
    hanNop:
      "Ba ngày tới em thực hiện đúng những việc đã cam kết và gửi tin nhắn cảnh báo cho gia đình. Đầu tiết học sau, mỗi nhóm báo cáo 1 phút về việc đã làm được.",

    /* Bước 1 – chọn việc sẽ làm (cam kết, không phải đã làm) */
    camKetTieuDe: "Em cam kết sẽ làm những việc nào trong 3 ngày tới?",
    camKetMoTa:
      "Tick vào việc em thật sự sẽ làm. Chọn được cả 5 thì tốt, nhưng thà cam kết 3 việc rồi làm thật còn hơn tick cả 5 cho đẹp.",
    raSoat: [
      {
        id: "r1",
        ic: "🔑",
        text: "Đổi mật khẩu mạnh (từ 8 kí tự, có chữ hoa, chữ số, kí tự đặc biệt) cho tài khoản quan trọng nhất của em.",
      },
      {
        id: "r2",
        ic: "🔒",
        text: "Bật xác thực hai lớp (2FA) cho tài khoản đó.",
      },
      {
        id: "r3",
        ic: "📱",
        text: "Mở mục “thiết bị đang đăng nhập”, đăng xuất mọi thiết bị em không nhận ra.",
      },
      {
        id: "r4",
        ic: "🙈",
        text: "Kiểm tra quyền riêng tư: ai đang xem được số điện thoại, ngày sinh, ảnh của em — chỉnh lại cho chặt hơn.",
      },
      {
        id: "r5",
        ic: "©️",
        text: "Rà soát một sản phẩm số của em (bài đăng, clip, slide): ghi nguồn đầy đủ hoặc bỏ tư liệu chưa xin phép.",
      },
    ],

    /* Bước 2 – chọn người thân và hình thức lừa đảo sẽ kể */
    lanToa: {
      tieuDe: "Chọn người em sẽ nhắc",
      moTa: "Người bị lừa nhiều nhất thường là người lớn trong gia đình. Chọn một người em sẽ nói chuyện cùng và một hình thức lừa đảo em sẽ kể cho họ.",
      quanHe: [
        "Bố",
        "Mẹ",
        "Ông",
        "Bà",
        "Anh",
        "Chị",
        "Cô/Chú/Bác",
        "Người thân khác",
      ],
      hinhThuc: [
        "Tuyển dụng “việc nhẹ lương cao”, đòi phí kích hoạt",
        "Giả danh người quen (thầy cô, họ hàng) nhờ chuyển tiền gấp",
        "Đòi mã OTP để “xác nhận hồ sơ”, “nhận quà”",
        "Link lạ trúng thưởng, nhận quà miễn phí",
        "Giả danh công an, ngân hàng, nhân viên giao hàng",
      ],
    },

    /* Bước 3 – sản phẩm chính, viết ngay tại lớp */
    tinMoTa:
      "Viết 1–2 câu thật ngắn, dễ hiểu với người lớn, có nói rõ “đừng làm gì” và “hãy làm gì”. Đây là phần giáo viên chấm và cả lớp bình chọn.",

    khong: [
      "Không cung cấp mã OTP, mật khẩu cho bất kì ai.",
      "Không chuyển tiền cho người lạ hoặc công việc đòi “phí trước”.",
      "Không bấm vào đường link lạ, không tải tệp không rõ nguồn.",
      "Không sao chép, đăng lại sản phẩm của người khác khi chưa được phép.",
      "Không chia sẻ tin chưa kiểm chứng và thông tin cá nhân của người khác.",
    ],
    nen: [
      "Nên đặt mật khẩu mạnh, bật xác thực hai lớp.",
      "Nên xác minh thông tin qua kênh chính thức.",
      "Nên xin phép và ghi nguồn khi dùng sản phẩm của người khác.",
      "Nên báo bố mẹ, thầy cô khi gặp tình huống đáng ngờ.",
      "Nên dừng lại 10 giây suy nghĩ trước khi chia sẻ.",
    ],
  },
};
