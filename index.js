require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Auth routes - POST /api/auth/login for admin login only
app.use("/api/auth", require("./routes/auth.routes"));

// User submission routes - POST /api/users and GET /api/users
app.use("/api", require("./routes/contact.routes"));

// Admin dashboard route - Protected by auth and isAdmin middleware
app.use("/api", require("./routes/adminRoutes"));

app.get("/", (req, res) => res.send("Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
