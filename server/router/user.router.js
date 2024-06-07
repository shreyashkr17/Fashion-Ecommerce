const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const verifyAuth = require("../middleware/verifyAuth")

router.post('/register',UserController.register);
router.post('/login', UserController.login)
router.post('/logout', UserController.logout);
router.post('/edituser',verifyAuth.authenticateJWt, UserController.editAccountDetail)
router.post('/editshippingdetail',verifyAuth.authenticateJWt, UserController.updateShippingAddress)
router.post('/editBillingAddress',verifyAuth.authenticateJWt, UserController.updateBillingAddress)
router.get('/my-profile', verifyAuth.authenticateJWt, UserController.getUser);
router.post('/redirect-with-google', UserController.getLoginRedirectGoogle);
router.post('/get-user-by-email', UserController.getAccountByEmail);
// GEt Method

router.get('/shipping-address', verifyAuth.authenticateJWt, UserController.getAddress);
router.get('/total-user', verifyAuth.authenticateJWt, UserController.getTotalUsers);
router.post('/add-new-address', verifyAuth.authenticateJWt, UserController.addAddress);
router.get('/get-this-year',UserController.getUsersCreatedThisYear)

module.exports = router;