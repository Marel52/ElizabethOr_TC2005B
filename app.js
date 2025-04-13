const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const { router: indexRoutes } = require('./routes/index.routes');
const labsRoutes = require('./routes/labs.routes');
const userRoutes = require('./routes/users.routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const rootFolder = __dirname;
const oldLabsFolder = path.join(__dirname, 'oldLabs');
console.log('Ruta a oldLabs:', oldLabsFolder);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(oldLabsFolder));

app.use('/oldLabs', express.static(oldLabsFolder));
app.use('/css', express.static(path.join(oldLabsFolder, 'css')));
app.use('/js', express.static(path.join(oldLabsFolder, 'js')));
app.use('/images', express.static(path.join(oldLabsFolder, 'images')));

app.use('/labs/:labId/css', (req, res, next) => {
  express.static(path.join(oldLabsFolder, 'css'))(req, res, next);
});

app.use('/labs/:labId/js', (req, res, next) => {
  express.static(path.join(oldLabsFolder, 'js'))(req, res, next);
});

app.use('/labs/:labId/images', (req, res, next) => {
  express.static(path.join(oldLabsFolder, 'images'))(req, res, next);
});

app.use('/oldLabs', express.static(oldLabsFolder));

app.use(express.static(path.join(__dirname, 'oldLabs')));

app.use('/', indexRoutes);  
app.use('/labs', labsRoutes.router);
app.use('/user', userRoutes);

app.get('/app.js', (req, res) => {
  fs.readFile(path.join(rootFolder, 'app_lab12.js'), (err, data) => {
    if (err) {
      console.error('Error leyendo app_lab12.js:', err);
      return res.status(404).render('404', { 
        title: 'Archivo no encontrado', 
        message: 'El archivo solicitado no existe' 
      });
    }
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send(data);
  });
});

app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.url}`);
  res.status(404).render('404', { 
    title: 'Página no encontrada', 
    message: 'La página que buscas no existe' 
  });
});

const PORT = 3036;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});