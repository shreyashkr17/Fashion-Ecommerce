const {DataTypes}  =  require('sequelize');
const sequelize = require('../sequelize');

const Post = sequelize.define('posts', {
    postId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique:true,
        primaryKey:true
    },
    author:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    comments:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true
    },
    blog_categories:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true
    },
    commentContent:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true
    },
    relatedPost:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true
    }
}, {
    timestamps:false
});

module.exports = Post;