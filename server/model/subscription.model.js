const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { all } = require('../router/contactus.router');

const Subscription = sequelize.define('subscription', {
    subId:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamp:false,
});

module.exports = Subscription;