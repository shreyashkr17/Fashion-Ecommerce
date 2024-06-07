const express = require("express")
const router = express.Router();
const InstgramController = require("../controller/instagram.controller.js");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/upload-instagram',upload.single('file'), InstgramController.postInstagram);
router.get('/get-all-instagram', InstgramController.getAllInstagram);

module.exports = router;