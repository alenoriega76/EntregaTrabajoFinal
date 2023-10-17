const express = require('express');
const router = express.Router();
const login = require('../middleware/validateLogin');
const validate = require('../middleware/validateRegister');
const validateUpdate = require('../middleware/update');
const isAdmin = require('../middleware/isAdmin');
const { createUser, getProduct, createProduct, obtenerProductoId, deleteProduct,
       renderIndex, renderRegister, renderLogin,
        loginSesion, getUser, deleteUser, updateUser, obtenerUsuarioId,
       updateProduct,renderProductos,renderNuevoProducto } = require('../controllers/indexControllers');

// rutas para Login y Register
router.get('/login', renderLogin);
router.get('/register', renderRegister);
router.post('/login', login,loginSesion);
router.post('/register', validate,createUser);

router.get('/admin', isAdmin, (req, res) => {
       // Verificar si el usuario es un administrador
       const user = req.session.usuario; // Asume que el usuario se almacena en la sesión
     
       if (user && user.id_tipoUsuario === 1) {
     
         res.status(200).json({ message: 'Bienvenido, administrador' });
       } else {
         // El usuario no es un administrador, devolver un error o redirigir a una página de acceso no autorizado
         res.status(403).json({ error: 'Acceso no autorizado para usuarios no administradores' });
       }
     });
// rutas para operaciones CRUD
router.get('/', renderIndex);
// rutas para productos CRUD
router.get('/products',getProduct);
router.get('/products/new',renderNuevoProducto)
router.post('/products',isAdmin,createProduct);
router.delete('/products/:id',deleteProduct);
router.put('/products/:id', updateProduct);
router.get('/products/:id', obtenerProductoId);

// rutas para usuarios CRUD
router.get('/usuarios',isAdmin, getUser);
router.get('/usuarios/:id',obtenerUsuarioId)
router.put('/usuarios/edit/:id',updateUser);
router.delete('/usuarios/delete/:id',deleteUser);

      
   
module.exports = router;