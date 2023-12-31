const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
