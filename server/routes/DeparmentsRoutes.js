const express = require("express");

const DepartmentsController = require("../controller/DepartmentsController");

const router = express.Router();

router.get("/departments", DepartmentsController.index);
router.get("/departments/:id", DepartmentsController.show);

module.exports = router;
