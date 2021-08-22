const express = require('express');
const router = express.Router();

const { addUser, getAllUser } = require('../controllers/user.controller');

router.post('/', addUser);
router.get('/', getAllUser);

module.exports = router;
