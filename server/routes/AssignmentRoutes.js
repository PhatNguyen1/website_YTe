const express = require("express");

const AssignmentController = require("../controller/AssignmentController");

const router = express.Router();

router.get("/assignments", AssignmentController.index);
router.get("/assignments/:id", AssignmentController.show);

router.post("/assignments", AssignmentController.store);

router.post("/assignmentstest", AssignmentController.storeTest);

module.exports = router;

