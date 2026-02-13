const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// 👑 Admin Dashboard Route
router.get(
  "/admin/dashboard",
  auth,
  isAdmin,
  async (req, res) => {
    try {
      const users = await User.find().select("email role");
      const messages = await Contact.find().sort({ createdAt: -1 });

      res.json({ users, messages });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
