const db = require("./db");
const cheerio = require("cheerio");
const axios = require("axios");
const moment = require("moment-timezone");

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
  const { nam } = req.params;
  var selectStatement = `SELECT html FROM dacbiettuan WHERE id = ${nam}`;
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

const getTanSuatLo = async (req, res) => {
  var selectStatement = `SELECT html FROM tansuatlo`;
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

const getTanSuatLoTo = async (req, res) => {
  var selectStatement = `SELECT html FROM tansuatloto`;
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

const getCurrentTime = (req, res) => {
  const vietnamTime = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  return res.status(200).json({
    result: vietnamTime,
  });
};

const updateKetQuaMienBac = (req, res) => {
  const currentDay = new Date(moment().tz("Asia/Ho_Chi_Minh"));
  // date string for url
  const urlDateString = `${
    currentDay.getDate() < 10
      ? "0" + currentDay.getDate()
      : currentDay.getDate()
  }-${
    currentDay.getMonth() + 1 < 10
      ? "0" + (currentDay.getMonth() + 1)
      : currentDay.getMonth() + 1
  }-${currentDay.getFullYear()}`;

  // Check in database
  var selectStatement = `SELECT html FROM ketquamienbac WHERE ngay = "${sqlDateString}"`;
  db.query(selectStatement, async (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Mien bac chua co");
      const response = await axios.get(
        `https://www.hdmediagroup.vn/ket-qua-xo-so-mien-bac-ngay-${urlDateString}.html`
      );
      const htmlString = await response.data;
      const $ = cheerio.load(htmlString);
      const contentHtml = $(
        "form#XoSoNgayForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
      ).html();
      if (contentHtml) {
        const content = contentHtml.replace(/"/g, "'");
        var insertStatement = `INSERT INTO ketquamienbac (ngay, html) VALUES ('${currentDay.getFullYear()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getDate()}', "${content}")`;
        db.query(insertStatement, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      console.log("Da cap nhat mien bac");
    }
  });
};

const updateKetQuaMienNam = (req, res) => {
  const currentDay = new Date(moment().tz("Asia/Ho_Chi_Minh"));
  // date string for url
  const urlDateString = `${
    currentDay.getDate() < 10
      ? "0" + currentDay.getDate()
      : currentDay.getDate()
  }-${
    currentDay.getMonth() + 1 < 10
      ? "0" + (currentDay.getMonth() + 1)
      : currentDay.getMonth() + 1
  }-${currentDay.getFullYear()}`;

  // check in database
  var selectStatement = `SELECT html FROM ketquamiennam WHERE ngay = "${sqlDateString}"`;
  db.query(selectStatement, async (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Mien nam chua co");
      const response = await axios.get(
        `https://www.hdmediagroup.vn/xo-so-mien-nam-ngay-${urlDateString}.html`
      );
      const htmlString = await response.data;
      const $ = cheerio.load(htmlString);
      const contentHtml = $(
        "form#SzXoSoMienNamForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
      ).html();
      if (contentHtml) {
        const content = contentHtml.replace(/"/g, "'");
        var insertStatement = `INSERT INTO ketquamiennam (ngay, html) VALUES ('${currentDay.getFullYear()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getDate()}', "${content}")`;
        db.query(insertStatement, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      console.log("Da cap nhat mien nam");
    }
  });
};

const updateKetQuaMienTrung = (req, res) => {
  const currentDay = new Date(moment().tz("Asia/Ho_Chi_Minh"));
  // date string for url
  const urlDateString = `${
    currentDay.getDate() < 10
      ? "0" + currentDay.getDate()
      : currentDay.getDate()
  }-${
    currentDay.getMonth() + 1 < 10
      ? "0" + (currentDay.getMonth() + 1)
      : currentDay.getMonth() + 1
  }-${currentDay.getFullYear()}`;

  // check in database
  var selectStatement = `SELECT html FROM ketquamientrung WHERE ngay = "${sqlDateString}"`;
  db.query(selectStatement, async (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      console.log("Mien trung chua co");
      const response = await axios.get(
        `https://www.hdmediagroup.vn/xo-so-mien-trung-ngay-${urlDateString}.html`
      );
      const htmlString = await response.data;
      const $ = cheerio.load(htmlString);
      const contentHtml = $(
        "form#SzXoSoMienTrungForm > div:first > table > tbody > tr:nth-child(2) > td:nth-child(2) > table"
      ).html();
      if (contentHtml) {
        const content = contentHtml.replace(/"/g, "'");
        var insertStatement = `INSERT INTO ketquamientrung (ngay, html) VALUES ('${currentDay.getFullYear()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getDate()}', "${content}")`;
        db.query(insertStatement, (err, result) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } else {
      console.log("Da cap nhat mien trung");
    }
  });
};

const updateDacBietTuan = async (req, res) => {
  const currentDay = moment().tz("Asia/Ho_Chi_Minh").toDate();

  var selectStatement = `SELECT html FROM dacbiettuan WHERE id = ${currentDay.getFullYear()}`;
  db.query(selectStatement, async (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (!result[0]) {
      const response = await axios.get(
        `https://xskt.com.vn/thong-ke-giai-dac-biet-theo-nam/xsmb-${currentDay.getFullYear()}`
      );
      const htmlString = await response.data;
      const $ = cheerio.load(htmlString);
      const table = $("div.toanquoc > div > table.sp:last")
        .html()
        .replace(/"/g, "'");
      var insertStatement = `INSERT INTO dacbiettuan (id, html) VALUES (${currentDay.getFullYear()}, "${table}")`;
      db.query(insertStatement, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    } else {
      const response = await axios.get(
        `https://xskt.com.vn/thong-ke-giai-dac-biet-theo-nam/xsmb-${currentDay.getFullYear()}`
      );
      const htmlString = await response.data;
      const $ = cheerio.load(htmlString);
      const table = $("div.toanquoc > div > table.sp:last")
        .html()
        .replace(/"/g, "'");
      var insertStatement = `UPDATE dacbiettuan SET html = "${table}" WHERE id = ${currentDay.getFullYear()}`;
      db.query(insertStatement, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

const updateDacBietThang = async () => {
  const response = await axios.get(
    `https://www.hdmediagroup.vn/giaidbtheothang.html`
  );
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const body = $.html().replace(/"/g, "'");

  var insertStatement = `UPDATE dacbietthang SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat dac biet thang");
    }
  });
};

const updateDacBietNam = async () => {
  const currentDay = moment().tz("Asia/Ho_Chi_Minh").toDate();

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
  const response = await axios.get(
    `https://thongkemienbac.com/thong-ke-giai-dac-biet-nam-${year}.html`
  );
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const content = $("section.content").html().replace(/"/g, "'");
  var insertStatement = `UPDATE dacbietnam SET html = "${content}" WHERE nam = "${year}"`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat dac biet nam");
    }
  });
};

const themNam = async (year) => {
  const response = await axios.get(
    `https://thongkemienbac.com/thong-ke-giai-dac-biet-nam-${year}.html`
  );
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const content = $("section.content").html().replace(/"/g, "'");
  var insertStatement = `INSERT INTO dacbietnam (nam, html) VALUES (${year},"${content}")`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da them dac biet nam");
    }
  });
};

const updateTanSuatLo = async () => {
  const response = await axios.get(`https://ketquade11.com/tan-suat-loto.html`);
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const body = $("table#normtable").html().replace(/"/g, "'");

  var insertStatement = `UPDATE tansuatlo SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat tan suat lo");
    }
  });
};

const updateTanSuatLoTo = async () => {
  const response = await axios.get(
    `https://ketquade11.com/tan-suat-loto-theo-cap.html`
  );
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const body = $("table#normtable").html().replace(/"/g, "'");

  var insertStatement = `UPDATE tansuatloto SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat tan suat lo to");
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
  getTanSuatLo,
  getTanSuatLoTo,
  getCurrentTime,
  updateKetQuaMienBac,
  updateKetQuaMienNam,
  updateKetQuaMienTrung,
  updateDacBietTuan,
  updateDacBietThang,
  updateDacBietNam,
  updateTanSuatLo,
  updateTanSuatLoTo,
};
