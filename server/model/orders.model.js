const {DataTypes} = require("sequelize");
const sequelize = require("../sequelize");
const User = require('./user.model')
const Product = require('./product.model');
const VariantProduct = require('./variants.product.model');

const Orders = sequelize.define('orders', {
    orderId:{
        type:DataTypes.STRING,
        primaryKey:true,
        unique:true,
    },
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
        reference:{
            model:User,
            key:'userId'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    orderDetails:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true,
    },
    orderTotal:{
        type:DataTypes.FLOAT,
        allowNull:true,
        defaultValue:0,
    },
    orderStatus:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue:'Pending',
    },
    orderDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    deliveryDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    billingAddress:{
        type:DataTypes.JSONB,
        allowNull:false,
    },
    shippingAddress:{
        type:DataTypes.JSONB,
        allowNull:false,
    },
}, {
    timestamps:false
});

module.exports = Orders