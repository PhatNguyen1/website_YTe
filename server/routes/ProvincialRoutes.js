const express = require("express");

const ProvincialController = require("../controller/ProvincialController");

const router = express.Router();

router.get("/provincial", ProvincialController.index);
router.get("/provincial/:id", ProvincialController.show);
router.get("/provincial-code/:code", ProvincialController.showCode);

module.exports = router;
