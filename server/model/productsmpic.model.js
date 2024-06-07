const {DataTypes} = require("sequelize");
const sequelize = require("../sequelize");
const Product = require("./product.model");

const ProducSmPic = sequelize.define('productsmpic', {
    photoId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        unique:true,
        allowNull:true,
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

module.exports = ProducSmPic;