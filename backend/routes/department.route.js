const express = require('express');
const router = express.Router();

const {
  getDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  getTicketOfDepartment,
  generateReport,
  fetchReport,
} = require('../controllers/department.controller');

router.post('/fetch-report', fetchReport);
router.post('/', addDepartment);
router.get('/generate-report', generateReport);
router.get('/ticket', getTicketOfDepartment);
router.get('/', getDepartment);
router.put('/', updateDepartment);
router.delete('/', deleteDepartment);

module.exports = router;
