const { Sequelize, DataTypes } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
    process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

// const connection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
module.exports = {
    sequelize,
    DataTypes
};