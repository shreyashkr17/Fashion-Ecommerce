const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const Contactus = sequelize.define('contactus',{
    queryId:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    senderName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderEmail:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    senderPhone:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    querySubject:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    queryMessage:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Contactus;