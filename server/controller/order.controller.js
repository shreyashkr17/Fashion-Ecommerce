const User = require('../model/user.model')
const Product = require('../model/product.model');
const VariantProduct = require('../model/variants.product.model');
const CustomOrder = require('../model/customorders.model')
const Orders = require('../model/orders.model');
const Sizes = require('../model/sizes.model');
const Coupon = require('../model/coupon.model');
const {v4:uuidv4} = require('uuid');
const validator  = require('../utils/validator');
const { where } = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
// const instance= require('../index').instance
const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();

const instance = new Razorpay({
    'key_id': process.env.RAJORPAY_KEY_ID,
    'key_secret': process.env.RAJORPAY_KEY_SECRET,
  });

class OrderController{
    static async postOrder(req,res){
        try {
            const {orderId, orderDetails,shippingCost,couponCode,shippingAddress, billingAddress} = req.body;
            // console.log(billingAddress, shippingAddress)
            const userId = req.user.userId;

            // const orderId = uuidv4();

            //initializeOrderTotal
            let orderTotal = 0;

            //finding User from the model and checking if it exist or not
            const user = await User.findOne({
                where:{
                    userId
                }
            });
            if(!user){
                return res.status(400).json({
                    error:`User with ID ${userId} does not exist`
                });
            }

            // const userBillingAddress = user.billingAddress;
            // const userShippingAddress = user.shippingAddress;

            

            //performing actions on the each and every Object of the array
            for (const orderItem of orderDetails){
                //retriving detail from the array
                const {productSlug, variantSlug, quantity, amount, size,bust, hip, waist} = orderItem;

                //finding the respective product from the Product Model and checking if it exists or not
                const products = await Product.findOne({
                    where:{
                        productSlug
                    }
                });
                if(!products){
                    return res.status(400).json({
                        error:`Product with ${productSlug} does not exist` 
                    });
                };

                //finding the respective variant from the ProductVariant Model and checking if it exists or not
                const variant = await VariantProduct.findOne({
                    where:{
                        variantSlug
                    }
                });
                if(!variant){
                    return res.status(400).json({
                        error:`Variant with ${variantSlug} does not exist` 
                    })
                };

                if(!bust && !hip && !waist){
                    //finding the Size of the respective size that customer wants from the respective variantId, ProductId and sizeSlug and checking it exist or not
                    const sizes=  await Sizes.findOne({
                        where:{
                            productId:products.productId,
                            variantId:variant.variantId,
                            sizeSlug:size
                        }
                    })
                    if(!sizes){
                        return res.status(400).json({
                            error:`Size ${size} does not exist for product ${productSlug} and variant ${variantSlug}`
                        });
                    }

                    //checking if the variantStock is in negative or not
                    if(variant.variantStocks < 0 || sizes.sizeStock < 0){
                        return res.status(400).json({
                            error:`Variant with Slug ${variantSlug} is out of stock`
                        });
                    }

                    //checking if the quantity that customer want , that much quantity is available in the stock or not
                    if(sizes.sizeStock < quantity || quantity >  variant.variantStocks || variant.variantStocks-quantity < 0){
                        return res.status(400).json({
                            error:`Quantity exceeds available stock for variant with ID ${variantSlug}`
                        })
                    }

                    // if the stock exist then following operation is happening on the Product, ProductVariant, Sizes Model
                    const updatedSizeStock = sizes.sizeStock - quantity;
                    const updatedStock = variant.variantStocks - quantity;

                    //updating the Size MOdel with Stock that left after customer brought
                    await Sizes.update({
                        sizeStock:updatedSizeStock
                    }, {
                        where:{
                            productId:products.productId,
                            variantId:variant.variantId,
                            sizeSlug:size
                        }
                    });
                        
                    await VariantProduct.update({
                        variantStocks:updatedStock,
                    }, {
                        where:{
                            variantSlug
                        }
                    })
                }else if(bust && hip && waist){
                    //create a custom order with product.productId, variant.variantId,size,orderId, orderStatus, userId
                    const customOrder = await CustomOrder.create({
                        userId,
                        productId:products.productId,
                        variantId:variant.variantId,
                        size,
                        orderId,
                        orderStatus:'pending',
                        amount
                    });
                }
                
                // 1. Decreasing Size Stock from the existedStock - quantity(user want)
                // 2. Decreasing ProductVariant Stock from the existedProductStock - quantity(user want)
                // 3. Increasing the amount that User spent on that Product Variant = existedProductVariantAmountSpent+amount (user spent)
                // 4. Increasing the amount that User spent on that Product = existedProductAmountSpent+amount(user spent)
                
                const updatedAmountEarned = variant.variantAmountEarned+amount;
                const updatedProductAMount = products.productAmountEarned + amount;

                
                
                //updating the Product Model with AmountGained by each Product
                await Product.update({
                    productAmountEarned:updatedProductAMount
                }, {
                    where:{
                        productSlug
                    }
                });

                await VariantProduct.update({
                    variantAmountEarned:updatedAmountEarned
                }, {
                    where:{
                        variantSlug
                    }
                })


                orderTotal += amount;
            }
            orderTotal = orderTotal-shippingCost;
            console.log(orderTotal)
            const updatedUserSpentAmount = (user.userSpentAmount || 0)+orderTotal;
            if(couponCode){
                const coupon = await Coupon.findOne({
                    where:{
                        couponCode
                    }
                });

                if(!coupon){
                    return res.status(400).json({
                        error:`Coupon code ${couponCode} does not exist`
                    });
                };

                if(coupon.couponGrpType !== 'friendsfamily'){
                    user.couponUsed = user.couponUsed || [];
                    user.couponUsed.push(couponCode);
                    await user.save();
                }
            }

            await User.update({
                userSpentAmount: updatedUserSpentAmount
            }, {
                where:{
                    userId
                }
            })

            const order = await Orders.create({
                orderId,
                userId,
                orderDetails,
                orderTotal,
                billingAddress,
                shippingAddress,
                orderDate: new Date(),
            });
            return res.status(201).json({order,shippingAddress, billingAddress});
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async paymentVerification (req,res) {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAJORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        
            console.log("sig recieved", razorpay_signature);
            console.log("sig expected", expectedSignature);

        const isAuthentic = (expectedSignature === razorpay_signature);
        console.log(isAuthentic)

        if(isAuthentic){
            res.redirect(`http://localhost:3000/pages/paymentsucess/${razorpay_payment_id}`)
        }else{
            res.status(400).json({
                success: false,
            })
        }
    }

    static async paymentFailure(req,res){
        try {
            const {orderId,amount} = req.body;
            const userId = req.user.userId;
            const user = await User.findOne({
                where:{
                    userId
                }
            });

            if(!user){
                return res.status(400).json({
                    error:`User with ID ${userId} does not exist`
                });
            }

            if(user.userSpentAmount > 0){
                const updatedUserSpentAmount = (user.userSpentAmount)-amount;
            }

            await User.update({
                userSpentAmount: updatedUserSpentAmount
            }, {
                where:{
                    userId
                }
            });

            await Orders.destroy({
                where:{
                    orderId
                }
            })

            return res.status(200).json({
                success:true,
                message:`Order with ID ${orderId} has been successfully cancelled`
            });
        } catch (error) {
            console.error('Error cancelling order:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async checkout(req,res) {
        try {
            const {amount} = req.body;
            // console.log(amount)
            const options = {
                amount:Number(amount*100),
                currency: "INR",
            }
            console.log(amount);
            console.log(options);

            const orders = await instance.orders.create(options);

            res.status(200).json({
                success: true,
                orders,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    static async cancelOrder(req, res){
        try {
            const {orderId, orderDetails} = req.body;
            const order = await Orders.findOne({
                where:{
                    orderId
                }
            });
            if(!order){
                return res.status(404).json({
                    succes:false,
                    message:`Order with ID ${orderId} not found`
                });
            }

            const userId = req.user.userId;
            //finding User from the model and checking if it exist or not
            const user = await User.findOne({
                where:{
                    userId
                }
            });
            if(!user){
                return res.status(400).json({
                    error:`User with ID ${userId} does not exist`
                });
            }

            const userBillingAddress = user.billingAddress;
            const userShippingAddress = user.shippingAddress;

            //initializeOrderTotal
            let orderTotal = 0;

            for(const orderItem of orderDetails){
                const {productSlug, variantSlug, quantity, size, amount}= orderItem;

                const products = await Product.findOne({
                    where:{
                        productSlug
                    }
                });
                if(!products){
                    return res.status(400).json({
                        error:`Product with ${productSlug} does not exist` 
                    });
                };


                const variant = await VariantProduct.findOne({
                    where:{
                        variantSlug
                    }
                });
                if(!variant){
                    return res.status(400).json({
                        error:`Variant with ${variantSlug} does not exist` 
                    })
                };


                const sizes=  await Sizes.findOne({
                    where:{
                        productId:products.productId,
                        variantId:variant.variantId,
                        sizeSlug:size
                    }
                })
                if(!sizes){
                    return res.status(400).json({
                        error:`Size ${size} does not exist for product ${productSlug} and variant ${variantSlug}`
                    });
                }


                const updatedSizeStock = sizes.sizeStock+quantity;
                const updatedStock = variant.variantStocks + quantity;
                const updatedAmountEarned = variant.variantAmountEarned-amount;
                const updatedProductAMount = products.productAmountEarned - amount;

                await Sizes.update({
                    sizeStock:updatedSizeStock
                }, {
                    where:{
                        productId:products.productId,
                        variantId:variant.variantId,
                        sizeSlug:size
                    }
                });
                await VariantProduct.update({
                    variantStocks:updatedStock,
                    variantAmountEarned:updatedAmountEarned
                }, {
                    where:{
                        variantSlug
                    }
                });
                await Product.update({
                    productAmountEarned:updatedProductAMount
                }, {
                    where:{
                        productSlug
                    }
                });

                orderTotal += amount;
            }

            const updatedUserSpentAmount = (user.userSpentAmount || 0)-orderTotal;

            await User.update({
                userSpentAmount: updatedUserSpentAmount
            }, {
                where:{
                    userId
                }
            })

            await Orders.update({
                orderStatus:'Cancelled'
            }, {
                where:{
                    orderId
                }
            });

            return res.status(200).json({
                success:true,
                message:`Order with ID ${orderId} has been successfully Cancelled`
            });
        } catch (error) {
            console.error('Error cancelling order:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getOrdersByUser(req,res){
        try {
            const userId = req.user.userId;
            const orders = await Orders.findAll({
                where:{
                    userId
                }
            });
            return res.status(200).json({orders});
        } catch (error) {
            console.error('Error getting orders:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllOrders(req,res){
        try {
            const orders = await Orders.findAll();

            const notcancelledOrders = orders.filter(order => order.orderStatus !== 'Cancelled');



            const formattedOrders = await Promise.all(notcancelledOrders.map(async order => {
                const user = await User.findByPk(order.userId, { attributes: ['firstName', 'lastName','userEmail'] });

                return {
                    orderId: order.orderId,
                    userId: order.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userEmail:user.userEmail,
                    orderDetails: order.orderDetails,
                    orderTotal: order.orderTotal,
                    orderStatus: order.orderStatus,
                    orderDate: order.orderDate,
                    deliveryDate: order.deliveryDate
                }
            }));


            return res.status(200).json({orders,formattedOrders,notcancelledOrders:notcancelledOrders.length});
        } catch (error) {
            console.error('Error getting orders:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
    static async getAllOrdersDetails(req,res){
        try {
            const orders = await Orders.findAll();

            const formattedOrders = await Promise.all(orders.map(async order => {
                const user = await User.findByPk(order.userId, { attributes: ['firstName', 'lastName','userEmail'] });

                return {
                    orderId: order.orderId,
                    userId: order.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userEmail:user.userEmail,
                    orderDetails: order.orderDetails,
                    orderTotal: order.orderTotal,
                    orderStatus: order.orderStatus,
                    orderDate: order.orderDate,
                    deliveryDate: order.deliveryDate
                }
            }));


            return res.status(200).json({orders,formattedOrders});
        } catch (error) {
            console.error('Error getting orders:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getTotalIncomeInMonth(req,res){
        try {
            const orders = await Orders.findAll({
                where:{
                    orderStatus:{
                        [Op.not]:'Cancelled'
                    }
                }
            });

            const currentMonth = moment().month();
            const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

            let currentMonthTotal = 0;
            let previousMonthTotal = 0;

            orders.forEach(order => {
                const orderDate = moment(order.orderDate);
                const orderTotal = order.orderTotal;

                if (orderDate.month() === currentMonth) {
                    currentMonthTotal += orderTotal;
                } else if (orderDate.month() === previousMonth) {
                    previousMonthTotal += orderTotal;
                }
            });

            let percentChange = 0, percenStatus = 'no change';
            if (previousMonthTotal !== 0) {
                percentChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
            }

            if(percentChange > 0){
                percenStatus = 'increase';
            } else if (percentChange < 0) {
                percenStatus = 'decrease';
            }

            res.status(200).json({orders, currentMonthTotal, previousMonthTotal, percentChange, percenStatus});
        } catch (error) {
            console.error('Error getting total income in month:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } 

    static async getTotalIncomeInYear(req,res){
        try {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const previousYear = currentYear - 1;

            const orders = await Orders.findAll({
                where: {
                    orderStatus: {
                        [Op.not]: 'Cancelled'
                    },
                    orderDate: {
                        [Op.between]: [
                            new Date(currentYear, 0, 1), 
                            new Date(currentYear, 11, 31) 
                        ]
                    }
                }
            });

            const previousYearOrders = await Orders.findAll({
                where: {
                    orderStatus: {
                        [Op.not]: 'Cancelled'
                    },
                    orderDate: {
                        [Op.between]: [
                            new Date(previousYear, 0, 1), 
                            new Date(previousYear, 11, 31) 
                        ]
                    }
                }
            });

            const currentYearTotal = orders.reduce((total, order) => total + order.orderTotal, 0);
            const previousYearTotal = previousYearOrders.reduce((total, order) => total + order.orderTotal, 0);

            let percentChange = 0;
            let percentStatus = 'no change';
            if(previousYearTotal !== 0){
                percentChange = ((currentYearTotal - previousYearTotal) / previousYearTotal) * 100;
                percentStatus = percentChange > 0 ? 'increase' : 'decrease';
            }

            res.status(200).json({
                currentYearTotal,
                previousYearTotal,
                percentChange,
                percentStatus
            });

        } catch (error) {
            console.error('Error getting total income in year:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getTotalIncomeAllOrders(req, res) {
        try {
            const orders = await Orders.findAll({
                where: {
                    orderStatus: {
                        [Op.not]: 'Cancelled'
                    }
                }
            });

            const totalIncome = orders.reduce((total, order) => total + order.orderTotal, 0);

            return res.status(200).json({ totalIncome });
        } catch (error) {
            console.error('Error getting total income from all orders:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async analyzeOrderDetail(req,res){
        try {
            const orders = await Orders.findAll({
                where:{
                    orderStatus:{
                        [Op.not]:'Cancelled'
                    }
                }
            });

            let productCountByQuantityObject = []
            let productCountByAmountObject = []

            for(const order of orders){
                const orderDetails = order.orderDetails;

                for(const orderItem of orderDetails){
                    const {productSlug, variantSlug, quantity, amount,size} = orderItem;
                    const productId = await validator.convertSlug(productSlug);
                    const product = await Product.findOne({
                        where:{
                            productId
                        }
                    });
                    const productName = product.productName;

                    const variantId = await validator.convertVariantProductSlug(variantSlug);
                    const variants = await VariantProduct.findOne({
                        where:{
                            productId,
                            variantId
                        }
                    })

                    const sizes = await Sizes.findOne({
                        where:{
                            productId,
                            variantId,
                            sizeSlug:size
                        }
                    })
                    const variantStock = sizes.sizeStock;
                    const variantColor = `${variants.color_name}-${size}`;
                    const variantKey = `${productSlug}-${variantSlug}`;
                    productCountByQuantityObject.push({
                        productName,
                        variantStock,
                        variantColor,
                        variantKey:variantKey,
                        variantKeyQuant: quantity 
                    });
                    productCountByAmountObject.push({
                        productName,
                        variantStock,
                        variantColor,
                        variantKey:variantKey,
                        variantKeyQuant: amount 
                    });
                }
            }
            const sortedProductCountByQuantity = productCountByQuantityObject.sort(
                (a, b) => b[Object.keys(b)[3]] - a[Object.keys(a)[3]]
            );
            const sortedProductCountByAmount = productCountByAmountObject.sort(
                (a, b) => b[Object.keys(b)[3]] - a[Object.keys(a)[3]]
            );

            const uniqueSortedProductCountByQuantity = [];
            const encounteredProductsByQuantity = {};
            for(const product of sortedProductCountByQuantity){
                const {variantKey, variantColor, variantKeyQuant} = product;
                const key = `${variantKey}-${variantColor}`;

                if (encounteredProductsByQuantity[key]) {
                    encounteredProductsByQuantity[key].variantKeyQuant += variantKeyQuant;
                } else {
                    encounteredProductsByQuantity[key] = product;
                    uniqueSortedProductCountByQuantity.push(product);
                }
            }

            uniqueSortedProductCountByQuantity.sort(
                (a, b) => b.variantKeyQuant - a.variantKeyQuant
            );

            const uniqueSortedProductCountByAmount = [];
            const encounteredProductsByAmount = {};
            for(const product of sortedProductCountByAmount){
                const {variantKey, variantColor, variantKeyQuant} = product;
                const key = `${variantKey}-${variantColor}`;

                if (encounteredProductsByAmount[key]) {
                    encounteredProductsByAmount[key].variantKeyQuant += variantKeyQuant;
                } else {
                    encounteredProductsByAmount[key] = product;
                    uniqueSortedProductCountByAmount.push(product);
                }
            }

            res.status(200).json({uniqueSortedProductCountByQuantity, uniqueSortedProductCountByAmount});
        } catch (error) {
            console.error('Error analyzing order detail:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getOrderLength(req, res){
        try {
            const orders = await Orders.findAll();
            const notcancelledOrders = orders.filter(order => order.orderStatus !== 'Cancelled');

            return res.status(200).json({
                totalOrders: notcancelledOrders.length
            })
        } catch (error) {
            console.error('Error getting total orders:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async updatePendingStatus(req, res) {
        try {
            const { orderId, orderStatus } = req.body;
            const order = await Orders.findOne({
                where: {
                    orderId
                }
            });
    
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: `Order with ID ${orderId} not found`
                });
            }
    
            await Orders.update({
                orderStatus
            }, {
                where: {
                    orderId
                }
            });
    
            return res.status(200).json({
                success: true,
                message: `Pending status of order with ID ${orderId} updated to ${orderStatus}`
            });
        } catch (error) {
            console.error('Error updating pending status:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async postCoupon(req,res){
        try {
            const {couponCode,couponType,couponCategory,couponDescription,couponFlatValue,couponGrpType,couponPercentage} = req.body;
            console.log(couponCode,couponType,couponCategory,couponFlatValue,couponPercentage)
            const existingCoupon = await Coupon.findOne({
                where:{
                    couponCode
                }
            });

            if(existingCoupon){
                return res.status(400).json({
                    error:`Coupon code ${couponCode} already exists`
                });
            }

            const couponId = uuidv4();

            const coupon = await Coupon.create({
                couponId,
                couponCode,
                couponDescription,
                couponType,
                couponGrpType,
                couponFlatValue,
                couponPercentage,
                couponCategory
            });

            return res.status(201).json({coupon});
        } catch (error) {
            console.error('Error posting coupon:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async getAllCouponList(req,res){
        try {
            // const {couponCode} = req.body;
            const coupons = await Coupon.findAll();

            if(!coupons){
                return res.status(400).json({
                    error:`No coupon found`
                });
            }

            return res.status(200).json({coupons});

        } catch (error) {
            console.error('Error getting all coupon:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async deleteCoupons(req,res){
        try {
            const {couponCode} = req.body;
            const coupon = await Coupon.findOne({
                where:{
                    couponCode
                }
            });


            if(!coupon){
                return res.status(400).json({
                    error:`Coupon code ${couponCode} does not exist`
                });
            }

            await Coupon.destroy({
                where:{
                    couponCode
                }
            });

            return res.status(200).json({
                success:true,
                message:`Coupon code ${couponCode} has been successfully deleted`
            });
        } catch (error) {
            console.error('Error deleting coupon:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async checkCoupon(req,res){
        try {
            const {couponCode,amount} = req.body;

            const userId = req.user.userId;

            if(amount <6000){
                return res.status(400).json({
                    error:`Minimum order amount should be 6000`
                });
            }
            const coupon = await Coupon.findOne({
                where:{
                    couponCode
                }
            });

            if(!coupon){
                return res.status(400).json({
                    error:`Coupon code ${couponCode} does not exist`
                });
            }

            if(coupon.couponCategory === "6000to9000"){
                if(amount <6000 || amount>8500){    
                    if(coupon.couponGrpType !== 'friendsfamily'){
                        const user = await User.findOne({
                            where:{
                                userId,
                                couponUsed:{
                                    [Op.contains]:[couponCode]
                                }
                            }
                        });
        
                        if (user) {
                            return res.status(400).json({
                                error: `Coupon code ${couponCode} has already been used by the user`
                            });
                        }
                    }
                    return res.status(200).json({coupon});
                }else{
                    return res.status(400).json({
                        error:`Coupon code ${couponCode} is not applicable for the order range`
                    });
                }
            }else if(coupon.couponCategory === "9000above"){
                if(amount >= 8500){    
                    if(coupon.couponGrpType !== 'friendsfamily'){
                        const user = await User.findOne({
                            where:{
                                userId,
                                couponUsed:{
                                    [Op.contains]:[couponCode]
                                }
                            }
                        });
        
                        if (user) {
                            return res.status(400).json({
                                error: `Coupon code ${couponCode} has already been used by the user`
                            });
                        }
                    }
                    return res.status(200).json({coupon});
                }else{
                    return res.status(400).json({
                        error:`Coupon code ${couponCode} is not applicable for the order range`
                    });
                }
            }else if(coupon.couponCategory === "all"){
                if(coupon.couponGrpType !== 'friendsfamily'){
                    const user = await User.findOne({
                        where:{
                            userId,
                            couponUsed:{
                                [Op.contains]:[couponCode]
                            }
                        }
                    });
    
                    if (user) {
                        return res.status(400).json({
                            error: `Coupon code ${couponCode} has already been used by the user`
                        });
                    }
                }
                return res.status(200).json({coupon});
            }

            return res.status(400).json({
                error:`${couponCode} not applied`
            })

        } catch (error) {
            console.error('Error checking coupon:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    static async postCouponUsed(req, res) {
        try {
            const userId = req.user.userId;
            let { couponUsedList } = req.body;
    
            // Convert couponUsedList to an array if it's a string
            if (typeof couponUsedList === 'string') {
                couponUsedList = JSON.parse(couponUsedList);
            }
    
            const user = await User.findOne({
                where: {
                    userId,
                }
            });
    
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: `User with ID ${userId} not found`,
                });
            }
    
            const updatedUser = await User.update(
                {
                    couponUsed: couponUsedList,
                },
                {
                    where: {
                        userId,
                    },
                    returning: true, // Return the updated instance
                    plain: true, // Return a plain object instead of an instance
                }
            );
    
            return res.status(200).json({
                success: true,
                message: 'Coupon used list updated successfully',
                updatedUser: updatedUser[1], // Return the updated user instance
            });
        } catch (error) {
            console.error('Error updating coupon used list:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }

    static async getAllAvaialbleCoupons(req,res){
        try {
            const userId = req.user.userId;
            const user = await User.findOne({
                where:{
                    userId
                }
            });

            if(!user){
                return res.status(400).json({
                    error:`User with ID ${userId} does not exist`
                });
            }

            const coupons = await Coupon.findAll();

            if(!coupons){
                return res.status(400).json({
                    error:`No coupon found`
                });
            }

            const availableCoupon = coupons.filter((coupon) => {
                if (!user.couponUsed) {
                    return true;
                }
    
                return !user.couponUsed.includes(coupon.couponCode);
            });

            return res.status(200).json({ availableCoupon });

        } catch (error) {
            console.error('Error getting available coupons:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }

    
    
}

module.exports = OrderController;