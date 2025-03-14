const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const labsRoutes = require('./routes/labs.routes');
const userRoutes = require('./routes/users.routes');
const app = express();

const rootFolder = __dirname;
const oldLabsFolder = path.join(__dirname, 'oldLabs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(oldLabsFolder));

app.use('/css', express.static(path.join(oldLabsFolder, 'css')));
app.use('/js', express.static(path.join(oldLabsFolder, 'js')));
app.use('/images', express.static(path.join(oldLabsFolder, 'images')));

//RUTAS A MIS RECURSOS ESTÁTICOS
app.use('/labs/css', express.static(path.join(oldLabsFolder, 'css')));
app.use('/labs/js', express.static(path.join(oldLabsFolder, 'js')));
app.use('/labs/images', express.static(path.join(oldLabsFolder, 'images')));

// MODULOS
app.use('/labs', labsRoutes);
app.use('/user', userRoutes);


app.get('/', (req, res) => {
  res.status(200).send(generarHTML());
});

app.get('/app_lab11.js', (req, res) => {
  fs.readFile(path.join(rootFolder, 'app_lab11.js'), (err, data) => {
    if (err) {
      return res.status(404).send(generarHTML('<div class="notification is-danger">Archivo no encontrado</div>'));
    }
    res.setHeader('Content-Type', 'application/javascript');
    res.status(200).send(data);
  });
});

//RUTAS NO ENCONTRADAS
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.url}`);
  res.status(404).send(generarHTML('<div class="notification is-danger">La página no existe</div>'));
});

function generarHTML(customContent = '') {
  const html_header = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Mis Labs</title>
      <link href="https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.css" rel="stylesheet">
      <script type="module" src="https://cdn.jsdelivr.net/npm/beercss@3.9.7/dist/cdn/beer.min.js"></script>
    </head>
    <body>
      <header>
        <nav>
          <button class="sign white" onclick="document.getElementById('registroModal').showModal()">
            <i>people</i>
            <span>Registrarse</span>
          </button>
          <button class="log white" onclick="document.getElementById('registroModal').showModal()">
            <i>person</i>
            <span>Iniciar sesión</span>
          </button>
          <h5 class="max center-align"></h5>
        </nav>
      </header> 
      
      <main>
        <br>
        <section class="section">
          <div class="container">
            <h1 class="title center-align">Bienvenido a <strong>Marel's</strong></h1>
            <p class="subtitle center-align">Un lugar donde encontrarás mis laboratorios</p>
  `;
  const html_content = customContent || `          
            <div class="row center-container">
              <div class="s12 m4">
                <article class="card center-align">
                  <div class="medium-space"></div>
                  <i class="xx-large white">web</i>
                  <h5>Laboratorio 1: HTML5</h5>
                  <p>¿Quién soy?. Página de presentación.</p>
                  <div class="medium-space"></div>
                  <a href="/labs/Lab1" class="button filled white">
                    <span>Abrir</span>
                  </a>
                  <div class="medium-space"></div>
                </article>
              </div>
              
              <div class="s12 m4">
                <article class="card center-align">
                  <div class="medium-space"></div>
                  <i class="xx-large white">web</i>
                  <h5>Laboratorio 4: JavaScript</h5>
                  <p>Ejercicios de JavaScript</p>
                  <div class="medium-space"></div>
                  <a href="/labs/Lab4" class="button filled white">
                    <span>Abrir</span>
                  </a>
                  <div class="medium-space"></div>
                </article>
              </div>
              
              <div class="s12 m4">
                <article class="card center-align">
                  <div class="medium-space"></div>
                  <i class="xx-large white">web</i>
                  <h5>Laboratorio 5: Framework</h5>
                  <p>Página implementando el Framework BULMA</p>
                  <div class="medium-space"></div>
                  <a href="/labs/Lab5" class="button filled white">
                    <span>Abrir</span>
                  </a>
                  <div class="medium-space"></div>
                </article>
              </div>
              <div class="s12 m4">
                <article class="card center-align">
                  <div class="medium-space"></div>
                  <i class="xx-large white">web</i>
                  <h5>Laboratorio 6: Programación <br> Orientada a Eventos</h5>
                  <p>Validador de contraseñas</p>
                  <div class="medium-space"></div>
                  <a href="/labs/Lab6" class="button filled white">
                    <span>Abrir</span>
                  </a>
                  <div class="medium-space"></div>
                </article>
              </div>
            </div>
  `;
  const html_form = `
      <!--Registro/Iniciar sesión -->
      <dialog id="registroModal">
        <form method="POST" action="/user/registro">
          <h3>Registro / Inicio de sesión</h3>
          <label>Nombre:</label>
          <input type="text" class="black" name="nombre" required>
          <label><br>Contraseña:</label>
          <input type="password" class="black" name="password" required>
          <div class="right-align">
            <button type="submit" class="button filled primary">Enviar</button>
            <button type="button" class="button" onclick="document.getElementById('registroModal').close()">Cerrar</button>
          </div>
        </form>
      </dialog>
  `;
  const html_footer = `
          </div>
        </section>
      </main>
      <footer class="secondary white">
        <div class="center-align">
          <p>
            <strong>Mi App Web con Express</strong> - Creada para Construcción de software y toma de decisiones.
            <br>
            BeerCSS by <a href="https://github.com/beercss/beercss">León Fu</a>.
            Licencia <a href="https://opensource.org/license/mit">MIT</a>.
          </p>
        </div>
      </footer>
      <script src="/app_lab11.js"></script>
    </body>
  </html>
  `;
  return html_header + html_content + html_form + html_footer;
}

app.listen(3036, () => {
  console.log('Servidor iniciado en http://localhost:3036');
});