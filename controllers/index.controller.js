const path = require('path');
const fs = require('fs');

exports.getIndex = async (request, response, next) => {
    try {
        if (!request.session.isLoggedIn) {
            return response.redirect('/user/login');
        }

        const [labs] = await Lab.fetchAll();
        
        const labsWithIcons = labs.map(lab => {
            return {
                ...lab,
                icon: 'web' 
            };
        });

        response.render('index', { 
            title: 'Mis Laboratorios', 
            labs: labsWithIcons,
            isLoggedIn: request.session.isLoggedIn,
            userName: request.session.userName
        });

    } catch (error) {
        console.error('Error al obtener laboratorios:', error);
        response.status(500).render('404', {
            title: 'Error',
            message: 'Error al cargar los laboratorios'
        });
    }
};

