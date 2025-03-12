const express = require  ('express')
const router = express.Router()
const controller = require ('../controllers/index.controller')

//router.get es para registrar un middleware para peticiones HTTP GET
//Parametros: ruta, funcion
router.get('/', controller.index);



module.exports = router;