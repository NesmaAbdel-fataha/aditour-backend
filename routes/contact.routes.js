const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// User submission endpoints
router.post("/users", contactController.createContact);
router.get("/users", contactController.getAllContacts);

module.exports = router;
