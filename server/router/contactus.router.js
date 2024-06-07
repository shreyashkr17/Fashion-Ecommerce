const express = require("express")
const router = express.Router();
const ContactusController = require('../controller/contactus.controller');
const verifyAuth = require("../middleware/verifyAuth");

router.post('/post-query', ContactusController.postQuery);
router.post('/subscription-email', ContactusController.subscriptionEmail)
router.post('/send-email', verifyAuth.authenticateJWt, ContactusController.sendEmail)

module.exports = router;