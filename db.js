const mysql = require("mysql");

const db = mysql.createConnection({
  user: "thongke24h",
  host: "153.92.222.161",
  password: "vZmGdTrkkJ3V4b2YAgUg",
  database: "thongke24h",
  // user: "root",
  // host: "localhost",
  // password: "",
  // database: "thongke24h",
});

module.exports = db;
