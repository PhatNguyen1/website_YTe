const express = require("express");

const ServiceController = require("../controller/ServiceController");

const router = express.Router();

router.get(
  "/services",
  ServiceController.index
);
// router.get("/technicalservicecategory/:id", ServiceController.show);
router.get(
  "/services/:id",
  ServiceController.show
);
// router.get("/technicalservicecategory-code/:code", ServiceController.showCode);

module.exports = router;
