const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Contact = require("../models/Contact");

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// GET /api/users - Return all users from database
router.get("/users", async (req, res) => {
  try {
    console.log("GET /api/users - Fetching all users");
    const users = await User.find().select("email role");
    console.log("Users found:", users.length);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 👑 Admin Dashboard Route - Protected with auth and isAdmin middleware
router.get(
  "/admin/dashboard",
  auth,
  isAdmin,
  async (req, res) => {
    try {
      console.log("GET /api/admin/dashboard - Fetching dashboard data");
      const users = await User.find().select("email role");
      const messages = await Contact.find().sort({ createdAt: -1 });

      console.log("Users found:", users.length);
      console.log("Messages found:", messages.length);

      res.json({ users, messages });
    } catch (err) {
      console.error("Error fetching dashboard data:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
