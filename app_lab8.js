const http = require('http');
const fs = require('fs');
const path = require('path');

//EJERCICIO 1: Recibir un arreglo de números y devuelver su promedio
const calcularPromedio = (numeros) => {
    let suma = 0;
    for (let i = 0; i < numeros.length; i++) {
        suma += numeros[i];
    }
    return suma / numeros.length;
}

const numeros = [11, 22, 33, 44, 55];
console.log("EJERCICIO 1");
console.log(`El promedio de [${numeros}] es: ${calcularPromedio(numeros)}`);

//EJERCICIO 2: Recibir un string y escribir el string en un archivo de texto
const escribirArchivo = (texto, nombreArchivo) => {
    fs.writeFileSync(nombreArchivo, texto);
    console.log(`Se escribió en ${nombreArchivo}`);
    return true;
}

console.log("EJERCICIO 2");
escribirArchivo("Hola desde Node", "lab8.txt");

//EJERCICIO 3: Escoger algún problema que haya implementado en otro lenguaje de programación,
// y darle una solución en js que se ejecute sobre node
const fibonacci = (n) => {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    
    let a = 0;
    let b = 1;
    let resultado = 0;
    
    for (let i = 2; i <= n; i++) {
        resultado = a + b;
        a = b;
        b = resultado;
    }
    
    return resultado;
}

console.log("EJERCICIO 3");
console.log("Primeros 10 números de Fibonacci:");
for (let i = 0; i < 10; i++) {
    console.log(`${i}._ = ${fibonacci(i)}`);
}


// DIRECTORIO DONDE ESTAN MIS LABS
const directorioPaginas = path.join(__dirname, 'oldLabs');

// CREAR UN SERVIDOR
const servidor = http.createServer((request, response) => {
    console.log(`Petición recibida: ${request.method} ${request.url}`);
    
    if (request.url == '/') {
        mostrarPaginaPrincipal(response);
        return;
    }
    
    const rutaArchivo = path.join(directorioPaginas, request.url);
        
    fs.readFile(rutaArchivo, (err, contenido) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('Archivo no encontrado');
            return;
        }
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(contenido);
    });
});

function mostrarPaginaPrincipal(response) {

    fs.readdir(directorioPaginas, (err, archivos) => {
        if (err) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end('Error al leer el directorio');
            return;
        }
       
        // FILTRAR LOS .HTML
        const paginasHtml = archivos.filter(archivo => 
            archivo.endsWith('.html')
        );
        
       
        response.writeHead(200, { 'Content-Type': 'text/html' });
        
        let htmlPagina = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="oldLabs/css/plantilla.css">
                <title>Laboratorio 8</title>
                <style>
                    @import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';

                    body {
                        margin: 0 auto;
                        max-width: 50em;
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                        line-height: 1.5;
                        padding: 4em 1em;
                        color: #555;
                    }

                    header h1 {
                    color: white;
                    font-size: 2.5em;
                    font-weight: 300;
                    }

                    h2 {
                    margin-top: 1em;
                    padding-top: 1em;
                    }

                    h1,
                    h2,
                    strong {
                    color: #333;
                    }

                    code,
                    pre {
                    background: #eee;
                    }

                    code {
                    padding: 2px 4px;
                    vertical-align: text-bottom;
                    }

                    pre {
                    padding: 1em;
                    }

                    a {
                    color: #e81c4f;
                    }
                </style>
            </head>
            <body>
                <h1>Servidor Web: Node.js</h1>
                <p>Estas son las páginas HTML disponibles:</p>
        `;
        
        if (paginasHtml.length == 0) {
            htmlPagina += `
                <p>No hay páginas HTML en la carpeta</p>
            `;
        } else {
            htmlPagina += '<ul>';
            paginasHtml.forEach(archivo => {
                htmlPagina += `
                    <li>
                        <a href="${archivo}">${archivo}</a>
                    </li>
                `;
            });
            htmlPagina += '</ul>';
        }
        
        htmlPagina += `
                <div style="margin-top: 30px; padding: 10px; background-color: #e6f7ff; border-radius: 5px;">
                    <h3>Resultados de las funciones:</h3>
                    <p>Promedio de [10, 20, 30, 40, 50]: ${calcularPromedio([11, 22, 33, 44, 55])}</p>
                    <p>Fibonacci(10): ${fibonacci(10)}</p>
                    <p>Se ha creado un archivo llamado "lab8.txt"</p>
                </div>
            </body>
            </html>
        `;
        
        response.end(htmlPagina);
    });
}

servidor.listen(3000);