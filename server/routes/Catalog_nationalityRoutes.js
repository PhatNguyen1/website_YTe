const express = require("express");

const Catalog_NationalityController = require("../controller/Catalog_NationalityController");

const router = express.Router();

router.get("/nationality", Catalog_NationalityController.index);
router.get("/nationality/:id", Catalog_NationalityController.show);

module.exports = router;
