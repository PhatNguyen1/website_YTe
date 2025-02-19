const express = require("express");

const DistrictController = require("../controller/DistrictController");

const router = express.Router();

router.get("/district", DistrictController.index);
router.get("/district/:id", DistrictController.show);

module.exports = router;
