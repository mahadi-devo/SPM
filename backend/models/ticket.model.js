const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "closed", "open", "on hold", "resolved"],
      default: "open",
    },
    file: {
      type: String,
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("ticket", TicketSchema);
