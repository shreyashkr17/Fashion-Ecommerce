const {DataTypes} = require('sequelize');
const sequelize = require("../sequelize");


const Coupon = sequelize.define('coupon', {
    couponId:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
    },
    couponCode:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    couponPercentage:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    couponDescription:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    couponFlatValue:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    couponType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    couponGrpType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    couponCategory:{
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    timestamp:false
});

module.exports = Coupon;