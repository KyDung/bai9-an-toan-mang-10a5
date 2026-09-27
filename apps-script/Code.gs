/**
 * =======================================================================
 *  GOOGLE APPS SCRIPT — nhận bài làm từ web "Điều tra viên số"
 *  Bài 9 Tin học 10: An toàn trên không gian mạng
 * =======================================================================
 *  CÁCH DÙNG (làm 1 lần):
 *  1. Tạo Google Sheet mới → đặt tên "BaiLam_10A5_Bai9".
 *  2. Menu Tiện ích mở rộng (Extensions) → Apps Script.
 *  3. Xoá hết code mẫu, dán TOÀN BỘ file này vào, bấm 💾 lưu.
 *  4. Bấm Triển khai (Deploy) → Tuỳ chọn triển khai mới (New deployment)
 *       · Loại (Select type)      : Ứng dụng web (Web app)
 *       · Mô tả (Description)     : v1
 *       · Thực thi với tư cách    : Tôi (Me)
 *       · Người có quyền truy cập : Bất kỳ ai (Anyone)     ← QUAN TRỌNG
 *     → Triển khai → Cho phép quyền truy cập (Authorize access).
 *  5. Copy "URL ứng dụng web" (kết thúc bằng /exec) và dán vào
 *     js/config.js  →  GAS_URL: "https://script.google.com/macros/s/..../exec"
 *
 *  Lưu ý: mỗi lần sửa code này phải Deploy lại (Quản lý triển khai →
 *  biểu tượng bút chì → Phiên bản: Mới → Triển khai) thì thay đổi mới có hiệu lực.
 * =======================================================================
 */

/** Tên sheet (tab) sẽ chứa bài làm. Không cần tạo trước, script tự tạo. */
var SHEET_NAME = 'BaiLam';

/** Thứ tự cột trong Sheet — khớp với dữ liệu web gửi lên. */
var FIELDS = [
  ['thoiGianNhan',        'Thời gian nhận'],
  ['cheDo',               'Cá nhân / Nhóm'],
  ['hoTen',               'Họ và tên'],
  ['lop',                 'Lớp'],
  ['nhom',                'Nhóm'],
  ['danhHieu',            'Danh hiệu đội'],
  ['soThanhVien',         'Số thành viên'],
  ['thanhVien',           'Thành viên nhóm'],
  ['ngheNhapVai',         'Nghề nhập vai'],
  ['diem_TONG',           'ĐIỂM TỔNG (/10)'],
  ['diem_HD1_HD5',        'Điểm HĐ1+HĐ5 (/3)'],
  ['diem_HD2',            'Điểm HĐ2 (/3)'],
  ['diem_HD3',            'Điểm HĐ3 (/2)'],
  ['diem_HD4',            'Điểm HĐ4 (/2)'],
  ['hd1_soDung',          'HĐ1 - số câu đúng'],
  ['hd1_phanLoai',        'HĐ1 - phân loại 6 tín hiệu'],
  ['hd1_nguyHiemNhat',    'HĐ1 - tình huống nguy hiểm nhất'],
  ['hd1_viSao',           'HĐ1 - vì sao'],
  ['hd2_dauHieuDung',     'HĐ2 - dấu hiệu đỏ đúng'],
  ['hd2_dauHieuChon',     'HĐ2 - các dấu hiệu đã chọn'],
  ['hd2_quyetDinhDung',   'HĐ2 - quyết định'],
  ['hd2_quyetDinh',       'HĐ2 - nội dung quyết định'],
  ['hd2_baViecLam',       'HĐ2 - 3 việc làm đầu tiên'],
  ['hd3_soDung',          'HĐ3 - số câu đúng'],
  ['hd3_phanLoai',        'HĐ3 - phân loại 5 sản phẩm'],
  ['hd3_cauBay',          'HĐ3 - câu hỏi bẫy'],
  ['hd4_yKienTheoVai',    'HĐ4 - ý kiến theo vai'],
  ['hd4_soVanDeXuLy',     'HĐ4 - số vấn đề đã xử lí'],
  ['hd4_giaiPhap',        'HĐ4 - giải pháp cho 5 vấn đề'],
  ['hd4_khauQuyet',       'HĐ4 - khẩu quyết'],
  ['hd5_diem',            'HĐ5 - điểm thử thách 10 giây'],
  ['hd5_traLoi',          'HĐ5 - trả lời từng câu'],
  ['hd6_soViecCamKet',    'HĐ6 - số việc đã cam kết'],
  ['hd6_vieCamKet',       'HĐ6 - các việc đã cam kết'],
  ['hd6_nguoiThan',       'HĐ6 - người thân sẽ nhắc'],
  ['hd6_hinhThucLuaDao',  'HĐ6 - hình thức lừa đảo sẽ kể'],
  ['hd6_tinCanhBao',      'HĐ6 - tin nhắn cảnh báo gia đình'],
  ['hd6_nhoNhat',         'Điều nhớ nhất sau tiết học'],
  ['bai',                 'Bài học'],
  ['thoiGian',            'Thời gian máy học sinh']
];

/** Nhận bài làm từ web. */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    data.thoiGianNhan = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');

    var sheet = getSheet_();
    var row = FIELDS.map(function (f) {
      var v = data[f[0]];
      return (v === undefined || v === null) ? '' : v;
    });
    sheet.appendRow(row);

    return json_({ ok: true, row: sheet.getLastRow() });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Mở link /exec bằng trình duyệt để kiểm tra script còn sống. */
function doGet() {
  return json_({ ok: true, message: 'Apps Script dang hoat dong. Hay POST du lieu vao day.' });
}

/** Lấy (hoặc tạo) sheet và bảo đảm có dòng tiêu đề. */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    var head = FIELDS.map(function (f) { return f[1]; });
    sheet.appendRow(head);
    var hr = sheet.getRange(1, 1, 1, head.length);
    hr.setFontWeight('bold')
      .setBackground('#1b3a8f')
      .setFontColor('#ffffff')
      .setVerticalAlignment('middle');
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 38);
    sheet.setColumnWidth(1, 150);   // thời gian
    sheet.setColumnWidth(3, 170);   // họ tên
    sheet.setColumnWidth(6, 170);   // danh hiệu đội
    sheet.setColumnWidth(8, 240);   // thành viên nhóm
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* -----------------------------------------------------------------------
   TIỆN ÍCH CHO GIÁO VIÊN — chạy trực tiếp trong Apps Script khi cần
   ----------------------------------------------------------------------- */

/** Chạy hàm này một lần để tự kiểm tra: sẽ thêm 1 dòng dữ liệu giả. */
function test_ThemDongGia() {
  doPost({ postData: { contents: JSON.stringify({
    hoTen: 'Nguyễn Văn Test', lop: '10A5', nhom: 'Nhóm 1',
    ngheNhapVai: 'Chuyên viên An toàn thông tin',
    diem_TONG: 9.5, diem_HD1_HD5: 3, diem_HD2: 2.5, diem_HD3: 2, diem_HD4: 2,
    hd1_soDung: '6/6', hd5_diem: '5/5', bai: 'Bai 9 - Test'
  }) } });
}

/** Xoá toàn bộ bài làm, giữ lại dòng tiêu đề. */
function xoaToanBoBaiLam() {
  var sheet = getSheet_();
  if (sheet.getLastRow() > 1) {
    sheet.deleteRows(2, sheet.getLastRow() - 1);
  }
}
