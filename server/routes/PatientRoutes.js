const express = require("express");
const { validateRegister } = require("../middlewares/validate");

// const PatientRegistrationController = require("../controller/PatientRegistrationController");

const router = express.Router();

router.post(
  "/patient-registration",
  validateRegister,
  PatientRegistrationController.store
);
router.get("/patient-registration", PatientRegistrationController.show);

module.exports = router;
