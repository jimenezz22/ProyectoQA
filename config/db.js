const { Sequelize } = require('sequelize');

// Configuraci�n de la base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // Ubicaci�n del archivo SQLite
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos SQLite');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
