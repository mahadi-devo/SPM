const express = require('express');
const router = express.Router();

const {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.post('/', addUser);
router.get('/', getAllUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
