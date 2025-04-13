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

        const newUser = new User(name, password);
        await newUser.save();

        request.session.success = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
        response.redirect('/user/login');

    } catch (error) {
        console.error('Error en el registro:', error);
        request.session.error = 'Error al registrar el usuario. Por favor, inténtalo de nuevo.';
        response.redirect('/user/register');
    }
};

exports.getLogin = (request, response, next) => {
    response.render('users/login', {
        title: 'Iniciar sesión',
        error: request.session.error || null,
        success: request.session.success || null,
        csrfToken: request.csrfToken()
    });
    request.session.error = null;
    request.session.success = null;
};

exports.postLogin = async (request, response, next) => {
    try {
        const name = request.body.nombre;
        const password = request.body.password;

        const [users] = await User.findByName(name);
        
        if (users.length === 0) {
            request.session.error = 'Usuario no encontrado.';
            return response.redirect('/user/login');
        }

        const user = users[0];
        
        const passwordMatch = await User.verifyPassword(password, user.password);
        
        if (!passwordMatch) {
            request.session.error = 'Contraseña incorrecta.';
            return response.redirect('/user/login');
        }

        request.session.isLoggedIn = true;
        request.session.userId = user.id;
        request.session.userName = user.name;
        request.session.success = `Bienvenido, ${user.name}!`;
        
        response.redirect('/');
    } catch (error) {
        console.error('Error en el inicio de sesión ', error);
        request.session.error = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
        response.redirect('/user/login');
    }
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        response.redirect('/');
    });
};