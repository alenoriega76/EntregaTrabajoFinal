const Sequelize = require('sequelize');

const sequelize= new Sequelize('ecommerce1','root','Capitan20#',{
host: 'localhost',
dialect:'mysql',
});

sequelize.authenticate()
.then(()=>{
    console.log('CONEXION EXITOSA')
})
.catch(err=>{
    console.log('ERROR ENLA CONEXION '+ err)
})


module.exports =sequelize;