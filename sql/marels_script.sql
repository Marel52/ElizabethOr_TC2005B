-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS marels;
USE marels;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de laboratorios
CREATE TABLE labs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    filename VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de archivos
CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    mimetype VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    user_id INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insertar datos de laboratorios
INSERT INTO labs (id, title, description, filename) VALUES
('Lab1', 'Laboratorio 1: HTML5', '¿Quién soy? Página de presentación', 'Laboratorio1_HTML5_TC2005B.html'),
('Lab4', 'Laboratorio 4: JavaScript', 'Ejercicios de JavaScript', 'Laboratorio4_JS_TC2005B.html'),
('Lab5', 'Laboratorio 5: Framework', 'Página implementando el Framework BULMA', 'Laboratorio5_FrameworkBULMA_TC2005B.html'),
('Lab6', 'Laboratorio 6: POE', 'Validador de contraseñas', 'Laboratorio6_POE.html');