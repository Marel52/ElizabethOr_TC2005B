const File = require('../models/file.model');
const fs = require('fs');
const path = require('path');

exports.getUploadForm = (request, response, next) => {
    response.render('files/upload', {
        title: 'Subir archivo',
        isLoggedIn: request.session.isLoggedIn || false,
        userId: request.session.userId || null,
        csrfToken: request.csrfToken(),
        fileError: request.session.fileError || null,
        fileSuccess: request.session.fileSuccess || null
    });
    
    request.session.fileError = null;
    request.session.fileSuccess = null;
};

exports.postUploadFile = (request, response, next) => {

    if (!request.file) {
        request.session.fileError = 'Por favor selecciona un archivo';
        return response.redirect('/files/upload');
    }

    try {
        const originalName = request.file.originalname;
        const filename = request.file.filename;
        const filepath = request.file.path;
        const mimetype = request.file.mimetype;
        const size = request.file.size;
        const userId = request.session.userId || null;
        
        console.log('Información del archivo subido:', request.file);

        const newFile = new File(originalName, filename, filepath, mimetype, size, userId);
        
        newFile.save()
            .then(() => {
                request.session.fileSuccess = `Archivo ${originalName} subido exitosamente.`;
                response.redirect('/files');
            })
            .catch(err => {
                console.error('Error al guardar el archivo en la base de datos:', err);
                request.session.fileError = 'Error al guardar el archivo. Por favor, inténtalo de nuevo.';
                response.redirect('/files/upload');
            });
    } catch (error) {
        console.error('Error en la subida del archivo:', error);
        request.session.fileError = 'Error al procesar el archivo. Por favor, inténtalo de nuevo.';
        response.redirect('/files/upload');
    }
};

exports.getAllFiles = (request, response, next) => {
    File.fetchAll()
        .then(([files, fieldData]) => {
            response.render('files/list', {
                title: 'Archivos',
                files: files,
                isLoggedIn: request.session.isLoggedIn || false,
                userId: request.session.userId || null,
                fileSuccess: request.session.fileSuccess || null,
                fileError: request.session.fileError || null
            });
            
            request.session.fileSuccess = null;
            request.session.fileError = null;
        })
        .catch(err => {
            console.error('Error al obtener los archivos:', err);
            response.status(500).render('404', {
                title: 'Error',
                message: 'Error al cargar los archivos.'
            });
        });
};

exports.downloadFile = (request, response, next) => {
    const fileId = request.params.fileId;
    
    File.findById(fileId)
        .then(([files, fieldData]) => {
            if (files.length === 0) {
                return response.status(404).render('404', {
                    title: 'Archivo no encontrado',
                    message: 'El archivo solicitado no existe'
                });
            }
            
            const file = files[0];
            const filePath = file.path;
            
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return response.status(404).render('404', {
                        title: 'Archivo no encontrado',
                        message: 'El archivo físico no existe en el servidor'
                    });
                }
                
                response.setHeader('Content-Type', file.mimetype);
                response.setHeader('Content-Disposition', `attachment; filename="${file.original_name}"`);
                
                fs.createReadStream(filePath).pipe(response);
            });
        })
        .catch(err => {
            console.error('Error al obtener el archivo:', err);
            response.status(500).render('404', {
                title: 'Error',
                message: 'Error al descargar el archivo.'
            });
        });
};

exports.deleteFile = (request, response, next) => {
    const fileId = request.params.fileId;
    
    if (!request.session.isLoggedIn) {
        return response.redirect('/user/login');
    }
    
    File.findById(fileId)
        .then(([files, fieldData]) => {
            if (files.length === 0) {
                return response.status(404).render('404', {
                    title: 'Archivo no encontrado',
                    message: 'El archivo solicitado no existe'
                });
            }
            
            const file = files[0];
            
            if (file.user_id && file.user_id !== request.session.userId) {
                request.session.fileError = 'No tienes permiso para eliminar este archivo.';
                return response.redirect('/files');
            }
            
            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo físico:', err);
                }
                
                File.deleteById(fileId)
                    .then(() => {
                        request.session.fileSuccess = 'Archivo eliminado correctamente.';
                        response.redirect('/files');
                    })
                    .catch(err => {
                        console.error('Error al eliminar el archivo de la base de datos:', err);
                        request.session.fileError = 'Error al eliminar el archivo. Por favor, inténtalo de nuevo.';
                        response.redirect('/files');
                    });
            });
        })
        .catch(err => {
            console.error('Error al obtener el archivo:', err);
            response.status(500).render('404', {
                title: 'Error',
                message: 'Error al eliminar el archivo.'
            });
        });
};