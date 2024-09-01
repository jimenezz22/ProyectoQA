const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cita = sequelize.define('Cita', {
    estudianteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Estudiantes',
            key: 'id'
        },
        allowNull: false
    },
    disponibilidadId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Disponibilidades',
            key: 'id'
        },
        allowNull: false
    },
    reservada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    duracion: {
        type: DataTypes.INTEGER, // Duración en minutos
        allowNull: false
    }
}, {
    tableName: 'citas',
    timestamps: false
});
module.exports = Cita;