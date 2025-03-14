const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const usuarios = [];

router.get('/usuarios', (request, response) => {
  let userHTML = '<h2>Usuarios registrados:</h2><div class="row center-container">';
  
  for (const usuario of usuarios) {
    userHTML += `
      <div class="s12 m4">
        <article class="card center-align">
          <div class="medium-space"></div>
          <i class="xx-large white">person</i>
          <h5>${usuario.nombre}</h5>
          <p>Usuario registrado</p>
          <div class="medium-space"></div>
        </article>
      </div>
    `;
  }
  
  userHTML += '</div><a href="/">Volver al inicio</a>';
  response.status(200).send(generarHTML(userHTML));
});

router.post('/registro', (request, response) => {
  const nombre = request.body.nombre;
  const password = request.body.password;
  
  if (!nombre || !password) {
    return response.status(400).send(generarHTML('<div>Faltan datos</div>'));
  }
  
  usuarios.push({ nombre, password });
  
  const userData = `Nombre: ${nombre}\nContraseña: ${password}\n\n`;
  const rootFolder = path.join(__dirname, '..');
  
  fs.appendFile(path.join(rootFolder, 'usuarios.txt'), userData, (err) => {
    let mensaje;
    if (err) {
      console.error("Error al escribir en usuarios.txt:", err.message);
      mensaje = '<div class="notification">Error al guardar los datos</div>';
    } else {
      console.log('Usuario registrado:', nombre);
      mensaje = '<div class="notification">Registro exitoso</div>';
    }
    
    let userHTML = mensaje + '<div class="container"><h2 class="title">Usuarios registrados:</h2>';
    userHTML += '<div class="row center-container">';
    
    for (const usuario of usuarios) {
      userHTML += `
        <div class="s12 m4">
          <article class="card center-align">
            <div class="medium-space"></div>
            <i class="xx-large white">person</i>
            <h5>${usuario.nombre}</h5>
            <p>Usuario registrado</p>
            <div class="medium-space"></div>
          </article>
        </div>
      `;
    }
    
    userHTML += '</div></div>';
    response.status(200).send(generarHTML(userHTML));
  });
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
    </body>
  </html>
  `;

  return html_header + customContent + html_form + html_footer;
}

module.exports = router;