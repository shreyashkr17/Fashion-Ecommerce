const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize');

const InstagramModel = sequelize.define('instagram', {
    instaId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique:true,
        primaryKey:true
    },
    thumbnailUrl:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    postlink:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    postedBy:{
        type:DataTypes.STRING,
        allowNull:false,
    }
}, {
    timestamps:false
});

module.exports = InstagramModel;