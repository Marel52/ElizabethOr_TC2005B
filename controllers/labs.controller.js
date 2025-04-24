const Lab = require('../models/lab.model');

// Controlador para mostrar la lista de laboratorios
exports.getLabsList = async (req, res, next) => {
    try {
        const [labs] = await Lab.fetchAll();
        
        res.render('labs-list', {
            title: 'Mis Laboratorios',
            labs: labs,
            activeTab: 'labs'
        });
    } catch (error) {
        console.error('Error al obtener laboratorios:', error);
        res.status(500).render('404', {
            title: 'Error',
            message: 'Error al cargar los laboratorios'
        });
    }
};

// Controlador para mostrar un laboratorio específico
exports.getLabDetails = async (req, res, next) => {
    try {
        const labId = req.params.labId;
        
        // Obtener información del laboratorio desde la base de datos
        const [labs] = await Lab.findById(labId);
        
        if (labs.length === 0) {
            return res.status(404).render('404', {
                title: 'No encontrado',
                message: 'El laboratorio solicitado no existe'
            });
        }
        
        const lab = labs[0];
        
        res.render('lab-details', {
            title: lab.title,
            lab: lab,
            activeTab: 'labs'
        });
    } catch (error) {
        console.error('Error al obtener el laboratorio:', error);
        res.status(500).render('404', {
            title: 'Error',
            message: 'Error al cargar el laboratorio'
        });
    }
};

// Controlador para la página de búsqueda AJAX (Lab 24)
exports.getAjaxSearch = async (req, res, next) => {
    try {
        const [labs] = await Lab.fetchAll();
        
        res.render('ajax-search', {
            title: 'Búsqueda AJAX - Lab 24',
            labs: labs,
            activeTab: 'ajax-search'
        });
    } catch (error) {
        console.error('Error al cargar la página de búsqueda AJAX:', error);
        res.status(500).render('404', {
            title: 'Error',
            message: 'Error al cargar la página de búsqueda AJAX'
        });
    }
};