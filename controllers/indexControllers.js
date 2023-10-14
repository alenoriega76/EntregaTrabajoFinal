
const bcrypt = require("bcrypt");
const session = require('express-session');
const producto = require("../model/productModel");
const usuario = require("../model/userModel");
const pedido=require('../model/pedidosModel');
const Sequelize = require("../db/sequelize");

// pagina inicio
const renderIndex = (req, res) => {
    res.render('index');
};
const renderLogin = (req, res) => {
    res.render('login', { errors: [] });
};
const renderRegister = (req, res) => {
    res.render('register', { errors: [] });
}
const renderProductos = (req, res) => {
    res.render('productos', { errors: [] });
}
const renderNuevoProducto = (req, res) => {
    res.render('nuevoProducto', { errors: [] });
}
// const loginSesion = async (req, res) => {
//     const { email, contraseña } = req.body;

//     try {
//         const user = await usuario.findOne({ where: { email } });

//         if (!user) {
//             return res.status(404).send('Usuario no encontrado');
//         }

//         const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);

//         if (passwordMatch) {
//             console.log('Contraseña correcta');
//             req.session.usuario = user;
//             res.render('perfil', { usuario: user }); // Pasar el usuario como variable a la vista
//         } else {
//             console.log('Contraseña incorrecta');
//             res.status(401).send('Contraseña incorrecta');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error al autenticar usuario');
//     }
// };
const loginSesion = async (req, res) => {
    const { email, contraseña } = req.body;
  
    try {
      const user = await usuario.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const passwordMatch = await bcrypt.compare(contraseña, user.contraseña);
  
      if (passwordMatch) {
        // Aquí puedes devolver información del usuario autenticado en JSON
        res.status(200).json({ usuario: user });
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al autenticar usuario' });
    }
  };
  
// creo el registro 
// const createUser = async (req, res) => {
//     /* cambie el nombre de los campos nombre y contraseña, y agregue el ccampo del telefono*/
//     const { nombre, email, contraseña, username, fec_nac ,telefono} = req.body;
//     try {

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

//         const newUser = await usuario.create({
//             nombre,
//             email,
//             contraseña: hashedPassword,
//             username,
//             fec_nac,
//             telefono
//         });

//         console.log("Usuario creado con éxito")
//         res.status(200).json(newUser);

//     } catch (e) {
//         console.log(e);
//         res.status(500).send("Error al crear un usuario");
//     }
// }
const createUser = async (req, res) => {
    /* Cambié el nombre de los campos nombre y contraseña y agregué el campo del teléfono */
    const { nombre, email, contraseña, username, fec_nac, telefono } = req.body;
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
  
      const newUser = await usuario.create({
        nombre,
        email,
        contraseña: hashedPassword,
        username,
        fec_nac,
        telefono,
      });
  
      console.log("Usuario creado con éxito");
      res.status(200).json(newUser);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Error al crear un usuario" });
    }
  }
  

//leo los registros

const getUser = async (req, res) => {
    try {
        const users = await usuario.findAll();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener los usuarios");
    }

}

// actualiza los usuarios
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, contraseña, username, fec_nac } = req.body;
    try {
        const user = await usuario.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        await user.update({
            nombre,
            email,
            contraseña,
            username,
            fec_nac,
            telefono
        });
        res.status(200).send("Usuario actualizado con éxito");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar usuario");
    }
}

const obtenerUsuarioId = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await
            usuario.findByPk(id);
        res.status(200).json(userId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Usuario no encontrado" })
    }
}

//elimino los usuarios

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usuario.findByPk(id);
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        await user.destroy();
        res.status(200).send("Usuario eliminado con éxito");
    } catch (e) {
        console.log(e);
        res.status(500).send("Error al eliminar usuario");
    }
};
//////////productos!!!!!!/////////////
// creo un producto nuevo

const createProduct = async (req, res) => {
    try {
      const { nombre, descripcion, precio, imagen } = req.body;
      console.log(req.body);
      const newProduct = await producto.create({
        nombre,
        descripcion,
        precio,
        imagen // Guarda la URL de la imagen en la base de datos
      });
      console.log("Producto Creado con éxito");
      const products = await producto.findAll();
      res.status(200).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error al crear el producto" });
    }
  };
  

// Función para obtener todos los productos
const getProduct = async (req, res) => {
    try {
        const products = await producto.findAll();
        res.status(200).json(products);
        //res.render('productos', { products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Error al obtener los productos" });
    }
}
//actualiza el producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio,imagen } = req.body;
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        product.nombre = nombre;
        product.descripcion = descripcion;
        product.precio = precio;
        product.imagen=imagen;
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
}


//elimina un producto

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await producto.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }


        await product.destroy({
            where: { idProduct: id }
        });

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

const obtenerProductoId = async (req, res) => {
    try {
        const { id } = req.params;
        const productId = await
            producto.findByPk(id);
        res.status(200).json(productId);
    } catch (err) {
        console.error(err);
        res.status(404).json({ err: "Producto no encontrado" })
    }
}
module.exports = {
    createUser,
    getUser,
    renderIndex,
    updateUser,
    deleteUser,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    obtenerUsuarioId,
    obtenerProductoId,
    renderLogin,
    renderRegister,
    loginSesion,
    renderProductos,
    renderNuevoProducto
};