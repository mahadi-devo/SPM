const express = require('express');
const router = express.Router();
const {
  registerController,
  loginController,
  getUserController,
} = require('../controllers/auth.controller');
