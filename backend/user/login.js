import pool from "../database/dbc.js"
import jwt from "jsonwebtoken" 
// login ingenuo
export class login {
    static async login(passW, email) {
        const resoult = await pool.query("select email,id from nombre_base_datos.users where email = ? and pass=?", [email,passW]);
        if (resoult.length >= 1) {
            const token = jwt.sign({ id: resoult[0].id, usrEmail: email }, "0e99de91e8146855ecc0ac82ec42fbab0bb2d9cd8e6060794d74c73cec8f4193", { expiresIn: "1h" })
            return([1,"El usuario fue encontrado exitosamente",resoult[0].id,token])
        } else {
            console.log(passW,email)
            throw new Error("El usuario no se encuentra registrado en el sistema");
        }
    }
    static loginDeliver() {
        const token = jwt.sign({ id: "deliver", usrEmail: "deliver" }, "0e99de91e8146855ecc0ac82ec42fbab0bb2d9cd8e6060794d74c73cec8f4193", { expiresIn: "1h" })
        console.log(token)
        return([1,"token delivery","deliver",token])
    }
}