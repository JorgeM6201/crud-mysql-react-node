SHOW DATABASES;
CREATE DATABASE empleados_crud;
SHOW DATABASES;
USE empleados_crud;

CREATE TABLE empleados(
id INT AUTO_INCREMENT,
nombre VARCHAR(100), 
edad INT, 
pais VARCHAR(100), 
cargo VARCHAR(100),
anios INT, 
PRIMARY KEY (id)
);
SHOW TABLES;

INSERT INTO empleados(nombre, edad,pais, cargo, anios) 
VALUES ("Jorge Mario", "56", "Colombia", "Ingeniero", 5);

SELECT * FROM empleados;

DELETE FROM empleados WHERE nombre IS NULL;

ALTER TABLE empleados MODIFY nombre VARCHAR(100) NOT NULL;
DESCRIBE empleados;

ALTER TABLE empleados MODIFY edad INT NOT NULL;
DESCRIBE empleados;

ALTER TABLE empleados MODIFY pais VARCHAR(100) NOT NULL;
DESCRIBE empleados;

ALTER TABLE empleados MODIFY cargo VARCHAR(100) NOT NULL;
DESCRIBE empleados;

ALTER TABLE empleados MODIFY anios INT NOT NULL;
DESCRIBE empleados;


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '10126201';

DELETE FROM empleados WHERE id=38;