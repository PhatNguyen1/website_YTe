const express = require("express");

const Catalog_EthnicController = require("../controller/Catalog_EthnicController");

const router = express.Router();

router.get("/ethnic", Catalog_EthnicController.index);
router.get("/ethnic/:id", Catalog_EthnicController.show);

module.exports = router;
