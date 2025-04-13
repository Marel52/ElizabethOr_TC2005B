const User = require('../models/user.model');

exports.getRegister = (request, response, next) => {
    response.render('users/register', {
        title: 'Registro',
        error: request.session.error || null,
        csrfToken: request.csrfToken()
    });
    request.session.error = null;
};

