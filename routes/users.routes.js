const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const isAuth = require('../middleware/is-auth');

router.get('/register', usersController.getRegister);
router.post('/register', usersController.postRegister);
router.get('/login', usersController.getLogin);
router.post('/login', usersController.postLogin);
router.get('/logout', usersController.getLogout);
router.get('/users', isAuth, usersController.getUsuarios);

module.exports = router;