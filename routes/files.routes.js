const express = require('express');
const router = express.Router();
const filesController = require('../controllers/files.controller');
const isAuth = require('../middleware/is-auth');

router.get('/', filesController.getAllFiles);
router.get('/upload', isAuth, filesController.getUploadForm);
router.post('/upload', isAuth, filesController.postUploadFile);
router.get('/download/:fileId', filesController.downloadFile);
router.post('/delete/:fileId', isAuth, filesController.deleteFile);

module.exports = router;