const {DataTypes} = require("sequelize")
const sequelize = require('../sequelize')
const Product = require('./product.model')

const ProductVariants = sequelize.define('product_variants',{
    variantId:{
        type:DataTypes.UUID,
        default:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
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
    color:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    color_name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    size:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true,
    },
    variantSlug:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    variantStocks:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    variantAmountEarned:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
    },
},{
    timestamps:false
})

module.exports = ProductVariants