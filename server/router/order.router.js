const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order.controller')
const verifyAuth = require("../middleware/verifyAuth");
const { verify } = require('jsonwebtoken');

router.post('/add-orders', verifyAuth.authenticateJWt, OrderController.postOrder);
router.post('/cancel-order', verifyAuth.authenticateJWt, OrderController.cancelOrder);
router.get('/get-order-by-user', verifyAuth.authenticateJWt, OrderController.getOrdersByUser);
router.post('/checkout', verifyAuth.authenticateJWt, OrderController.checkout);
router.post('/payment-verification', OrderController.paymentVerification);
router.post('/payment-failure',verifyAuth.authenticateJWt, OrderController.paymentFailure);
// For CMS
router.get('/get-all-orders', OrderController.getAllOrders);
router.get('/get-all-order-detail', OrderController.getAllOrdersDetails)
router.get('/get-total-by-month', OrderController.getTotalIncomeInMonth);
router.get('/get-total-by-year', OrderController.getTotalIncomeInYear);
router.get('/get-total-income', OrderController.getTotalIncomeAllOrders);
router.get('/get-total-orders-length', OrderController.getOrderLength);
router.post('/update-order-status', OrderController.updatePendingStatus);
router.get('/analyze-order', OrderController.analyzeOrderDetail);
router.get('/getAllCouponList', OrderController.getAllCouponList);
router.get('/get-available-coupons', verifyAuth.authenticateJWt,OrderController.getAllAvaialbleCoupons);
router.post('/add-coupon-to-user', verifyAuth.authenticateJWt, OrderController.postCouponUsed)
router.post('/add-coupon', OrderController.postCoupon);
router.post('/delete-coupon', OrderController.deleteCoupons);
router.post('/check-coupon', verifyAuth.authenticateJWt, OrderController.checkCoupon);

module.exports = router