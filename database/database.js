const Sequelize = require("sequelize");

const connection = new Sequelize('blogNode','root','',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;