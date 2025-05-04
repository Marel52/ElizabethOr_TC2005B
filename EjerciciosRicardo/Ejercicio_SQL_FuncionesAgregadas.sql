-- Ejercicio: SQL con Funciones Agregadas
-- El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado.
SELECT SUM(sueldo) as "Ingreso Total"
FROM elenco 
GROUP BY nombre;

-- El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's.
SELECT nomestudio, SUM(presupuesto) as 'Presupuesto total'
FROM pelicula
WHERE año BETWEEN 1980 and 1990
GROUP BY nomestudio;

-- Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película
SELECT nombre, AVG(sueldo) as 'Promedio Sueldo Hombres'
FROM elenco E, actor A
WHERE E.nombre = A.nombre AND A.sexo = 'H'
GROUP BY nombre
HAVING AVG(sueldo)> 5000000
ORDER BY (sueldo) DESC;

--  Título y año de producción de las películas con menor presupuesto.
SELECT titulo, año, MIN(presupuesto) as 'Menor presupuesto'
FROM pelicula 
GROUP BY titulo
ORDER BY presupuesto ASC;

-- Mostrar el sueldo de la actriz mejor pagada.
SELECT nombre, MAX(sueldo) as 'Mayor Sueldo Mujer'
FROM elenco E, actor A
WHERE E.nombre = A.nombre AND A.sexo ='Femenino'
GROUP BY E.nombre
ORDER BY E.sueldo ASC LIMIT 1;