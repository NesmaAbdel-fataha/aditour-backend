const express = require("express");
const router = express.Router();
const { createContact, getAllContacts } = require("../controllers/contact.controller");

router.post("/", createContact);
router.get("/", getAllContacts);

module.exports = router;
