const {DataTypes} = require("sequelize");
const sequelize = require("../sequelize");
const Product = require("./product.model");
const VariantProduct = require("./variants.product.model")

const ProducLgPic = sequelize.define('productlgpic', {
    prphotoId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        unique:true,
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
    width:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    height:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    photoUrl:{
        type:DataTypes.ARRAY(DataTypes.TEXT),
        allowNull:true,
    }
},{
    timestamps:false
});

module.exports = ProducLgPic;