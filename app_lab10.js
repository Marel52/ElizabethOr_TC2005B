const http = require('http');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'oldLabs');
// request -> Petición del cliente
// response -> Respuesta del servidor
const server = http.createServer((request, response) => {
  console.log(`Solicitud recibida: ${request.method} ${request.url}`)
  
  if (request.method == 'GET'){
    let filePath = path.join(folder, request.url == '/' ? 'index.html': request.url);
  }
});

server.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});