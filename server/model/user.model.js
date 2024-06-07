const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    userId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userEmail:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    billingAddress: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
    },
    shippingAddress: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true
    },
    userSpentAmount:{
        type:DataTypes.FLOAT,
        allowNull:true,
        defaultValue:0
    },
    couponUsed:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true,
    },
    userCity:{
        type:DataTypes.STRING,
        allowNull:true
    }
});

module.exports = User;