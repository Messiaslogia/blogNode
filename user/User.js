const Sequelize = require("sequelize");
const connection = require("../database/database"); // Corrigido para importar a conexão corretamente

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false // Corrigido de 'allNull' para 'allowNull'
    }
});

User.sync({ force: false });
module.exports = User;