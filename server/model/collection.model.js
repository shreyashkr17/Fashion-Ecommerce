const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const { toDefaultValue } = require('sequelize/lib/utils');

const CollectionModel = sequelize.define('collection', {
    collectionId:{
        type: DataTypes.UUID,
        DefaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    collectionName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    collectionSubName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    collectionTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    colectionDescription:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    collectionType:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    collectionSrcURl:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = CollectionModel;