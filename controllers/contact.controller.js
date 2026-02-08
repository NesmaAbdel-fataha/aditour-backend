const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { senderEmail, message } = req.body;
    if (!senderEmail || !message) return res.status(400).json({ message: "Email & Message required" });

    const contact = await Contact.create({ senderEmail, message });
    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
