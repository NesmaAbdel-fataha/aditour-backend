require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const contactRoutes = require("./routes/contact.routes");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/contact", require("./routes/contact.routes"));
const adminRoutes = require("./routes/adminRoutes");

app.use("/api", adminRoutes);

app.get("/", (req, res) => res.send("Server is running"));
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
