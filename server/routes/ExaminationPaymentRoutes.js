const express = require("express");

const ExaminationPaymentsController = require("../controller/ExaminationPaymentsController");

const router = express.Router();

router.get("/examination-payments", ExaminationPaymentsController.index);
router.get("/examination-payments/:id", ExaminationPaymentsController.show);
router.post("/examination-payments", ExaminationPaymentsController.store);
router.delete("/examination-payments/:id", ExaminationPaymentsController.destroy);
router.put("/examination-payments/:id", ExaminationPaymentsController.update);

module.exports = router;
