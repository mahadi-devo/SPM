const express = require('express');
const router = express.Router();

const {
  addUser,
  getAllUser,
  updateUser,
  deleteUser,
  generateReport,
  fetchReport,
} = require('../controllers/user.controller');

router.post('/fetch-report', fetchReport);
router.get('/generate-report', generateReport);
router.post('/', addUser);
router.get('/', getAllUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

module.exports = router;
