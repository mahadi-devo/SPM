const Ticket = require('../models/ticket.model');
const Chat = require('../models/chat.model');
const pdf = require('html-pdf');
const cloudinary = require('cloudinary').v2;
const pdfTemplate = require('../utils/pdfTemplate');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getTickets = async (req, res) => {
  console.log(req.user);
  try {
    const user = req.user;
    const tickets = await Ticket.find({ user: user._id }).populate(
      'department'
    );
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('department');
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Ticket.findById(id).populate('department');
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
      upload_preset: 'ml_default',
    });
    const newTicket = new Ticket({
      user: user,
      name: name,
      email: email,
      department: department,
      subject: subject,
      message: message,
      file: uploadResponse.secure_url,
      status: 'open',
    });

    const ticket = await newTicket.save();

    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    await Ticket.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTicket = async (req, res) => {};

const closeTicket = async (req, res) => {};

const updateMsgTicket = async (req, res) => {
  try {
    console.log(req.user, req.body.message, req.body.ticketId);

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

const updateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Ticket.updateOne({ _id: id }, { status: 'closed' });
    res.status(200).json({ msg: 'success' });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const generateReport = async (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err, result) => {
    if (err) {
      res.send(Promise.reject());
    }
    console.log(result);
    res.send(Promise.resolve());
  });
};

const fetchReport = (req, res) => {
  res.sendFile(`C:/Users/Pasindu Jayawardena/Desktop/spm/SPM/result.pdf`);
};

module.exports = {
  getTickets,
  addTicket,
  fetchReport,
  deleteTicket,
  updateTicket,
  updateStatus,
  getTicket,
  getAllTickets,
  updateMsgTicket,
  closeTicket,
  generateReport,
};
