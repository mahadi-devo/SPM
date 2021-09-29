const express = require('express');
const router = express.Router();

const { getDepartment, addDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.controller');

router.post('/', addDepartment);
router.get('/', getDepartment);
router.put('/', updateDepartment);
router.delete('/', deleteDepartment);

module.exports = router;