// middleware/isAdmin.js
const isAdmin = (req, res, next) => {
  const user = req.session.usuario; // Asume que el usuario se almacena en la sesión

  if (user && user.id_tipoUser === 1) {
    // El usuario tiene el id_tipoUser 1, lo que indica que es un administrador
    next();
  } else {
    // El usuario no es un administrador, redirige o envía un error
    res.status(403).send('Acceso no autorizado');
  }
};

module.exports = isAdmin;
