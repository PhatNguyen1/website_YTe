const express = require("express");

const CareerController = require("../controller/CareerController");

const router = express.Router();

router.get("/career", CareerController.index);
router.get("/career/:id", CareerController.show);

module.exports = router;
