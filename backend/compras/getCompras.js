import pool from "../database/dbc.js";
export class getCompras{
    static async getCompra(){
        let data=await pool.query("select * from nombre_base_datos.payments")
        return data

    }
}