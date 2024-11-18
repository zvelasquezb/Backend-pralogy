import  pool  from '../../util/conection_mariadb.js'
export class User_model {
    static async get_user_by_email(email) {
        try {
            const res = await pool.query(`SELECT * FROM DB1.users WHERE email = ?;`, [email]);
            return res;
        } catch (e) {
            console.log(`Unable to get user: ${e}`)
        }
    }
    static async create_user(username, email, teleplone, password, current_state) {
        try {
            const res = await pool.query(`INSERT INTO DB1.users (username, email, pass, current_state) VALUES(?, ?, ?, ?);`, [username, email, teleplone, password, current_state]);
            console.log("Usuario creado")
            return "User created";
        } catch (e) {
            console.log(`Unable  to get user: ${e}`)
        }
    }
}