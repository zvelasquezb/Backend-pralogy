import pool from "../database/dbc.js"
import jwt from "jsonwebtoken"
// login ingenuo
export class insertData {
    static async insert(paymentId, movimiento, fecha, monto, nombre, cuenta) {
        const constraint = await pool.query("select fecha from nombre_base_datos.payments where paymentId = ? and monto=?", [paymentId, monto]);
        console.log("constaint",constraint.length)
        if (constraint.length >= 1) {
            throw new Error("El pago ya se registro");
        } else {
            const resoult = await pool.query('INSERT INTO nombre_base_datos.payments (paymentId, movimiento, fecha, monto, nombre, cuenta) VALUES(?, ?, ?, ?, ?, ?)', [paymentId, movimiento, fecha, monto, nombre, cuenta]);
            if (resoult.length >= 1) {

                return ("pago registrado exitosamente");
            } else {
                console.log(resoult)
                console.log("error al registar el pago")
            }
        }
    }
}