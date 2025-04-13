const User = require('../models/user.model');

exports.getRegister = (request, response, next) => {
    response.render('users/register', {
        title: 'Registro',
        error: request.session.error || null,
        csrfToken: request.csrfToken()
    });
    request.session.error = null;
};

exports.postRegister = async (request, response, next) => {
    try {
        const name = request.body.nombre;
        const password = request.body.password;

        const [existingUsers] = await User.findByName(name);
        
        if (existingUsers.length > 0) {
            request.session.error = 'El nombre de usuario ya está en uso.';
            return response.redirect('/user/register');
        }

    }catch (error) {
        console.error('Error en el registro', error);
    }
};