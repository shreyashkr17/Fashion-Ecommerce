const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');
const VariantProduct = require('./variants.product.model');
const Product = require('./product.model');

const Sizes = sequelize.define('sizes', {
    sizeId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    variantId:{
        type:DataTypes.UUID,
        allowNull:false,
        reference:{
            model:VariantProduct,
            key:'variantId'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    productId:{
        type:DataTypes.UUID,
        allowNull:false,
        reference:{
            model:Product,
            key:'productId'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    sizeName:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    sizeSlug:{
        type:DataTypes.STRING,
        allowNull:true
    },
    sizeStock:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    }
}, {
    timestamps:false
}) ;

module.exports = Sizes;