import pg from 'pg'
export let pool = null
try {
    pool = new pg.Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB
    })
    let status = await pool.query("SELECT 'accepted' as status");
    console.log(`Database conection: ${status.rows[0].status}`);
} catch (e) {
    throw new Error(`Database conection: error ${e}`);
}
export default  pool 
