const express = require("express");

const WardController = require("../controller/WardController");

const router = express.Router();

router.get("/ward", WardController.index);
router.get("/ward/:id", WardController.show);

module.exports = router;
