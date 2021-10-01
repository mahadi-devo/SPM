const express = require('express');
const router = express.Router();
const {
  getChatByTicketId,
  updateChatByChatId,
  deleteChatById,
  createChatByTicketId,
} = require('../controllers/chat.controller');
const { roleAuthorization } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/auth.middleware');
const { AccessRights } = require('../common/accessRights');

router.get('/:id', authorize, getChatByTicketId);
router.patch('/:id', authorize, updateChatByChatId);
router.delete('/:id', authorize, deleteChatById);
router.post('/:ticketId', authorize, createChatByTicketId);

module.exports = router;
