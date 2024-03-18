const Sequelize = require("sequelize");
const connection = ("../database/database");

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allNull: false
    }
})

module.exports = Category;