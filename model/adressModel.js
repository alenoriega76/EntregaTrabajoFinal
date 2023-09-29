const Sequelize=require('../db/sequelize');
const DataTypes=require('sequelize');

const adress =  Sequelize.define('direccion',{
    id_direccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    calle: {
        type: DataTypes.STRING,
    },
   
    altura: {
        type: DataTypes.INTEGER,
    },
    
    barrio:{
        type:DataTypes.STRING,
    }
    
}, {
    timestamps: false 
});
  module.exports= adress;