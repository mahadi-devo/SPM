const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  getUserController,
} = require("../controllers/auth.controller");
const { register, login } = require("../validations/auth.validation");
const validationMiddleware = require("../middleware/validation.middleware");
const {roleAuthorization} = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/auth.middleware");
const { AccessRights } = require("../common/accessRights");

router.post("/register", validationMiddleware(register), registerController);

router.post("/login", validationMiddleware(login), loginController);

router.get(
  "/user",
  authorize,
  roleAuthorization([AccessRights.admin, AccessRights.user, AccessRights.organizationalUser]),
  getUserController
);

module.exports = router;
