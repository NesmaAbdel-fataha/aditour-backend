// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema({
//   senderEmail: { type: String, required: true },
//   message: { type: String, required: true },
// }, { timestamps: true });

// module.exports = mongoose.model("Contact", contactSchema);
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    operationAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
