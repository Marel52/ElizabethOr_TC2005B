-- Laboratorio 23: Manipulación de datos usando Stored Procedures

DELIMITER //

CREATE PROCEDURE sp_get_user_files(IN user_id_param INT)
BEGIN
    IF user_id_param IS NULL THEN
        SELECT f.*, u.name as username
        FROM files f
        LEFT JOIN users u ON f.user_id = u.id
        ORDER BY f.upload_date DESC;
    ELSE
        SELECT f.*, u.name as username
        FROM files f
        LEFT JOIN users u ON f.user_id = u.id
        WHERE f.user_id = user_id_param
        ORDER BY f.upload_date DESC;
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_get_file_stats()
BEGIN

    DECLARE total_files INT;
    DECLARE total_size BIGINT;
    DECLARE avg_size DECIMAL(10,2);
    DECLARE largest_file_id INT;
    DECLARE largest_file_name VARCHAR(255);
    DECLARE largest_file_size BIGINT;
    DECLARE newest_file_id INT;
    DECLARE newest_file_name VARCHAR(255);
    DECLARE newest_file_date DATETIME;

    SELECT 
        COUNT(*),
        IFNULL(SUM(size), 0),
        IFNULL(AVG(size), 0)
    INTO 
        total_files,
        total_size,
        avg_size
    FROM files;

    SELECT 
        id, original_name, size
    INTO 
        largest_file_id, largest_file_name, largest_file_size
    FROM files 
    ORDER BY size DESC 
    LIMIT 1;

    SELECT 
        id, original_name, upload_date
    INTO 
        newest_file_id, newest_file_name, newest_file_date
    FROM files 
    ORDER BY upload_date DESC 
    LIMIT 1;

    SELECT 
        total_files AS 'Total de archivos',
        CONCAT(ROUND(total_size / 1024 / 1024, 2), ' MB') AS 'Tamaño total',
        CONCAT(ROUND(avg_size / 1024, 2), ' KB') AS 'Tamaño promedio',
        largest_file_name AS 'Archivo más grande',
        CONCAT(ROUND(largest_file_size / 1024, 2), ' KB') AS 'Tamaño del más grande',
        newest_file_name AS 'Archivo más reciente',
        newest_file_date AS 'Fecha de subida';
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_search_labs(IN search_term VARCHAR(255))
BEGIN
    DECLARE search_pattern VARCHAR(257);
    
    IF search_term IS NULL OR search_term = '' THEN
        SELECT * FROM labs ORDER BY id;
    ELSE
 
        SET search_pattern = CONCAT('%', search_term, '%');
        
        SELECT * FROM labs 
        WHERE title LIKE search_pattern 
        OR description LIKE search_pattern
        ORDER BY 
            CASE 
                WHEN title LIKE search_pattern THEN 0
                ELSE 1
            END,
            id;
    END IF;
END //

DELIMITER ;

