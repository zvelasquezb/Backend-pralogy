import mariadb from 'mariadb';
    let pool=null
try{
        pool = mariadb.createPool({
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        host: process.env.MARIADB_HOST,
        port: process.env.MARIADB_PORT,
        database: process.env.MARIADB_DB,
        connectionLimit: 5,
        }
    )
    
} catch (e) {
    throw new Error(`Database conection: error ${e}`);
}

async function connection_to_mariadb_status() {
     
    try{
        let resp = await pool.query("SELECT 'Successfully connected' as message")
        console.log(`{time:${Date().toString()}, Database conection:${resp[0].message}}`);
    
    }catch(e){
        console.log("error",`Database conection: error ${e}`);
}
}
connection_to_mariadb_status()
export default  pool 
