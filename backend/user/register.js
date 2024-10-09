import pool from "../database/dbc.js"
// registro ingenuo
export class register {
    static async name(userN, passW, email) {
        const resoult = await pool.query("select email from nombre_base_datos.users where email = ?", email);
        console.log(resoult.length)
        if (resoult.length >= 1) {
            throw new Error("El email ya esta en uso");
        } else {
            const resoult = await pool.query("INSERT INTO nombre_base_datos.users (username, pass, email) VALUES(?, ?, ?)", [userN,passW,email]);
            
        }
    }
}