const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

router.post("/contact", contactController.createContact);
router.get("/contact", contactController.getAllContacts);

module.exports = router;
