// request -> petición del cliente
// response -> peticion al servidor
// cliente = navegador

const express = require ('express')
const app = express();

app.listen(3036, () => {
    console.log ('Se ha iniciado in servidor en http://localhost:3036 ')
})