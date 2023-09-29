const Sequelize = require('../db/sequelize');
const DataTypes = require('sequelize');

const pedido= Sequelize.define('pedidos',{
    id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    id: {
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false 
});
  module.exports=pedido;