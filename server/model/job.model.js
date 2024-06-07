const {DataTypes} = require('sequelize');
const sequelize = require("../sequelize");

const JobModel = sequelize.define('jobs', {
    jobId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        unique:true,
        primaryKey:true
    },
    jobTitle:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    jobLocation:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    jobCategory:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true,
    },
    jobDesc:{
        type:DataTypes.ARRAY(DataTypes.JSONB),
        allowNull:true,
    },
    jobQualification:{
        type:DataTypes.ARRAY(DataTypes.TEXT),
        allowNull:true,
    },
    openings:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
    slug:{
        type:DataTypes.STRING,
        allowNull:true,
        unique:true,
    },
    postedDate:{
        type:DataTypes.DATEONLY,
        allowNull:true,
    },
    jobForm:{
        type:DataTypes.TEXT,
        allowNull:true,
    }
}, {
    timestamps:false
})

module.exports = JobModel