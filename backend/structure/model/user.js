import  pool  from '../../util/conection_postgres.js'
export class User_model {
    static async get_user_by_email(email) {
        try {
            const res = await pool.query(`SELECT * FROM public.user WHERE email = $1`, [email]);
            return res.rows;
        } catch (e) {
            console.log(`Unable to get user: ${e}`)
        }
    }
    static async create_user(username, email, teleplone, password, current_state) {
        try {
            const res = await pool.query(`INSERT INTO public."user" (username, email, teleplone, "password", current_state) VALUES($1, $2, $3, $4, $5);`, [username, email, teleplone, password, current_state]);
            return "User created";
        } catch (e) {
            console.log(`Unable to get user: ${e}`)
        }
    }
}