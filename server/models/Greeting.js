const mongoose = require("mongoose");

const greetingSchema = new mongoose.Schema(
  {
    greetingId: {
      type: String,
      required: true,
      unique: true,
    },

    senderName: {
      type: String,
      required: true,
      trim: true,
    },

    recipientName: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      maxlength: 240,
    },

    template: {
      type: String,
      enum: ["royal", "traditional", "midnight"],
      default: "royal",
    },

    photoUrl: {
      type: String,
      default: "",
    },

    photoPublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Greeting", greetingSchema);