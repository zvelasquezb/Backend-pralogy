-- Crear tabla payments
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paymentId VARCHAR(255),
  movimiento VARCHAR(255),
  fecha_pago VARCHAR(255),
  fecha_consulta VARCHAR(100),
  monto VARCHAR(255),
  nombre VARCHAR(255),
  cuenta VARCHAR(255),
  origen VARCHAR(10)
);

-- Crear tabla users (entre comillas invertidas para evitar conflictos)
CREATE TABLE `users` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  pass VARCHAR(255),
  email VARCHAR(255),
  role_fk INT,
  current_state VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla roles
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(255),
  description VARCHAR(255)
);
CREATE TABLE plata_total (
  id INT PRIMARY KEY AUTO_INCREMENT,
  origen VARCHAR(50),
  monto VARCHAR(50)
);
-- Añadir la clave foránea a la tabla users
ALTER TABLE `users` 
ADD CONSTRAINT fk_role FOREIGN KEY (role_fk) REFERENCES roles(id) ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO DB1.roles (role_name,description) VALUES
	 ('domiciliario',NULL),
	 ('cajero',NULL),
	 ('supervisor',NULL);
