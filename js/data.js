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

  /* 5 câu hỏi điều tra (Phần A của phiếu học tập) — dùng xuyên suốt cả bài */
  cauHoiDieuTra: [
    "Ai tạo ra nó?",
    "Ai sở hữu nó?",
    "Mình có được phép sử dụng không?",
    "Có an toàn để chia sẻ không?",
    "Chia sẻ thế nào là có trách nhiệm?",
  ],

  /* Bước 3 (Mở đầu) — TỰ ĐÁNH GIÁ NHANH, thay cho việc chọn nghề nghiệp.
     Đây là khởi động cá nhân, KHÔNG chấm điểm: học sinh tự soi lại thói quen
     của mình trước khi vào bài, câu trả lời được gửi kèm để giáo viên tham
     khảo (không ảnh hưởng điểm số). Cuối bài (HĐ6) học sinh sẽ cam kết hành
     động cụ thể — 2 mốc "trước" và "sau" này tạo thành một mạch xuyên suốt. */
  tuDanhGia: {
    tieuDe: "Tự đánh giá nhanh trước khi học",
    moTa:
      "Trả lời thật với chính mình, không có câu nào đúng hay sai. Phần này không chấm điểm, chỉ giúp em (và cả thầy/cô) biết em đang ở đâu trước khi học bài này.",
    mucDo: ["Đúng với em", "Không đúng", "Không chắc"],
    cauHoi: [
      {
        id: "d1",
        text: "Em đang dùng cùng một mật khẩu cho từ hai tài khoản mạng trở lên (Facebook, Gmail, TikTok…).",
      },
      {
        id: "d2",
        text: "Em từng nhận được tin nhắn hoặc cuộc gọi hứa hẹn tiền, quà tặng, hoặc việc làm dễ dàng một cách bất thường.",
      },
      {
        id: "d3",
        text: "Tài khoản mạng xã hội quan trọng nhất của em đã bật xác thực hai lớp (2FA).",
      },
      {
        id: "d4",
        text: "Em từng đăng lại (share) một bài viết hoặc hình ảnh mà không biết rõ ai là người tạo ra nó đầu tiên.",
      },
      {
        id: "d5",
        text: "Trước khi bấm vào một đường link lạ được gửi tới, em có thói quen kiểm tra xem nó có đáng tin không.",
      },
    ],
  },

  /* HĐ1 – 6 tín hiệu: 1 An toàn · 2 Kiểm tra lại · 3 Dừng lại */
  hd1: {
    nhiemVu: [
      {
        b: 1,
        ten: "Phân loại 6 tình huống",
        phut: "4 phút",
        mo: "Đọc kĩ từng tình huống và hình minh họa. Với mỗi câu, chọn đúng 1 trong 3 mức: An toàn, Kiểm tra lại hoặc Dừng lại.",
      },
      {
        b: 2,
        ten: "Chọn tình huống nguy hiểm nhất",
        phut: "2 phút",
        mo: "Trong 6 câu vừa phân loại, chọn ra đúng 1 tình huống em cho là nguy hiểm nhất và giải thích lí do trong đúng một câu.",
      },
    ],
    nhan: [
      { v: 1, ten: "An toàn", mau: "green", icon: "🟢" },
      { v: 2, ten: "Kiểm tra lại", mau: "yellow", icon: "🟡" },
      { v: 3, ten: "Dừng lại", mau: "red", icon: "🔴" },
    ],
    items: [
      {
        id: 1,
        text: "Em tìm thấy một website cho tải miễn phí hàng nghìn bức ảnh để làm bài thuyết trình, nhưng trang này không ghi tác giả là ai, cũng không ghi ảnh có giấy phép sử dụng gì.",
        dap: 2,
        giai: "Chưa rõ tác giả và giấy phép của ảnh, trang tải miễn phí kiểu này còn có thể chứa mã độc → cần kiểm tra kĩ trước khi dùng.",
      },
      {
        id: 2,
        text: "Một tài khoản mạng xã hội lấy tên và ảnh đại diện giống hệt cô giáo chủ nhiệm nhắn tin cho em, nói cần tiền gấp và nhờ em chuyển khoản ngay.",
        dap: 3,
        giai: "Đây là thủ đoạn giả danh người quen quen thuộc: dùng tên và ảnh thật để tạo lòng tin rồi thúc ép chuyển tiền gấp → phải dừng lại và xác minh qua kênh khác (gọi điện trực tiếp).",
      },
      {
        id: 3,
        text: "Nhóm em tìm được một bài viết rất hay trên mạng và định chép nguyên văn toàn bộ bài đó vào sản phẩm của nhóm, không ghi tên tác giả gốc.",
        dap: 2,
        giai: "Bài viết là sản phẩm có tác giả — cần xin phép, trích dẫn một phần và ghi rõ nguồn thay vì chép nguyên văn không xin phép.",
      },
      {
        id: 4,
        text: "Một nhà tuyển dụng online nhắn tin yêu cầu em gửi mã OTP vừa nhận được qua điện thoại để “xác nhận hồ sơ ứng tuyển”.",
        dap: 3,
        giai: "Mã OTP là chìa khoá bảo vệ tài khoản của chính em — không doanh nghiệp thật nào cần mã OTP của ứng viên để xác nhận hồ sơ → phải dừng lại, không cung cấp.",
      },
      {
        id: 5,
        text: "Em nhắn tin hỏi và được một bạn cùng lớp đồng ý cho dùng ảnh của bạn ấy để làm poster tuyên truyền của nhóm.",
        dap: 1,
        giai: "Đã xin phép và được chính chủ sở hữu bức ảnh đồng ý → an toàn để sử dụng, chỉ cần ghi tên bạn ấy khi đăng poster.",
      },
      {
        id: 6,
        text: "Khi cài một ứng dụng chỉnh sửa ảnh miễn phí, ứng dụng xin quyền truy cập danh bạ và tin nhắn của em, dù chức năng chính chỉ là chỉnh sửa ảnh.",
        dap: 2,
        giai: "Ứng dụng xin quyền vượt quá nhu cầu sử dụng thực tế (chỉnh sửa ảnh không cần đọc danh bạ hay tin nhắn) → cần kiểm tra kĩ trước khi đồng ý cấp quyền.",
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
        mo: "Đọc kĩ tin nhắn bạn An nhận được ở khung chat bên dưới, để ý những chỗ khiến em thấy bất thường.",
      },
      {
        b: 2,
        ten: "Săn dấu hiệu đỏ",
        phut: "4 phút",
        mo: "Trong 8 phương án, tick đúng 5 phương án là dấu hiệu lừa đảo đáng ngờ thật sự (3 phương án còn lại là chi tiết bình thường, không phải dấu hiệu).",
      },
      {
        b: 3,
        ten: "Ra quyết định",
        phut: "1 phút",
        mo: "Trong 4 cách xử lí, chọn đúng 1 cách mà em cho là đúng nếu em là bạn An lúc này.",
      },
      {
        b: 4,
        ten: "Ba việc làm đầu tiên",
        phut: "4 phút",
        mo: "Viết đúng 3 việc em sẽ làm ngay sau khi phát hiện đây là lừa đảo, theo đúng thứ tự: việc nào làm trước, việc nào làm sau.",
      },
    ],
    tinNhan: [
      "🔔 TUYỂN CTV NHẬP DỮ LIỆU ONLINE",
      "Thu nhập 500.000 – 1.000.000đ/NGÀY, không cần kinh nghiệm!",
      "Làm tại nhà, 2–3 giờ/ngày. SỐ LƯỢNG CÓ HẠN — ĐĂNG KÍ NGAY!",
      "👉 Đăng kí tại: vieclam-2026.top",
      "(Sau khi đăng kí) Bạn chuyển 300.000đ phí kích hoạt tài khoản và gửi họ tên, số CCCD, số tài khoản ngân hàng, mã OTP để hoàn tất hồ sơ nhé!",
    ],
    /* Bước 2 – chọn đúng 5 dấu hiệu đỏ trong 8 phương án.
       Thứ tự đúng/sai đã xen kẽ, KHÔNG xếp liền 5 đúng rồi mới tới 3 sai,
       để học sinh phải đọc từng câu thay vì đoán theo cụm vị trí. */
    dauHieu: [
      {
        id: "c",
        text: "Đường link dẫn tới một tên miền lạ (vieclam-2026.top), không phải website chính thức của một công ty cụ thể nào.",
        do: true,
      },
      {
        id: "f",
        text: "Công việc được mô tả là ngồi nhập dữ liệu trên máy tính tại nhà.",
        do: false,
      },
      {
        id: "a",
        text: "Hứa hẹn thu nhập rất cao (500.000 – 1.000.000đ/ngày) trong khi không đòi hỏi kinh nghiệm hay bằng cấp gì.",
        do: true,
      },
      {
        id: "g",
        text: "Tin nhắn được gửi đến vào buổi tối.",
        do: false,
      },
      {
        id: "e",
        text: "Đòi hỏi những thông tin rất nhạy cảm cùng lúc: số CCCD, số tài khoản ngân hàng và mã OTP.",
        do: true,
      },
      {
        id: "h",
        text: "Tin nhắn có sử dụng một vài biểu tượng cảm xúc (emoji).",
        do: false,
      },
      {
        id: "b",
        text: "Thúc giục đăng kí ngay lập tức vì “số lượng có hạn”, tạo cảm giác phải quyết định thật nhanh, không kịp suy nghĩ.",
        do: true,
      },
      {
        id: "d",
        text: "Yêu cầu chuyển tiền trước khi được nhận việc, với lí do “phí kích hoạt tài khoản”.",
        do: true,
      },
    ],
    /* Bước 3 – quyết định. Vị trí đáp án đúng đã đảo (không cố định một chỗ),
       và cả 4 phương án được viết dài ngắn gần bằng nhau — không để đáp án
       đúng nổi bật vì dài hơn hẳn 3 phương án còn lại. */
    quyetDinh: [
      {
        id: "q1",
        text: "Chuyển trước 300.000đ để thử xem công ty này có thật hay không, vì đằng nào cũng đã trót đăng kí rồi.",
        dung: false,
      },
      {
        id: "q2",
        text: "Không cung cấp thêm thông tin gì nữa, dừng lại ngay và xác minh công ty qua một kênh chính thức, rồi báo cho bố mẹ hoặc thầy cô.",
        dung: true,
      },
      {
        id: "q3",
        text: "Gửi trước số CCCD, còn mã OTP thì giữ lại cho riêng mình để an toàn hơn một chút.",
        dung: false,
      },
      {
        id: "q4",
        text: "Vẫn đăng kí ngay kẻo hết “số lượng có hạn”, chuyện tiền bạc tính sau cũng chưa muộn.",
        dung: false,
      },
    ],
    goiY3Viec: [
      "Chặn ngay người gửi tin nhắn, không bấm vào bất kì đường link nào trong đó.",
      "Chụp màn hình lại làm bằng chứng, báo cáo (report) tài khoản đó trên nền tảng, và gửi cảnh báo tại canhbao.khonggianmang.gov.vn.",
      "Cảnh báo cho bạn bè, người thân về hình thức lừa đảo này. Nếu đã lỡ cung cấp thông tin: đổi mật khẩu ngay và gọi điện cho ngân hàng để khoá tài khoản.",
    ],
  },

  /* HĐ3 – “Có được phép không?” */
  hd3: {
    nhiemVu: [
      {
        b: 1,
        ten: "Phân loại 5 sản phẩm số",
        phut: "9 phút",
        mo: "Với mỗi sản phẩm, đọc kĩ mô tả và hình minh họa để tìm ra: ai là tác giả, có giấy phép sử dụng hay chưa, đã ghi nguồn chưa. Sau đó chọn đúng 1 trong 3 mức.",
      },
      {
        b: 2,
        ten: "Trả lời câu hỏi bẫy",
        phut: "2 phút",
        mo: "Đọc kĩ 3 phương án rồi chọn đúng 1 phương án — nhớ cả lí do vì sao phương án đó đúng, vì em sẽ cần giải thích lại.",
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
        text: "Em tìm một bức ảnh phong cảnh rất đẹp qua công cụ tìm kiếm hình ảnh trên Internet. Trang chứa ảnh không ghi tên tác giả, cũng không có bất kì thông tin nào về giấy phép sử dụng.",
        dap: 3,
        giai: "Không xác định được ai là chủ sở hữu và không có giấy phép cho phép → không nên tự ý sử dụng.",
      },
      {
        id: "B",
        text: "Một nhiếp ảnh gia tên Minh Anh đăng ảnh của mình kèm giấy phép Creative Commons (CC BY 4.0) — cho phép người khác sử dụng miễn phí, với điều kiện phải ghi tên tác giả khi dùng.",
        dap: 1,
        giai: "Có giấy phép rõ ràng cho phép sử dụng → được dùng nếu tuân thủ đúng điều kiện của giấy phép (ở đây là ghi tên tác giả).",
      },
      {
        id: "C",
        text: "Nhóm em tìm thấy một bài viết hay trên một website khác và sao chép nguyên văn toàn bộ bài đó để đăng lên fanpage của nhóm, không xin phép và không ghi nguồn.",
        dap: 2,
        dapPhu: 3,
        giai: "Bài viết có tác giả và chưa được xin phép → phải liên hệ xin phép tác giả trước; chép nguyên văn khi chưa xin phép là vi phạm quyền tác giả.",
      },
      {
        id: "D",
        text: "Nhóm em tải một đoạn mã nguồn từ một kho lưu trữ (repository) trên GitHub về dùng cho dự án, nhưng chưa đọc tệp giấy phép (LICENSE) đi kèm.",
        dap: 2,
        giai: "Mỗi kho mã nguồn có điều kiện sử dụng riêng — cần đọc kĩ giấy phép (ví dụ MIT, GPL…) trước khi quyết định có được dùng theo cách nhóm định làm hay không.",
      },
      {
        id: "E",
        text: "Một bạn cùng lớp tự quay và đăng một video lên mạng xã hội của bạn ấy. Em muốn cắt một đoạn trong video đó để ghép vào clip giới thiệu của nhóm mình.",
        dap: 2,
        giai: "Bạn cùng lớp là tác giả của video đó → cần xin phép bạn ấy trước khi sử dụng và ghi rõ tên bạn ấy trong sản phẩm.",
      },
    ],
    bay: {
      cauHoi:
        "“Một tác phẩm đã xuất hiện công khai trên Internet” có đồng nghĩa với “ai cũng được phép sử dụng tự do” không?",
      luaChon: [
        {
          id: "b1",
          text: "Có, miễn là không đem bán để kiếm tiền thì được dùng thoải mái.",
          dung: false,
        },
        {
          id: "b2",
          text: "Có, một khi tác giả đã đăng công khai lên mạng thì coi như đã đồng ý cho mọi người sử dụng.",
          dung: false,
        },
        {
          id: "b3",
          text: "Không. Mọi tác phẩm đều có tác giả và được pháp luật bảo hộ quyền tác giả ngay từ khi tạo ra, trừ khi chính tác giả cho phép hoặc tác phẩm đã thuộc phạm vi sử dụng chung.",
          dung: true,
        },
      ],
    },
  },

  /* HĐ4 – Một tình huống, nhiều góc nhìn (hoạt động nhóm đóng vai —
     ĐỘC LẬP hoàn toàn với phần tự đánh giá ở Mở đầu; 5 vai dưới đây
     là 5 vai của riêng hoạt động này). */
  hd4: {
    boiCanh:
      "Trường tổ chức Ngày hội hướng nghiệp. Nhóm em được giao làm một website giới thiệu nghề nghiệp cho học sinh THPT, hạn nộp còn 3 ngày mà nhóm vẫn thiếu tư liệu.",
    deXuatCuaBan:
      "Trong lúc gấp, một bạn trong nhóm đề xuất 5 việc sau cho nhanh. Mỗi việc là một VẤN ĐỀ nhóm em phải xử lí:",
    deXuat: [
      {
        id: 1,
        ic: "🖼️",
        ten: "Ảnh minh họa",
        noiDung:
          "Vào Google Hình ảnh, thấy ảnh nào đẹp thì tải về dùng luôn, không cần xem nguồn hay giấy phép.",
        vaiLo: ["design", "phapche"],
        khongNen: "Tải ảnh không rõ tác giả, không rõ giấy phép về dùng.",
        nen: "Tự chụp, tự thiết kế, hoặc dùng kho ảnh có giấy phép (Creative Commons) và ghi nguồn đầy đủ.",
      },
      {
        id: 2,
        ic: "📄",
        ten: "Bài giới thiệu nghề",
        noiDung:
          "Sao chép nguyên văn một bài viết từ website hướng nghiệp khác, dán thẳng vào trang của nhóm.",
        vaiLo: ["tt", "phapche"],
        khongNen:
          "Chép nguyên văn bài của người khác, không xin phép, không ghi nguồn.",
        nen: "Tự viết lại bằng lời của nhóm; nếu cần dẫn lại thì chỉ trích một đoạn ngắn, có ghi rõ nguồn và tác giả.",
      },
      {
        id: 3,
        ic: "🏛️",
        ten: "Logo trường đại học",
        noiDung:
          "Lấy logo của một trường đại học đặt lên trang web cho có vẻ “uy tín” hơn.",
        vaiLo: ["phapche", "tt"],
        khongNen:
          "Dùng logo của tổ chức khác khi chưa được phép — người xem còn có thể hiểu nhầm là trường đó đang bảo trợ cho website của nhóm.",
        nen: "Xin phép nhà trường trước khi dùng logo; hoặc chỉ nêu tên trường như một dòng thông tin chữ, tự thiết kế hình ảnh riêng của nhóm.",
      },
      {
        id: 4,
        ic: "🎵",
        ten: "Nhạc nền cho video",
        noiDung:
          "Chèn một bài nhạc đang thịnh hành trên mạng vào video giới thiệu của nhóm.",
        vaiLo: ["phapche", "design"],
        khongNen:
          "Chèn một bản nhạc đang có bản quyền vào video — video có thể bị nền tảng chặn phát hoặc nhóm bị khiếu nại vi phạm bản quyền.",
        nen: "Dùng nhạc miễn phí bản quyền lấy từ thư viện âm thanh có giấy phép rõ ràng, hoặc nhóm tự sáng tác/thu âm.",
      },
      {
        id: 5,
        ic: "🧩",
        ten: "Plugin lạ và biểu mẫu xin thông tin",
        noiDung:
          "Tải một plugin lạ từ một trang chia sẻ để website có hiệu ứng đẹp hơn, đồng thời thêm một biểu mẫu (form) xin số điện thoại và email của người xem web để “thống kê”.",
        vaiLo: ["coder", "attt"],
        khongNen:
          "Cài một plugin không rõ nguồn gốc, đồng thời tự ý thu thập số điện thoại và email của người xem mà không nói rõ mục đích.",
        nen: "Chỉ dùng plugin có giấy phép rõ ràng, tải từ trang chính thức; không thu thập thông tin cá nhân của người xem nếu không thật sự cần thiết, và nếu cần thì phải nói rõ mục đích, xin phép trước; đặt mật khẩu mạnh cho tài khoản quản trị website.",
      },
    ],
    cauHoiLon:
      "Nếu làm đúng cả 5 điều trên, nhóm em có thể gặp rắc rối gì? Với từng vấn đề, nhóm nên làm thế nào để website vừa hoàn thành nhanh, vừa hợp pháp, vừa an toàn?",
    nhiemVu: [
      {
        b: 1,
        ten: "Phân vai theo số bạn trong nhóm",
        phut: "1 phút",
        mo: "Nhóm có bao nhiêu bạn thì nhận bấy nhiêu vai trong 5 vai bên dưới (tối đa 5 vai). Nhóm ít bạn thì một bạn có thể giữ 2 vai — trang web sẽ tự tính rõ nhóm em cần ít nhất mấy vai.",
      },
      {
        b: 2,
        ten: "Mỗi vai chọn vấn đề mình lo nhất",
        phut: "2 phút",
        mo: "Mỗi bạn đọc cả 5 vấn đề bằng “con mắt” của vai mình, chọn ra đúng 1 vấn đề mà vai đó lo nhất, rồi viết rõ mình đề nghị nhóm làm gì thay thế.",
      },
      {
        b: 3,
        ten: "Xử lí lần lượt cả 5 vấn đề",
        phut: "3 phút",
        mo: "Từng vấn đề một, cả nhóm cùng thống nhất và ghi vào bảng: KHÔNG nên làm gì và NÊN làm gì thay thế. Phải làm đủ cả 5 vấn đề, không được bỏ sót. Cuối cùng đặt một khẩu quyết thật ngắn cho cả nhóm.",
      },
    ],
    luuYVai:
      "Lưu ý: một vai không chỉ lo đúng một vấn đề. Một vấn đề có thể bị nhiều vai cùng phản đối, và một vai có thể lo nhiều vấn đề khác nhau — nhưng dù ai lo vấn đề nào, thì ở Bước 3 cả 5 vấn đề đều phải được nhóm xử lí đầy đủ.",
    vai: [
      {
        id: "design",
        ten: "Designer",
        vanDeGoiY: 1,
        dinhHuong:
          "Ảnh, logo, hình ảnh trong video này là của ai? Nhóm có cách nào tự làm ra hình ảnh của riêng mình không?",
        goiY: "Ảnh và logo đều có chủ sở hữu; nên tự thiết kế hoặc dùng kho ảnh có giấy phép cho phép sử dụng.",
      },
      {
        id: "tt",
        ten: "Chuyên viên Truyền thông",
        vanDeGoiY: 2,
        dinhHuong:
          "Nội dung sao chép có chính xác và đến từ nguồn uy tín không? Người xem có thể hiểu nhầm điều gì không?",
        goiY: "Thông tin phải chính xác, đến từ nguồn uy tín, không gây hiểu nhầm và không ảnh hưởng đến uy tín của tổ chức khác.",
      },
      {
        id: "phapche",
        ten: "Chuyên viên Pháp chế",
        vanDeGoiY: 3,
        dinhHuong:
          "Việc nào trong 5 vấn đề là vi phạm quyền tác giả hoặc quyền sở hữu trí tuệ? Muốn dùng hợp pháp thì phải làm gì trước?",
        goiY: "Sao chép bài viết, dùng logo, dùng nhạc khi chưa xin phép đều là hành vi vi phạm quyền tác giả và quyền sở hữu trí tuệ.",
      },
      {
        id: "coder",
        ten: "Lập trình viên",
        vanDeGoiY: 5,
        dinhHuong:
          "Plugin, mã nguồn nhóm định dùng có giấy phép rõ ràng không? Tải từ nguồn nào? Có nguy cơ chứa mã độc không?",
        goiY: "Mã nguồn, plugin phải có giấy phép rõ ràng và tải từ nguồn chính thức; website không được chứa link hay tệp độc hại.",
      },
      {
        id: "attt",
        ten: "Chuyên viên An toàn thông tin",
        vanDeGoiY: 5,
        dinhHuong:
          "Website có đang thu thập thông tin cá nhân của người xem không? Tài khoản quản trị website được bảo vệ bằng cách nào?",
        goiY: "Không thu thập dữ liệu cá nhân của người xem khi không cần thiết; bảo vệ tài khoản quản trị bằng mật khẩu mạnh và xác thực hai lớp.",
      },
    ],
  },

  /* HĐ5 – Thử thách 10 giây: mỗi câu có 10 giây để CHỌN đáp án đúng */
  hd5: {
    giay: 10,
    nhiemVu: [
      {
        b: 1,
        ten: "Bấm Bắt đầu",
        phut: "",
        mo: "Chỉ bấm khi đã sẵn sàng, vì đồng hồ đếm ngược chạy ngay khi câu hỏi đầu tiên xuất hiện.",
      },
      {
        b: 2,
        ten: "Chọn đáp án trong 10 giây",
        phut: "2 phút",
        mo: "Với mỗi trong 5 tình huống, trả lời câu “em nên làm gì?” bằng đúng 1 trong 3 tín hiệu: AN TOÀN, KIỂM TRA LẠI hoặc DỪNG LẠI. Hết 10 giây mà chưa chọn thì mất điểm câu đó.",
      },
      {
        b: 3,
        ten: "Xem lại kết quả",
        phut: "3 phút",
        mo: "Đọc bảng kết quả hiện ra sau khi trả lời hết 5 câu, xem lại lời giải thích của những câu đã chọn sai.",
      },
    ],
    cauHoi: "Gặp tình huống này, em nên làm gì?",
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
        ten: "KIỂM TRA LẠI",
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
        text: "Em nhận được tin nhắn mời làm cộng tác viên online, kèm yêu cầu chuyển khoản 200.000đ “phí kích hoạt tài khoản” trước khi bắt đầu công việc.",
        dap: "do",
        giai: "Đòi tiền trước khi làm việc là dấu hiệu lừa đảo rõ ràng → DỪNG LẠI, không chuyển tiền.",
      },
      {
        id: 2,
        text: "Em tìm được một bức ảnh rất đẹp trên Internet muốn đưa vào bài thuyết trình, nhưng chưa biết ai là tác giả hay ảnh có giấy phép sử dụng gì không.",
        dap: "vang",
        giai: "Chưa rõ tác giả và giấy phép → KIỂM TRA LẠI, phải xem kĩ trước khi dùng.",
      },
      {
        id: 3,
        text: "Một người bạn nhắn tin gửi cho em mã OTP vừa nhận được và nhờ em đăng nhập giúp vào tài khoản của bạn ấy.",
        dap: "do",
        giai: "Tuyệt đối không nhận, không sử dụng mã OTP của người khác → DỪNG LẠI.",
      },
      {
        id: 4,
        text: "Em dùng một bức ảnh có giấy phép cho phép sử dụng, và trong sản phẩm của nhóm đã ghi đầy đủ tên tác giả cùng nguồn ảnh.",
        dap: "xanh",
        giai: "Có giấy phép cho phép sử dụng và đã ghi nguồn đầy đủ → AN TOÀN, dùng và chia sẻ được.",
      },
      {
        id: 5,
        text: "Một tài khoản mạng xã hội có tên và ảnh đại diện giống hệt giáo viên của em nhắn tin nhờ chuyển tiền gấp.",
        dap: "do",
        giai: "DỪNG LẠI ngay và xác minh lại qua một kênh liên lạc khác (gọi điện trực tiếp), vì tài khoản có thể đã bị giả mạo.",
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
        mo: "Tick vào những việc em thật sự cam kết sẽ làm trong 3 ngày tới.",
      },
      {
        b: 2,
        ten: "Chọn người sẽ nhắc",
        phut: "30 giây",
        mo: "Chọn đúng 1 người thân em sẽ nói chuyện cùng, và đúng 1 hình thức lừa đảo em sẽ kể cho người đó nghe.",
      },
      {
        b: 3,
        ten: "Viết tin nhắn cảnh báo",
        phut: "1 phút 30",
        mo: "Viết ngay tại lớp một tin nhắn dài 1–2 câu để gửi vào nhóm chat gia đình. Đây là sản phẩm chính của hoạt động, sẽ được giáo viên chấm.",
      },
      {
        b: 4,
        ten: "Nộp bài",
        phut: "",
        mo: "Bấm nút NỘP BÀI ở cuối trang. Ba ngày sau, em thực hiện đúng những việc đã cam kết; tiết học sau, mỗi nhóm báo cáo 1 phút về kết quả.",
      },
    ],
    gioiThieu:
      "Ngay tại lớp, em chọn những việc mình cam kết làm, chọn người thân mình sẽ nhắc, và viết luôn tin nhắn cảnh báo — rồi nộp bài. Không vẽ poster, không thuyết trình.",
    hanNop:
      "Trong 3 ngày tới, em thực hiện đúng những việc đã cam kết và gửi tin nhắn cảnh báo cho gia đình. Đầu tiết học sau, mỗi nhóm báo cáo 1 phút về việc đã làm được.",

    camKetTieuDe: "Em cam kết sẽ làm những việc nào trong 3 ngày tới?",
    camKetMoTa:
      "Tick vào việc em thật sự sẽ làm — không phải việc đã làm rồi. Cam kết 3 việc rồi làm thật vẫn tốt hơn tick cả 5 cho có.",
    raSoat: [
      {
        id: "r1",
        ic: "🔑",
        text: "Đổi mật khẩu mạnh (từ 8 kí tự trở lên, có chữ hoa, chữ số, kí tự đặc biệt) cho tài khoản quan trọng nhất của em.",
      },
      {
        id: "r2",
        ic: "🔒",
        text: "Bật xác thực hai lớp (2FA) cho tài khoản quan trọng nhất đó.",
      },
      {
        id: "r3",
        ic: "📱",
        text: "Mở mục “thiết bị đang đăng nhập” trong phần cài đặt tài khoản, đăng xuất mọi thiết bị em không nhận ra.",
      },
      {
        id: "r4",
        ic: "🙈",
        text: "Kiểm tra lại quyền riêng tư: ai đang xem được số điện thoại, ngày sinh, ảnh cá nhân của em — chỉnh lại cho chặt hơn nếu cần.",
      },
      {
        id: "r5",
        ic: "©️",
        text: "Rà soát lại một sản phẩm số của chính em (một bài đăng, video, slide…): ghi nguồn đầy đủ hoặc bỏ tư liệu chưa xin phép ra khỏi sản phẩm đó.",
      },
    ],

    lanToa: {
      tieuDe: "Chọn người em sẽ nhắc",
      moTa: "Người bị lừa đảo trên mạng nhiều nhất thường là người lớn tuổi trong gia đình. Chọn đúng 1 người em sẽ nói chuyện cùng và đúng 1 hình thức lừa đảo em sẽ kể cho người đó nghe.",
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
        "Tuyển dụng “việc nhẹ lương cao”, đòi phí kích hoạt trước",
        "Giả danh người quen (thầy cô, họ hàng) nhờ chuyển tiền gấp",
        "Đòi mã OTP để “xác nhận hồ sơ” hoặc “nhận quà”",
        "Gửi đường link lạ báo trúng thưởng, nhận quà miễn phí",
        "Giả danh công an, ngân hàng, hoặc nhân viên giao hàng",
      ],
    },

    tinMoTa:
      "Viết đúng 1–2 câu, thật ngắn gọn và dễ hiểu với người lớn tuổi. Trong tin nhắn phải nói rõ được hai điều: đừng làm gì, và hãy làm gì. Đây là phần giáo viên sẽ chấm và cả lớp cùng bình chọn.",

    khong: [
      "Không cung cấp mã OTP, mật khẩu cho bất kì ai, kể cả người tự xưng là nhân viên ngân hàng hay công an.",
      "Không chuyển tiền cho người lạ, hoặc cho bất kì công việc nào đòi “phí trước”.",
      "Không bấm vào đường link lạ, không tải tệp không rõ nguồn gốc.",
      "Không sao chép, đăng lại sản phẩm của người khác khi chưa được phép.",
      "Không chia sẻ tin chưa kiểm chứng và thông tin cá nhân của người khác.",
    ],
    nen: [
      "Nên đặt mật khẩu mạnh và bật xác thực hai lớp cho mọi tài khoản quan trọng.",
      "Nên xác minh lại thông tin qua một kênh chính thức trước khi tin và hành động theo.",
      "Nên xin phép và ghi nguồn đầy đủ khi sử dụng sản phẩm của người khác.",
      "Nên báo ngay cho bố mẹ, thầy cô khi gặp một tình huống đáng ngờ trên mạng.",
      "Nên dừng lại 10 giây để suy nghĩ kĩ trước khi bấm chia sẻ bất cứ điều gì.",
    ],
  },
};
