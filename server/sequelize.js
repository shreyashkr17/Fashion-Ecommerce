const Sequelize = require('sequelize');
const {DatabaseConfig}  = require('./config');
// const {DatabaseConfig}  = require('./config');

const sequelize = new Sequelize(
    DatabaseConfig.sequelizeConfig.database,
    DatabaseConfig.sequelizeConfig.username,
    DatabaseConfig.sequelizeConfig.password,
    {
        host: DatabaseConfig.sequelizeConfig.host, // Provide the hostname here
        dialect: DatabaseConfig.sequelizeConfig.dialect,
        port: 5432, // Specify the port number separately
        logging: false
    }
);
sequelize.sync({force:false})
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error synchronizing error:', err);
    })

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;