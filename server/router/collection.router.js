const express = require('express');
const router = express.Router();
const verifyAuth = require("../middleware/verifyAuth");
const CollectionController = require('../controller/collection.controller');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/post-collection', upload.single('file'), CollectionController.postCollection);
router.post('/delete-collection', CollectionController.deleteCollection);

router.get('/get-collection', CollectionController.getAllCollections);

router.post('/update-collection', CollectionController.updateCollection);

router.post('/get-single-collection', CollectionController.getCollectionDetail);


module.exports = router