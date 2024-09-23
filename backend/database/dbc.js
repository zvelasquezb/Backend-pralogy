// Importar la librería mariadb
import mariadb from 'mariadb';

// Crear un pool de conexiones
const pool = mariadb.createPool({
    host: 'localhost',      // Dirección del servidor MariaDB
    user: 'usuario',     // Usuario de la base de datos
    password: 'password_usuario', // Contraseña del usuario
    database: 'nombre_base_datos', // Nombre de la base de datos
    connectionLimit: 5      // Límite de conexiones simultáneas
});

// Exportar el pool para que pueda ser utilizado en otros archivos
export default pool;

/* 
para llamar este archivo usar:

import pool from "./database/dbc.js";

para hacer consultas usar el metodo quiery de pool que lanza consultas creando y cerrando conecciones tras cada consulta

async function test() {
 await console.log(await pool.query("select 'por fin'"))
}
    test()

*/