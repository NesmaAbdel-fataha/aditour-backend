const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    // Log incoming request body for debugging
    console.log("POST /api/users - Incoming data:", req.body);

    const { name, email, phone, position, message, operationAddress } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !position || !message || !operationAddress) {
      console.log("Validation failed - Missing fields");
      return res.status(400).json({ 
        message: "Email & Message required",
        missing: {
          name: !name,
          email: !email,
          phone: !phone,
          position: !position,
          message: !message,
          operationAddress: !operationAddress
        }
      });
    }

    // Create contact with all fields
    const contact = await Contact.create({ 
      name, 
      email, 
      phone, 
      position, 
      message, 
      operationAddress
    });

    console.log("Contact created successfully:", contact._id);
    res.status(201).json({ 
      message: "Message sent successfully", 
      contact 
    });
  } catch (error) {
    console.error("Error creating contact:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
