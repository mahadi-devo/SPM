const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const { register, login } = require("../validations/auth.validation");
const validationMiddleware = require("../middleware/validation.middleware");

router.post("/register", validationMiddleware(register), registerController);

router.post("/login", validationMiddleware(login), loginController);

router.post("/logout", logoutController);

module.exports = router;
