import  pool  from '../../util/conection_mariadb.js'
export class Compra_model {
    static async insert_compra(paymentId, movimiento, fecha_pago, monto, nombre, cuenta, origen) {
        try {
            //
            const constraint = await pool.query(
                "select fecha_pago from DB1.payments where paymentId = ? and monto=?",
                [paymentId, monto]);
                console.log((constraint.length >= 1));
            if (constraint.length >= 1) {
                throw new Error('Error: payment already exists');
                }

            const res = await pool.query(
                `INSERT INTO DB1.payments  
                (paymentId, movimiento, fecha_pago, monto, nombre, cuenta, origen) 
                VALUES(?, ?, ?, ?, ?, ?, ?)`, 
                [paymentId, movimiento, fecha_pago, monto, nombre, cuenta, origen]);
            return res.rows;
        } catch (e) {
            throw new Error(`Unable to insert payment ${e}`);
        }
    }

}