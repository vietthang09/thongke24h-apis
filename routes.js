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
} = require("./controllers");

const router = express.Router();

router.get("/ketquamienbac/:ngay", getKetQuaMienBac);
router.get("/ketquamiennam/:ngay", getKetQuaMienNam);
router.get("/ketquamientrung/:ngay", getKetQuaMienTrung);
router.get("/ketquamienbac30ngay/:ngay", getKetQuaMienBac30Ngay);
router.get("/ketquamiennam30ngay/:ngay", getKetQuaMienNam30Ngay);
router.get("/ketquamientrung30ngay/:ngay", getKetQuaMienTrung30Ngay);
router.get("/dacbiettuan", getDacBietTuan);
router.get("/dacbietthang", getDacBietThang);
router.get("/dacbietnam/:nam", getDacBietNam);

module.exports = router;
