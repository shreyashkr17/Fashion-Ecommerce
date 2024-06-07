const express = require("express")
const router = express.Router();
const PostController = require("../controller/post.controller");
const verifyAuth = require("../middleware/verifyAuth");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/upload-post',upload.array('files'), PostController.uploadPost);
router.post('/post-comments', verifyAuth.authenticateJWt, PostController.addComments);
router.post('/get-all-comments', PostController.getAllComments);
router.post('/get-post-detail', PostController.getPostDetails);
router.post('/post-related-posts', PostController.addRelatedPosts);
router.post('/get-all-related-posts', PostController.getAllRelatedPost);

// get methods
router.get('/get-all-posts', PostController.getAllPosts);
router.get('/gather-distinct-slug', PostController.gatherSlugCounts);

router.post('/delete-post', PostController.deletePosts);
router.post('/update-post', PostController.updateBlog);

module.exports = router;