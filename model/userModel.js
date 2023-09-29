const Sequelize = require('../db/sequelize');
const DataTypes = require('sequelize');

const usuario = Sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.DECIMAL,
    },

    contraseña: {
        type: DataTypes.INTEGER,
    },
    id_direccion: {
        type: DataTypes.INTEGER,
    },
    id_tipoUser: {
        type: DataTypes.INTEGER,
    },
    fec_nac: {
        type: DataTypes.DATE,
    },
    username: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});
module.exports = usuario;