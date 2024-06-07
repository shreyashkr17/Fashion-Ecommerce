const {DataTypes} = require("sequelize");
const sequelize = require("../sequelize");

const CustomOrders = sequelize.define('customorders', {
    userId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    productId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    variantId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    size:{//bust-waist-hip format
        type:DataTypes.STRING,
        allowNull:false,
    },
    orderId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    orderStatus:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"pending"
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
});

module.exports = CustomOrders;