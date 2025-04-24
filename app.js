const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const csrf = require('csurf');

const { router: indexRoutes } = require('./routes/index.routes');
const labsRoutes = require('./routes/labs.routes');
const userRoutes = require('./routes/users.routes');
const filesRoutes = require('./routes/files.routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const rootFolder = __dirname;
const oldLabsFolder = path.join(__dirname, 'oldLabs');
const uploadsFolder = path.join(__dirname, 'uploads');
const viewsFolder = path.join(__dirname, 'views');
const filesViewsFolder = path.join(__dirname, 'views', 'files');
const usersViewsFolder = path.join(__dirname, 'views', 'users');

console.log('Ruta a oldLabs:', oldLabsFolder);

app.use(bodyParser.urlencoded({ extended: false }));

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        callback(null, new Date().getMilliseconds() + file.originalname);
    },
});

const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'text/plain') {
            callback(null, true);
    } else {
            callback(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo')); 


app.use(session({
    secret: 'marels_laboratorio_session_secret', 
    resave: false, 
    saveUninitialized: false 
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.userName = req.session.userName;
    res.locals.userId = req.session.userId;
    next();
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/oldLabs', express.static(oldLabsFolder));

app.use('/css', express.static(path.join(oldLabsFolder, 'css')));
app.use('/js', express.static(path.join(oldLabsFolder, 'js')));
app.use('/images', express.static(path.join(oldLabsFolder, 'images')));

app.use('/labs/:labId/css', express.static(path.join(oldLabsFolder, 'css')));
app.use('/labs/:labId/js', express.static(path.join(oldLabsFolder, 'js')));
app.use('/labs/:labId/images', express.static(path.join(oldLabsFolder, 'images')));

app.use('/labs/:labId/view', (req, res, next) => {
  const Lab = require('./models/lab.model');
  
  const labId = req.params.labId;
  
  Lab.findById(labId)
    .then(([labs]) => {
      if (labs.length === 0) {
        return res.status(404).render('404', { 
          title: 'Laboratorio no encontrado',
          message: 'El laboratorio solicitado no existe' 
        });
      }
      
      const lab = labs[0];
      const filePath = path.join(__dirname, lab.relative_path);
      
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error leyendo archivo ${filePath}:`, err);
          return res.status(404).render('404', { 
            title: 'Archivo no encontrado',
            message: 'El archivo del laboratorio no existe' 
          });
        }
        
        res.setHeader('Content-Type', 'text/html');
        res.send(content);
      });
    })
    .catch(err => {
      console.error('Error al obtener el laboratorio:', err);
      res.status(500).render('404', {
        title: 'Error',
        message: 'Error al cargar el laboratorio'
      });
    });
});

app.use('/', indexRoutes);  
app.use('/labs', labsRoutes.router);
app.use('/user', userRoutes);
app.use('/files', filesRoutes);

app.get('/app.js', (req, res) => {
  fs.readFile(path.join(rootFolder, 'app.js'), (err, data) => {
    if (err) {
      console.error('Error leyendo app.js:', err);
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});