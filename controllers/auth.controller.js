const User = require("../models/User");

exports.loginOrRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const adminEmails = process.env.ADMIN_EMAILS.split(",");

    let user = await User.findOne({ email });

    // لو موجود
    if (user) {
      return res.status(200).json({
        message: "Login successful",
        email: user.email,
        role: user.role,
      });
    }

    // لو جديد
    const role = adminEmails.includes(email) ? "admin" : "user";

    user = await User.create({
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: "User registered",
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

