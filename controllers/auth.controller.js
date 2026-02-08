// const User = require("../models/User");

// exports.loginOrRegister = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email & Password required" });
//     }

//     // 👇 تحديد هل Admin ولا User
   
//     const adminEmails = process.env.ADMIN_EMAILS
//   .split(",")
//   .map(e => e.trim().toLowerCase());

// const isAdmin = adminEmails.includes(email.trim().toLowerCase());

// console.log("Admins:", adminEmails);
// console.log("Email:", email);

//     let user = await User.findOne({ email });

//     // لو اليوزر موجود
//     if (user) {
//       return res.status(200).json({
//         message: "Login successful",
//         email: user.email,
//         role: user.role,
//       });
//     }

//     // لو مش موجود → نسجله تلقائي
//     user = await User.create({
//       email,
//       password,
//       role: isAdmin ? "admin" : "user",
//     });

//     return res.status(201).json({
//       message: "Registered & logged in",
//       email: user.email,
//       role: user.role,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const User = require("../models/User");

exports.loginOrRegister = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    email = email.trim().toLowerCase();

    const adminEmails = process.env.ADMIN_EMAILS
      .split(",")
      .map(e => e.trim().toLowerCase());

    const isAdmin = adminEmails.includes(email);

    let user = await User.findOne({ email });

    // لو موجود قبل كده
    if (user) {
      // 👇 لو بقى أدمن دلوقتي
      if (isAdmin && user.role !== "admin") {
        user.role = "admin";
        await user.save();
      }

      return res.status(200).json({
        message: user.role === "admin" ? "Admin login" : "Login successful",
        email: user.email,
        role: user.role,
      });
    }

    // مش موجود → تسجيل جديد
    user = await User.create({
      email,
      password,
      role: isAdmin ? "admin" : "user",
    });

    return res.status(201).json({
      message: "Registered & logged in",
      email: user.email,
      role: user.role,
    });




  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
