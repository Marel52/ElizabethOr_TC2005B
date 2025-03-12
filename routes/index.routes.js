const express = require  ('express')
const router = express.Router()

//router.get es para registrar un middleware para peticiones HTTP GET
//Parametros: ruta, funcion
router.get('/', (request, response)=>{
    response.send ('La conexión fue exitosa')
})


module.exports = router