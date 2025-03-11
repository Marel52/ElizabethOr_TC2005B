const http = require('http');
const fs = require('fs');
const path = require('path');

const rootFolder = __dirname;
const oldLabsFolder = path.join(__dirname, 'oldLabs');

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

const html_content = `          
          <div class="row center-container">
            <div class="s12 m4">
              <article class="card center-align">
                <div class="medium-space"></div>
                <i class="xx-large white">web</i>
                <h5>Laboratorio 1: HTML5</h5>
                <p>¿Quién soy?. Página de presentación.</p>
                <div class="medium-space"></div>
                <a href="/Lab1" class="button filled white">
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
                <a href="/Lab4" class="button filled white">
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
                <a href="/Lab5" class="button filled white">
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
                <a href="/Lab6" class="button filled white">
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
      <form method="POST" action="/registro">
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
          <strong>Mi App Web con Node.js</strong> - Creada para Construcción de software y toma de decisiones.
          <br>
          BeerCSS by <a href="https://github.com/beercss/beercss">León Fu</a>.
          Licencia <a href="https://opensource.org/license/mit">MIT</a>.
        </p>
      </div>
    </footer>

    <script src="/app_lab10.js"></script>
  </body>
</html>
`;

const fileMap = {
  "/Lab1": "Laboratorio1_HTML5_TC2005B.html",
  "/Lab4": "Laboratorio4_JS_TC2005B.html",
  "/Lab5": "Laboratorio5_FrameworkBULMA_TC2005B.html",
  "/Lab6": "Laboratorio6_POE.html"
};


const fileTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
};

const usuarios = [];

const server = http.createServer((request, response) => {
  console.log(`Solicitud recibida: ${request.method} ${request.url}`);

  if (request.method === 'GET' && request.url === '/app_lab10.js') {
    fs.readFile(path.join(rootFolder, 'app_lab10.js'), (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write(`${html_header}<div class="notification is-danger">Archivo no encontrado</div>${html_footer}`);
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/javascript');
        response.end(data);
      }
    });
    return;
  }

  if (request.method === 'GET' && (request.url.startsWith('/css/') || request.url.startsWith('/js/') || request.url.startsWith('/images/'))) {
    const filePath = path.join(oldLabsFolder, request.url);
    const extname = path.extname(filePath);
    const contentType = fileTypes[extname] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo ${filePath}:`, err.message);
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write(`${html_header}<div class="notification is-danger">Archivo estático no encontrado: ${request.url}</div>${html_footer}`);
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', contentType);
        response.end(data);
      }
    });
    return;
  }

  if (request.method === 'GET' && fileMap[request.url]) {
    const filePath = path.join(oldLabsFolder, fileMap[request.url]);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.write(`${html_header}<div class="notification is-danger">Laboratorio no encontrado</div>${html_footer}`);
        response.end();
      } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(data);
      }
    });
    return;
  }

  if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.write(html_header);
    response.write(html_content);
    response.write(html_form);
    response.write(html_footer);
    response.end();
    return;
  }

  if (request.method === 'POST' && request.url === '/registro') {
    const datos_completos = [];

    request.on('data', (data) => {
      console.log(data);
      datos_completos.push(data);
    });

    request.on('end', () => {
      const string_datos_completos = Buffer.concat(datos_completos).toString();
      console.log(string_datos_completos);
      
      const partes = string_datos_completos.split('&');
      const nombre = partes[0].split('=')[1];
      const password = partes[1].split('=')[1];

      if (!nombre || !password) {
        response.statusCode = 400;
        response.setHeader('Content-Type', 'text/html');
        response.write(html_header);
        response.write('<div class="notification is-warning">Faltan datos</div>');
        response.write(html_footer);
        response.end();
        return;
      }

      usuarios.push({nombre: nombre, password: password});
      
      const userData = `Nombre: ${nombre}\nContraseña: ${password}\n\n`;
      fs.appendFile(path.join(rootFolder, 'usuarios.txt'), userData, (err) => {
        let mensaje;
        if (err) {
          console.error("Error al escribir en usuarios.txt:", err.message);
          mensaje = '<div class="notification">Error al guardar los datos</div>';
        } else {
          console.log('Usuario registrado:');
          mensaje = '<div class="notification">Registro exitoso</div>';
        }
        
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.write(html_header);
        response.write(mensaje);
        
        response.write('<div class="container"><h2 class="title">Usuarios registrados:</h2>');
        response.write('<div class="row center-container">');
        for (const usuario of usuarios) {
          response.write(`
            <div class="s12 m4">
              <article class="card center-align">
                <div class="medium-space"></div>
                <i class="xx-large white">person</i>
                <h5>${usuario.nombre}</h5>
                <p>Usuario registrado</p>
                <div class="medium-space"></div>
              </article>
            </div>
          `);
        }
        response.write('</div></div>');
        
        response.write(html_footer);
        response.end();
      });
    });
    return;
  }

  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/html');
  response.write(html_header);
  response.write('<div class="notification is-danger">La página no existe</div>');
  response.write(html_footer);
  response.end();
});

server.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});