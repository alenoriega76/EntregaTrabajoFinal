const express = require('express');
const app = express();
const cors = require('cors');
const session= require ('express-session');
const {Sequelize}= require('./db/sequelize')

const port= 4000;
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({

    secret: 'Capitan20', 
    resave: false,
    saveUninitialized: true,
}));


app.use('/',require('./routes/indexRoutes'));
app.use('/login',require('./routes/indexRoutes'))
app.use('/register',require('./routes/indexRoutes'));
app.use('/products',require('./routes/indexRoutes'));
app.use('/usuarios',require('./routes/indexRoutes'));
app.use('/products/:id',require('./routes/indexRoutes'));
app.use('/usuarios/edit/:id',require('./routes/indexRoutes'));
app.use('/usuarios/delete/:id',require('./routes/indexRoutes'));

app.listen(port,()=>{
    console.log(` SERVER listening on http://localhost: ${port}`); 
});