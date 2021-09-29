const express = require('express');
const router = express.Router();
const {
  getTickets,
  addTicket,
  deleteTicket,
  updateTicket,
  updateStatus,
  getTicket,
  getAllTickets,
  updateMsgTicket,
  generateReport,
  fetchReport,
} = require('../controllers/ticket.controller');

const { authorize } = require('../middleware/auth.middleware');

router.get('/', authorize, getTickets);
router.get('/get-all-tickets', getAllTickets);
router.get('/:id', authorize, getTicket);
router.post('/', authorize, addTicket);
router.delete('/:id', deleteTicket);
router.put('/:id', updateTicket);
router.post('/update-ticket', updateMsgTicket);
router.put('/status/:id', updateStatus);
router.post('/generate-report', generateReport);
router.post('/fetch-report', fetchReport);

module.exports = router;
