const db = require("./db");
const cheerio = require("cheerio");

const getKetQuaMienBac = async (req, res) => {
  const { ngay } = req.params;

  var selectStatement = `SELECT html FROM ketquamienbac WHERE ngay = "${ngay}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateKetQuaMienBac = async (req, res) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const currentVietnamDate = formatter.format(new Date());
  const currentDay = new Date(currentVietnamDate);
  const currentDayString = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
  // check in database
  var selectStatement = `SELECT html FROM ketquamienbac WHERE ngay = "${currentDayString}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Da co!");
    } else {
      console.log("Dang cap nhat ket qua mien bac!");
      loadKetQuaMienBac(
        currentDayString,
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate()
      );
    }
  });
};

const loadKetQuaMienBac = async (currentDayString, year, month, day) => {
  const response = await fetch(
    `https://www.hdmediagroup.vn/ket-qua-xo-so-mien-bac-ngay-${currentDayString}.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const contentHtml = $(
    "form#XoSoNgayForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
  ).html();
  if (contentHtml) {
    const content = contentHtml.replace(/"/g, "'");
    var insertStatement = `INSERT INTO ketquamienbac (ngay, html) VALUES ('${year}-${month}-${day}', "${content}")`;
    db.query(insertStatement, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const getKetQuaMienNam = async (req, res) => {
  const { ngay } = req.params;

  var selectStatement = `SELECT html FROM ketquamiennam WHERE ngay = "${ngay}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateKetQuaMienNam = async (req, res) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const currentVietnamDate = formatter.format(new Date());
  const currentDay = new Date(currentVietnamDate);
  const currentDayString = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
  // check in database
  var selectStatement = `SELECT html FROM ketquamiennam WHERE ngay = "${currentDayString}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Da co!");
    } else {
      console.log("Dang cap nhat ket qua mien nam!");
      loadKetQuaMienNam(
        currentDayString,
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate()
      );
    }
  });
};

const loadKetQuaMienNam = async (currentDayString, year, month, day) => {
  const response = await fetch(
    `https://www.hdmediagroup.vn/xo-so-mien-nam-ngay-${currentDayString}.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const contentHtml = $(
    "form#SzXoSoMienNamForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
  ).html();
  if (contentHtml) {
    const content = contentHtml.replace(/"/g, "'");
    var insertStatement = `INSERT INTO ketquamiennam (ngay, html) VALUES ('${year}-${month}-${day}', "${content}")`;
    db.query(insertStatement, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const getKetQuaMienTrung = async (req, res) => {
  const { ngay } = req.params;

  var selectStatement = `SELECT html FROM ketquamientrung WHERE ngay = "${ngay}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateKetQuaMienTrung = async (req, res) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const currentVietnamDate = formatter.format(new Date());
  const currentDay = new Date(currentVietnamDate);
  const currentDayString = `${currentDay.getFullYear()}-${currentDay.getMonth()}-${currentDay.getDate()}`;
  // check in database
  var selectStatement = `SELECT html FROM ketquamientrung WHERE ngay = "${currentDayString}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Da co!");
    } else {
      console.log("Dang cap nhat ket qua mien trung!");
      loadKetQuaMienTrung(
        currentDayString,
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate()
      );
    }
  });
};

const loadKetQuaMienTrung = async (currentDayString, year, month, day) => {
  const response = await fetch(
    `https://www.hdmediagroup.vn/xo-so-mien-trung-ngay-${currentDayString}.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const contentHtml = $(
    "form#SzXoSoMienTrungForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
  ).html();
  if (contentHtml) {
    const content = contentHtml.replace(/"/g, "'");
    var insertStatement = `INSERT INTO ketquamientrung (ngay, html) VALUES ('${year}-${month}-${day}', "${content}")`;
    db.query(insertStatement, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

const getKetQuaMienBac30Ngay = async (req, res) => {
  const { ngay } = req.params;
  const day = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000);
  const ngayKetThuc = `${day.getFullYear()}-${
    day.getMonth() + 1 < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1
  }-${day.getDate() < 10 ? "0" + day.getDate() : day.getDate()}`;

  var selectStatement = `SELECT html FROM ketquamienbac WHERE ngay <= "${ngay}" AND ngay >= "${ngayKetThuc}"`;
  db.query(selectStatement, (err, results) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (results[0]) {
      return res.status(200).json({ result: results });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const getKetQuaMienNam30Ngay = async (req, res) => {
  const { ngay } = req.params;
  const day = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000);
  const ngayKetThuc = `${day.getFullYear()}-${
    day.getMonth() + 1 < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1
  }-${day.getDate() < 10 ? "0" + day.getDate() : day.getDate()}`;

  var selectStatement = `SELECT html FROM ketquamiennam WHERE ngay <= "${ngay}" AND ngay >= "${ngayKetThuc}"`;
  db.query(selectStatement, (err, results) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (results[0]) {
      return res.status(200).json({ result: results });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const getKetQuaMienTrung30Ngay = async (req, res) => {
  const { ngay } = req.params;
  const day = new Date(new Date().getTime() - 29 * 24 * 60 * 60 * 1000);
  const ngayKetThuc = `${day.getFullYear()}-${
    day.getMonth() + 1 < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1
  }-${day.getDate() < 10 ? "0" + day.getDate() : day.getDate()}`;

  var selectStatement = `SELECT html FROM ketquamientrung WHERE ngay <= "${ngay}" AND ngay >= "${ngayKetThuc}"`;
  db.query(selectStatement, (err, results) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (results[0]) {
      return res.status(200).json({ result: results });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const getDacBietTuan = async (req, res) => {
  var selectStatement = `SELECT html FROM dacbiettuan`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateDacBietTuan = async (req, res) => {
  const response = await fetch(
    `https://www.hdmediagroup.vn/thong_ke_dac_biet_tuan.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const body = $("div.content").html().replace(/"/g, "'");

  var insertStatement = `UPDATE dacbiettuan SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat giai dac biet tuan!");
    }
  });
};

const getDacBietThang = async (req, res) => {
  var selectStatement = `SELECT html FROM dacbietthang`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateDacBietThang = async () => {
  const response = await fetch(
    `https://www.hdmediagroup.vn/giaidbtheothang.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const body = $.html().replace(/"/g, "'");

  var insertStatement = `UPDATE dacbietthang SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat giai dac biet thang!");
    }
  });
};

const getDacBietNam = async (req, res) => {
  const { nam } = req.params;

  var selectStatement = `SELECT html FROM dacbietnam WHERE nam = "${nam}"`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      return res.status(200).json({ result: result[0].html });
    } else {
      return res.status(200).json({ result: "" });
    }
  });
};

const updateDacBietNam = async () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const currentVietnamDate = formatter.format(new Date());
  const currentDay = new Date(currentVietnamDate);

  var selectStatement = `SELECT html FROM dacbietnam WHERE nam = ${currentDay.getFullYear()}`;
  db.query(selectStatement, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      capnhatNam(currentDay.getFullYear());
    } else {
      themNam(currentDay.getFullYear());
    }
  });
};

const capnhatNam = async (year) => {
  const response = await fetch(
    `https://thongkemienbac.com/thong-ke-giai-dac-biet-nam-${year}.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const content = $("section.content").html().replace(/"/g, "'");
  var insertStatement = `UPDATE dacbietnam SET html = "${content}" WHERE nam = "${year}"`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat giai dac biet nam!");
    }
  });
};

const themNam = async (year) => {
  const response = await fetch(
    `https://thongkemienbac.com/thong-ke-giai-dac-biet-nam-${year}.html`
  );
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const content = $("section.content").html().replace(/"/g, "'");
  var insertStatement = `INSERT INTO dacbietnam (nam, html) VALUES (${year},"${content}")`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da them giai dac biet nam!");
    }
  });
};

module.exports = {
  getKetQuaMienBac,
  getKetQuaMienNam,
  getKetQuaMienTrung,
  getKetQuaMienBac30Ngay,
  getKetQuaMienNam30Ngay,
  getKetQuaMienTrung30Ngay,
  getDacBietTuan,
  getDacBietThang,
  getDacBietNam,
  updateKetQuaMienBac,
  updateKetQuaMienNam,
  updateKetQuaMienTrung,
  updateDacBietTuan,
  updateDacBietThang,
  updateDacBietNam,
};
