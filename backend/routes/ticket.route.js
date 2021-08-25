const express = require('express');
const router = express.Router();
const {
  getTickets,
  addTicket,
  deleteTicket,
  updateTicket,
  updateStatus,
  getTicket,
} = require('../controllers/ticket.controller');

const { authorize } = require('../middleware/auth.middleware');

router.get('/', authorize, getTickets);
router.get('/:id', authorize, getTicket);
router.post('/', authorize, addTicket);
router.delete('/:id', deleteTicket);
router.put('/:id', updateTicket);
router.put('/status/:id', updateStatus);

module.exports = router;
