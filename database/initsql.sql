-- Crear tabla payments
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  payment_type VARCHAR(255),
  value VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  association VARCHAR(255)
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
