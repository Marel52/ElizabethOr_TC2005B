const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const labsConfig = [
  {
    id: 'Lab1',
    title: 'Laboratorio 1: HTML5',
    description: '¿Quién soy? Página de presentación',
    filename: 'Laboratorio1_HTML5_TC2005B.html',
    icon: 'web'
  },
  {
    id: 'Lab4',
    title: 'Laboratorio 4: JavaScript',
    description: 'Ejercicios de JavaScript',
    filename: 'Laboratorio4_JS_TC2005B.html',
    icon: 'web'
  },
  {
    id: 'Lab5',
    title: 'Laboratorio 5: Framework',
    description: 'Página implementando el Framework BULMA',
    filename: 'Laboratorio5_FrameworkBULMA_TC2005B.html',
    icon: 'web'
  },
  {
    id: 'Lab6',
    title: 'Laboratorio 6: POE',
    description: 'Validador de contraseñas',
    filename: 'Laboratorio6_POE.html',
    icon: 'web'
  },
];


router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Mis Laboratorios', 
    labs: labsConfig 
  });
});

router.get('/labs/:labId', (req, res) => {
  const labId = req.params.labId;
  
  const lab = labsConfig.find(l => l.id === labId);
  
  if (!lab) {
    return res.status(404).render('404', { 
      title: 'Laboratorio no encontrado',
      message: 'El laboratorio solicitado no existe' 
    });
  }

  const oldLabsFolder = path.join(__dirname, '..', 'oldLabs');
  const filePath = path.join(oldLabsFolder, lab.filename);
  
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).render('404', { 
        title: 'Archivo no encontrado',
        message: 'El archivo del laboratorio no existe' 
      });
    }
    
    res.render('labs', { 
      title: lab.title,
      lab: lab,
      filename: lab.filename
    });
  });
});

module.exports = { router, labsConfig };