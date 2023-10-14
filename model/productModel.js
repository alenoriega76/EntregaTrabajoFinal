const Sequelize = require('../db/sequelize');
const DataTypes = require('sequelize');

const producto= Sequelize.define('productos',{
    id_productos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.DECIMAL,
    },
    
    id_categoria:{
        type:DataTypes.INTEGER,
    },
    imagen: {
        type: DataTypes.STRING, // Usamos BLOB para almacenar imágenes binarias
    },
    rating:{
        type: DataTypes.INTEGER,
    }
}, {
    timestamps: false 
});
  module.exports=producto;