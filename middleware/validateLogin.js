const { body, validationResult } = require('express-validator');
const login = [
    body('email').notEmpty().withMessage("Este campo no puede estar vacío ")
        .bail(),
    body('contraseña').notEmpty().withMessage("Ingrese su password"),
    (req, res, next) => {
        // const errors = validationResult(req);
        // console.log(errors);
        // if (!errors.isEmpty()) {
        //     return res.render('login', {
        //         errors: errors.array(),
        //     })
        // }
        const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
        next();
    }
    
]

module.exports = login;