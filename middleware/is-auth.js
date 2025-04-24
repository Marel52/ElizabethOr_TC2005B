module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        request.session.error = 'Por favor inicia sesión para acceder a esta página.';
        return response.redirect('/user/login');
    }
    next();
};