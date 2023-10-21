const express = require("express");
const thongke24h = require("./routes");
const cors = require("cors");
var cron = require("node-cron");
const app = express();
const moment = require("moment-timezone");
const {
  updateKetQuaMienBac,
  updateKetQuaMienNam,
  updateKetQuaMienTrung,
  updateDacBietTuan,
  updateDacBietThang,
  updateDacBietNam,
  updateTanSuatLo,
  updateTanSuatLoTo,
} = require("./controllers");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", thongke24h);

cron.schedule("1 * * * * *", () => {
  const startMienBac = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 31, second: 0 })
    .toDate();
  const endMienBac = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 35, second: 0 })
    .toDate();

  const startMienNam = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 31, second: 0 })
    .toDate();
  const endMienNam = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 35, second: 0 })
    .toDate();

  const startMienTrung = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 31, second: 0 })
    .toDate();
  const endMienTrung = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 18, minute: 35, second: 0 })
    .toDate();

  const startTanSuat = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 19, minute: 0, second: 0 })
    .toDate();
  const endTanSuat = moment()
    .tz("Asia/Ho_Chi_Minh")
    .set({ hour: 19, minute: 5, second: 0 })
    .toDate();

  const currentTime = moment().tz("Asia/Ho_Chi_Minh").toDate();
  if (startMienBac < currentTime && currentTime < endMienBac) {
    updateKetQuaMienBac();
    updateDacBietTuan();
    updateDacBietThang();
    updateDacBietNam();
  } else {
    console.log("Doi cap nhat mien bac");
  }
  if (startMienNam < currentTime && currentTime < endMienNam) {
    updateKetQuaMienNam();
  } else {
    console.log("Doi cap nhat mien nam");
  }
  if (startMienTrung < currentTime && currentTime < endMienTrung) {
    updateKetQuaMienTrung();
  } else {
    console.log("Doi cap nhat mien trung");
  }
  if (startTanSuat < currentTime && currentTime < endTanSuat) {
    updateTanSuatLo();
    updateTanSuatLoTo();
  } else {
    console.log("Doi cap nhat tan suat");
  }
});

app.listen(5001, () => {
  console.log("listening on port 5001");
});
