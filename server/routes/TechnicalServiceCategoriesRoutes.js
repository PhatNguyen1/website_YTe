const express = require("express");

const TechnicalServiceCategoryController = require("../controller/TechnicalServiceCategoryController");

const router = express.Router();

router.get(
  "/technicalservicecategory",
  TechnicalServiceCategoryController.index
);
// router.get("/technicalservicecategory/:id", TechnicalServiceCategoryController.show);
router.get(
  "/technicalservicecategory/:id",
  TechnicalServiceCategoryController.show
);
// router.get("/technicalservicecategory-code/:code", TechnicalServiceCategoryController.showCode);

module.exports = router;
