const Ticket = require("../models/ticket.model");
const Chat = require("../models/chat.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getTickets = async (req, res) => {
  try {
    const user = req.user;
    const tickets = await Ticket.find({ user: user._id }).populate(
      "department"
    );
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("department");
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Ticket.findById(id).populate("department");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500);
  }
};

const addTicket = async (req, res) => {
  try {
    const { name, email, department, subject, message, file } = req.body;
    const user = req.user;

    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "ml_default",
    });
    const newTicket = new Ticket({
      user: user,
      name: name,
      email: email,
      department: department,
      subject: subject,
      message: message,
      file: uploadResponse.secure_url,
      status: "open",
    });

    const ticket = await newTicket.save();

    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTicket = async (req, res) => {};

const updateTicket = async (req, res) => {};

const updateMsgTicket = async (req, res) => {
  try {
    console.log(req.user, req.body.message, req.body.ticketId)

    const newChat = new Chat({
      user: req.user,
      message: req.body.message,
      ticketId: req.body.ticketId,
    });
    const chats = newChat.save();
    res.status(200).json({ chats });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateStatus = async (req, res) => {};

module.exports = {
  getTickets,
  addTicket,
  deleteTicket,
  updateTicket,
  updateStatus,
  getTicket,
  getAllTickets,
  updateMsgTicket,
};
