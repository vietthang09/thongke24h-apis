const { default: axios } = require("axios");
const db = require("./db");
const cheerio = require("cheerio");
var moment = require("moment-timezone");
const stopCrawl = (year, month, day) => {
  const today = new Date();
  return (
    new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ).getTime() === new Date(year, month, day).getTime()
  );
};

const testCrawling = async () => {
  const currentDay = moment().tz("Asia/Ho_Chi_Minh").toDate();

  var selectStatement = `SELECT html FROM dacbiettuan WHERE id = ${currentDay.getFullYear()}`;
  db.query(selectStatement, async (err, result) => {
    if (err) {
      return res.status(404).json({ error: err });
    }
    if (result[0]) {
      const response = await fetch(
        `https://xskt.com.vn/thong-ke-giai-dac-biet-theo-nam/xsmb-${currentDay.getFullYear()}`
      );
      const htmlString = await response.text();
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
    } else {
      const response = await fetch(
        `https://xskt.com.vn/thong-ke-giai-dac-biet-theo-nam/xsmb-${currentDay.getFullYear()}`
      );
      const htmlString = await response.text();
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
    }
  });

  const response = await axios.get(
    `https://www.hdmediagroup.vn/giaidacbiettheotuan.html`
  );
  const htmlString = await response.data;
  const $ = cheerio.load(htmlString);
  const body = $("form#HeaderForm").html().replace(/"/g, "'");

  var insertStatement = `UPDATE dacbiettuan SET html = "${body}" WHERE id = 0`;
  db.query(insertStatement, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Da cap nhat dac biet tuan");
    }
  });
};

// testCrawling();

const crawlDataMienBac = async () => {
  for (let year = 2010; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
        const todayString = `${day < 10 ? "0" + day : day}-${
          month < 10 ? "0" + month : month
        }-${year}`;
        if (stopCrawl(year, month, day)) {
          console.log("Finished at", todayString);
          return;
        }
        console.log("Saving", todayString);
        const response = await fetch(
          `https://www.hdmediagroup.vn/ket-qua-xo-so-mien-bac-ngay-${todayString}.html`
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
        } else {
          continue;
        }
      }
    }
  }
};

const crawlDataMienNam = async () => {
  "Asia/Ho_Chi_Minh";
  for (let year = 2010; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
        const todayString = `${day < 10 ? "0" + day : day}-${
          month < 10 ? "0" + month : month
        }-${year}`;
        if (stopCrawl(year, month, day)) {
          console.log("Finished at", todayString);
          return;
        }
        console.log("Saving", todayString);
        const response = await fetch(
          `https://www.hdmediagroup.vn/xo-so-mien-nam-ngay-${todayString}.html`
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
        } else {
          continue;
        }
      }
    }
  }
};

const crawlDataMienTrung = async () => {
  for (let year = 2010; year <= 2023; year++) {
    for (let month = 1; month <= 12; month++) {
      for (let day = 1; day <= new Date(year, month, 0).getDate(); day++) {
        const todayString = `${day < 10 ? "0" + day : day}-${
          month < 10 ? "0" + month : month
        }-${year}`;
        if (stopCrawl(year, month, day)) {
          console.log("Finished at", todayString);
          return;
        }
        console.log("Saving", todayString);
        const response = await fetch(
          `https://www.hdmediagroup.vn/xo-so-mien-trung-ngay-${todayString}.html`
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
        } else {
          continue;
        }
      }
    }
  }
};

const crawlDataDacBietTuan = async () => {
  for (let year = 2010; year <= 2023; year++) {
    console.log("Saving", year);
    const response = await fetch(
      `https://xskt.com.vn/thong-ke-giai-dac-biet-theo-nam/xsmb-${year}`
    );
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const table = $("div.toanquoc > div > table.sp:last")
      .html()
      .replace(/"/g, "'");
    var insertStatement = `INSERT INTO dacbiettuan (id, html) VALUES (${year}, "${table}")`;
    db.query(insertStatement, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
  }
};
crawlDataDacBietTuan();
const crawlDataDacBietThang = async () => {
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
    }
  });
};

const crawlDataDacBietNam = async () => {
  for (let year = 2010; year <= 2023; year++) {
    console.log("Saving", year);
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
      }
    });
  }
  console.log("DONE!");
  return;
};
