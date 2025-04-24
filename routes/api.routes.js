const express = require('express');
const router = express.Router();
const Lab = require('../models/lab.model');
const isAuth = require('../middleware/is-auth');

// Ruta para obtener un laboratorio específico
router.get('/labs/:labId', isAuth, async (req, res) => {
    try {
        const labId = req.params.labId;
        
        // Obtener laboratorio de la base de datos
        const [labs] = await Lab.findById(labId);
        
        if (labs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Laboratorio no encontrado'
            });
        }
        
        // Devolver la información del laboratorio
        res.status(200).json({
            success: true,
            lab: labs[0]
        });
    } catch (error) {
        console.error('Error al obtener laboratorio:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la información del laboratorio',
            error: error.message
        });
    }
});

// Ruta para buscar laboratorios
router.get('/labs/search', isAuth, async (req, res) => {
    try {
        const searchTerm = req.query.term || '';
        
        // Buscar laboratorios usando el stored procedure
        const [[labs]] = await Lab.searchLabs(searchTerm);
        
        // Devolver resultados como JSON
        res.status(200).json({
            success: true,
            count: labs.length,
            labs: labs
        });
    } catch (error) {
        console.error('Error al buscar laboratorios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al buscar laboratorios',
            error: error.message
        });
    }
});

module.exports = router;