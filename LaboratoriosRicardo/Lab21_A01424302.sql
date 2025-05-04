USE lab15;

-- 1. La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.
SELECT 
    SUM(e.Cantidad) AS SumaCantidades, 
    SUM(e.Cantidad * m.Precio * (1 + m.Impuesto/100)) AS ImporteTotal
FROM 
    entregan e, materiales m 
WHERE 
    e.clave = m.clave AND 
    e.Fecha BETWEEN '1997-01-01' AND '1997-12-31';

-- 2. Para cada proveedor, obtener la razón social del proveedor, 
-- número de entregas e importe total de las entregas realizadas.
SELECT 
    p.RazonSocial, 
    COUNT(*) AS NumEntregas, 
    SUM(e.Cantidad * m.Precio * (1 + m.Impuesto/100)) AS ImporteTotal 
FROM 
    Entregan e, 
    Proveedores p, 
    Materiales m
WHERE 
    e.RFC = p.RFC 
    AND e.clave = m.clave
GROUP BY 
    p.RFC, p.RazonSocial;

-- 3. Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, la máxima cantidad entregada,
-- el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.
SELECT
	m.clave,
    m.descripcion,
    SUM(e.cantidad) AS CantidadTotalEntregada,
    MIN(e.cantidad) AS MinCantidadEntregada,
    MAX(e.cantidad) AS MaxCantidadEntregada, 
    SUM(e.Cantidad * m.Precio * (1 + m.Impuesto/100)) AS ImporteTotal
FROM 
	Materiales m,
    Entregan e
WHERE 
	e.clave = m.clave
GROUP BY 
	m.clave, m.descripcion
HAVING AVG(e.Cantidad) > 400;

-- 4. Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, 
-- detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.
SELECT 
	p.RazonSocial, 
	AVG(e.Cantidad) AS CantidadPromedio, 
	e.Clave, 
	m.Descripcion
FROM 
	Materiales m,
    Entregan e,
    Proveedores p
WHERE 
	e.Clave = m.Clave
AND
	p.RFC = e.RFC
GROUP BY 
	p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING 
	AVG(e.Cantidad) >= 500;
    
-- 5. Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores:
-- aquellos para los que la cantidad promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.
SELECT 
	p.RazonSocial,
    m.Clave,
    m.Descripcion,
    AVG(e.Cantidad) AS CantidadPromedio
FROM 
	Proveedores p, 
    Entregan e, 
    Materiales m
WHERE 
	e.Clave = m.Clave
AND
	p.RFC = e.RFC
GROUP BY
	p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING 
    AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450;
    
-- Inserta cinco nuevos materiales
INSERT INTO Materiales VALUES (1500, 'Panel de yeso', 220.00, 22.00);
INSERT INTO Materiales VALUES (1510, 'Clavos 2"', 45.00, 4.50);
INSERT INTO Materiales VALUES (1520, 'Impermeabilizante', 180.00, 18.00);
INSERT INTO Materiales VALUES (1530, 'Mortero', 100.00, 10.00);
INSERT INTO Materiales VALUES (1540, 'Malla electrosoldada', 450.00, 45.00);

SELECT * FROM materiales;

-- 6. Clave y descripción de los materiales que nunca han sido entregados.
SELECT 
    m.Clave, 
    m.Descripcion
FROM 
    Materiales m
WHERE 
    m.Clave NOT IN (
        SELECT DISTINCT e.Clave 
        FROM Entregan e
	);

-- 7. Razón social de los proveedores que han realizado entregas tanto al proyecto 
-- 'Vamos México' como al proyecto 'Querétaro Limpio'.
SELECT p.RazonSocial
FROM Proveedores p
WHERE p.RFC IN(
        SELECT e.RFC
        FROM Entregan e, Proyectos pr
        WHERE e.Numero = pr.Numero
        AND pr.Denominacion = 'Vamos Mexico'	
		)
AND p.RFC IN (
        SELECT e.RFC
        FROM Entregan e, Proyectos pr 
		WHERE e.Numero = pr.Numero
        AND pr.Denominacion = 'Queretaro Limpio'
);

-- 8. Descripción de los materiales que nunca 
-- han sido entregados al proyecto 'CIT Yucatán'.
SELECT m.Descripcion
FROM Materiales m
WHERE m.Clave 
NOT IN (
        SELECT e.Clave
        FROM Entregan e, Proyectos p
        WHERE e.Numero = p.Numero
        AND p.Denominacion = 'CIT Yucatán'
    );
-- 9. Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad 
-- entregada es mayor al promedio de la cantidad entregada por el proveedor con el RFC 'VAGO780901'
SELECT 
    p.RazonSocial,
    AVG(e.Cantidad) AS PromedioEntregado
FROM 
    Proveedores p, Entregan e
WHERE 
	p.RFC = e.RFC
GROUP BY 
    p.RFC, p.RazonSocial
HAVING 
    AVG(e.Cantidad) > (
        SELECT AVG(e.Cantidad)
        FROM Entregan e
        WHERE e.RFC = 'VAGO780901'
    );

-- 10.  RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' 
-- y cuyas cantidades totales entregadas en el 2000 fueron mayores a las cantidades totales entregadas en el 2001
SELECT 
    p.RFC, 
    p.RazonSocial 
FROM 
    Proveedores p
WHERE 
    p.RFC IN (
        SELECT e.RFC 
        FROM Entregan e 
        JOIN Proyectos pr ON e.Numero = pr.Numero 
        WHERE pr.Denominacion = 'Infonavit Durango'
    )
    AND (
        SELECT SUM(Cantidad)
        FROM Entregan 
        WHERE RFC = p.RFC AND Fecha >= '2000-01-01' AND Fecha < '2001-01-01'
    ) > (
        SELECT SUM(Cantidad)
        FROM Entregan 
        WHERE RFC = p.RFC AND Fecha >= '2001-01-01' AND Fecha < '2002-01-01'
    );
    