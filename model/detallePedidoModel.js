const Sequelize = require('../db/sequelize');
const DataTypes = require('sequelize');

const detallePedido= Sequelize.define('detallePedido',{
    id_detalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_pedido:{
        type:INTEGER,
    },
    id_productos:{
        type:INTEGER,
    }
}, {
    timestamps: false 
});
  module.exports= detallePedido;