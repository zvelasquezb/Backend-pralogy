-- Crear tabla payments
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  paymentId VARCHAR(255),
  movimiento VARCHAR(255),
  fecha VARCHAR(255),
  monto VARCHAR(255),
  nombre VARCHAR(255),
  cuenta VARCHAR(255)
);

-- Crear tabla users (entre comillas invertidas para evitar conflictos)
CREATE TABLE `users` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  pass VARCHAR(255),
  email VARCHAR(255),
  role_fk INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla roles
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(255),
  description VARCHAR(255)
);

-- Añadir la clave foránea a la tabla users
ALTER TABLE `users` 
ADD CONSTRAINT fk_role FOREIGN KEY (role_fk) REFERENCES roles(id) ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO nombre_base_datos.roles (role_name,description) VALUES
	 ('domiciliario',NULL),
	 ('cajero',NULL),
	 ('supervisor',NULL);
