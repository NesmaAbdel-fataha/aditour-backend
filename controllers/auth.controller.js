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

const loginOrRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    // لو عندك Admins محددين في .env
    const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

    // نبحث عن المستخدم في DB
    let user = await User.findOne({ email });

    if (!user) {
      // المستخدم جديد → هنعمل تسجيله
      const hashedPassword = await bcrypt.hash(password, 10);

      // لو الإيميل موجود في قائمة Admins → role = admin
      const role = adminEmails.includes(email) ? "admin" : "user";

      user = await User.create({
        email,
        password: hashedPassword,
        role,
      });
    } else {
      // المستخدم موجود → نتحقق من كلمة السر
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Wrong password" });
    }

    // إنشاء JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // إرجاع البيانات + التوكن
    res.json({
      message: "Login successful",
      token,
      email: user.email,
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginOrRegister };
