const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
		message: {
			type: String,
			required: true,
		},
		type: {
			type: Number,
			enum: [0,1],
			default: 0
		},
		ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "ticket" }
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("chat", ChatSchema);
