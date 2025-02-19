const { body, validationResult } = require("express-validator");

const validateRegister = [
  // Nhận dữ liệu từ req thông qua post
  body("fullName").notEmpty().withMessage("Vui lòng nhập họ và tên!"),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegister,
};
