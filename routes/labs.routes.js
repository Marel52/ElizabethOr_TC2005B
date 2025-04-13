const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');
const isAuth = require('../middleware/is-auth');


router.get('/:labId', isAuth, indexController.getLab);

module.exports = { router };