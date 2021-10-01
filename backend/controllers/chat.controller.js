const Chat = require('../models/chat.model');
const Ticket = require('../models/ticket.model');
const ApiError = require('../utils/apiError');

const getChatByTicketId = async (req, res, next) => {
  try {
    const chat = await Chat.find({ ticketId: req.params.id })
      .populate('user')
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

const createChatByTicketId = async (req, res, next) => {
  try {
    const { message } = req.body;

    const ticket = await Ticket.findOne({ id: req.params.id });

    if (!ticket) {
      return new ApiError('Ticket is not exist', 400);
    }

    const chat = await Chat.create({
      user: req.user._id,
      ticketId: req.params.ticketId,
      message,
    });

    res.status(200).json({
      success: true,
      chat,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

const updateChatByChatId = async (req, res, next) => {
  try {
    const { message } = req.body;

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return new ApiError('Chat not exist', 400);
    }

    const chatResponse = await Chat.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          message,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: chatResponse,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

const deleteChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndRemove(req.params.id);

    res.status(200).json({
      chat,
      success: true,
    });
  } catch (e) {
    if (e.status) {
      console.log(e);
    }
    return next(new ApiError(e.message, 500));
  }
};

module.exports = {
  getChatByTicketId,
  createChatByTicketId,
  updateChatByChatId,
  deleteChatById,
};
