const express = require('express');
const router = express.Router();

const { getDepartment, addDepartment, updateDepartment, deleteDepartment, getTicketOfDepartment } = require('../controllers/department.controller');

router.post('/', addDepartment);
router.get('/ticket', getTicketOfDepartment);
router.get('/', getDepartment);
router.put('/', updateDepartment);
router.delete('/', deleteDepartment);

module.exports = router;