// const User = require("../models/User");

// exports.loginOrRegister = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email & password required" });
//     }

//     const adminEmails = process.env.ADMIN_EMAILS.split(",");

//     let user = await User.findOne({ email });

//     // لو موجود
//     if (user) {
//       return res.status(200).json({
//         message: "Login successful",
//         email: user.email,
//         role: user.role,
//       });
//     }

//     // لو جديد
//     const role = adminEmails.includes(email) ? "admin" : "user";

//     user = await User.create({
//       email,
//       password,
//       role,
//     });

//     return res.status(201).json({
//       message: "User registered",
//       email: user.email,
//       role: user.role,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const loginOrRegister = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: "Email & password required" });

//     let user = await User.findOne({ email });

//     if (!user) {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       user = await User.create({
//         email,
//         password: hashedPassword,
        
//         role: "admin",
//       });
//     } else {
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch)
//         return res.status(400).json({ message: "Wrong password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       email: user.email,
//       role: user.role,
//     });
//     // في ملف register مؤقت أو في mongo shell

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { loginOrRegister };
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin login - for admins only
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    // Get admin emails from environment and trim whitespace
    const adminEmails = process.env.ADMIN_EMAILS?.split(",").map(e => e.trim()) || [];
    
    console.log("Admin emails list:", adminEmails);
    console.log("Attempting login with email:", email);

    // Check if email is authorized as admin
    if (!adminEmails.includes(email)) {
      console.log("Email not authorized");
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Search for admin user in database
    let admin = await User.findOne({ email });

    // If admin doesn't exist, create admin account
    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await User.create({
        email,
        password: hashedPassword,
        role: "admin",
      });
    } else {
      // Admin exists, verify password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }
    }

    // Create JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return response with success flag and role
    res.status(200).json({
      success: true,
      role: "admin",
      token,
      email: admin.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminLogin };
