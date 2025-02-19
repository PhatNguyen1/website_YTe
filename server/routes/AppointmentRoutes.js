const express = require("express");

const AppointmentController = require("../controller/AppointmentController");

const router = express.Router();

router.get("/appointment", AppointmentController.index);
router.get("/appointment/:id", AppointmentController.show);
router.post("/appointment", AppointmentController.store);
router.delete("/appointment/:id", AppointmentController.destroy);
router.put("/appointment/:id", AppointmentController.update);

module.exports = router;
