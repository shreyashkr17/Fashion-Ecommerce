const express = require("express")
const router = express.Router();
const ProductController = require('../controller/product.controller')

const verifyAuth = require("../middleware/verifyAuth");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post('/upload-product', ProductController.uploadProduct);
router.post('/upload-sm-picture',  upload.array('files'), ProductController.uploadSmPicture);
router.post('/upload-lg-picture', upload.array('files'), ProductController.uploadLgPicture);
router.get('/get-all-product-names', ProductController.getAllProductNames);
router.post('/get-sm-pictures', ProductController.getSmPicsByProductId);
router.post('/get-sm-picture-by-productId', ProductController.getSmPics);
router.post('/get-lg-pictures', ProductController.getLgPicsByProductId);
router.post('/get-single-product-detail', ProductController.getSingleProductDetail);
router.post('/add-variant-product', ProductController.addVariantsByProduct);
router.post('/get-variant-by-product', ProductController.getVariantsByProducts);
router.post('/get-variant-size-by-product', ProductController.getSizesByProduct);
router.get('/get-top-product', ProductController.getTopProducts);
router.post('/get-related-product-by-slug', ProductController.getRelatedProductDetails)
router.get('/get-count-product-category', ProductController.getProductCountProducts)
router.get('/get-count-product-occasion-category', ProductController.getProductOccasionCountProducts)
router.get('/get-count-product-material-category', ProductController.getProductMaterialCountProducts)
router.get('/get-product-by-productAmountEarned', ProductController.getTopProductsByAmountEarned)
router.post('/upload-comment-by-product', verifyAuth.authenticateJWt, ProductController.postCommentProduct)
// delete Product
router.delete('/delete-product', ProductController.deleteProductBySlug);
router.post('/update-related-product', ProductController.updateRelatedProduct);
// get method
router.get('/get-all-products', ProductController.getAllPRoduct);
router.get('/get-all-products-variant-lgPics-smPics', ProductController.getAllProductsVaraintLgPicsSmPics);

module.exports = router;