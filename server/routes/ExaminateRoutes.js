const express = require("express");

const {
  ExaminationController,
} = require("../controller/ExaminationController");

const router = express.Router();

router.get("/examinations", ExaminationController.index);
router.get("/examinations/:id", ExaminationController.show);
router.post("/examinations", ExaminationController.store);
router.delete("/examinations/:id", ExaminationController.destroy);
router.put("/examinations/:id", ExaminationController.update);

//test
router.post("/examinations-total",ExaminationController.total)

module.exports = router;
