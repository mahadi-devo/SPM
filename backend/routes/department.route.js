const express = require('express');
const router = express.Router();

const { getDepartment, addDepartment } = require('../controllers/department.controller');

router.post('/', addDepartment);
router.get('/', getDepartment);

module.exports = router;