const Lab = require('../models/lab.model');
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

exports.getLab = async (request, response, next) => {
    try {
        const labId = request.params.labId;
        
        const [labs] = await Lab.findById(labId);
        
        if (labs.length === 0) {
            return response.status(404).render('404', { 
                title: 'Laboratorio no encontrado',
                message: 'El laboratorio solicitado no existe' 
            });
        }
        
        const lab = labs[0];
        
        lab.icon = 'web';

        const filePath = path.join(__dirname, '..', lab.relative_path);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return response.status(404).render('404', { 
                    title: 'Archivo no encontrado',
                    message: 'El archivo del laboratorio no existe' 
                });
            }
            
            response.render('labs', { 
                title: lab.title,
                lab: lab,
                filename: lab.filename,
                isLoggedIn: request.session.isLoggedIn,
                userName: request.session.userName
            });
        });
    } catch (error) {
        console.error('Error al obtener el laboratorio:', error);
        response.status(500).render('404', {
            title: 'Error',
            message: 'Error al cargar el laboratorio'
        });
    }
};