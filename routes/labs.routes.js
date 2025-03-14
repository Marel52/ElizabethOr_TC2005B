const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const fileMap = {
  "/Lab1": "Laboratorio1_HTML5_TC2005B.html",
  "/Lab4": "Laboratorio4_JS_TC2005B.html",
  "/Lab5": "Laboratorio5_FrameworkBULMA_TC2005B.html",
  "/Lab6": "Laboratorio6_POE.html"
};


router.get('/:labId', (req, res) => {
  const labPath = `/${req.params.labId}`;
  
  if (fileMap[labPath]) {
    const oldLabsFolder = path.join(__dirname, '..', 'oldLabs');
    const filePath = path.join(oldLabsFolder, fileMap[labPath]);
    
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error al enviar el archivo:', err);
        res.status(404).send(`
          <div>
            <h1>Error 404</h1>
            <p>Laboratorio no encontrado</p>
            <a href="/">Volver al inicio</a>
          </div>
        `);
      }
    });
  } else {
    res.status(404).send(`
      <div>
        <h1>Error 404</h1>
        <p>Laboratorio no encontrado</p>
        <a href="/">Volver al inicio</a>
      </div>
    `);
  }
});

module.exports = router;