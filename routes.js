const express = require("express");
const {
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
} = require("./controllers");

const router = express.Router();

router.get("/ketquamienbac/:ngay", getKetQuaMienBac);
router.get("/ketquamiennam/:ngay", getKetQuaMienNam);
router.get("/ketquamientrung/:ngay", getKetQuaMienTrung);
router.get("/ketquamienbac30ngay/:ngay", getKetQuaMienBac30Ngay);
router.get("/ketquamiennam30ngay/:ngay", getKetQuaMienNam30Ngay);
router.get("/ketquamientrung30ngay/:ngay", getKetQuaMienTrung30Ngay);
router.get("/dacbiettuan/:nam", getDacBietTuan);
router.get("/dacbietthang", getDacBietThang);
router.get("/dacbietnam/:nam", getDacBietNam);
router.get("/tansuatlo", getTanSuatLo);
router.get("/tansuatloto", getTanSuatLoTo);
router.get("/kiemtrathoigian", getCurrentTime);

module.exports = router;
