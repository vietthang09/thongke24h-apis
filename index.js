const express = require("express");
const thongke24h = require("./routes");
const cors = require("cors");
var cron = require("node-cron");
const app = express();
const {
  updateKetQuaMienBac,
  updateKetQuaMienNam,
  updateKetQuaMienTrung,
  updateDacBietTuan,
  updateDacBietThang,
  updateDacBietNam,
} = require("./controllers");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", thongke24h);

cron.schedule("* * * * * *", () => {
  updateKetQuaMienBac();
  updateKetQuaMienNam();
  updateKetQuaMienTrung();
  // updateDacBietTuan();
  // updateDacBietThang();
  // updateDacBietNam();
});

app.listen(6000, () => {
  console.log("listening on port 6000");
});
