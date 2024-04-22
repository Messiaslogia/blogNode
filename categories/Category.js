const Sequelize = require("sequelize");
const connection = require("../database/database"); // Corrigido para importar a conexão corretamente

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false // Corrigido de 'allNull' para 'allowNull'
    }
});

// Category.sync({ force: true });
module.exports = Category;