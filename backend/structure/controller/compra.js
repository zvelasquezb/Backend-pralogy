import { Compra_model } from "../model/compra.js";

export class Compra_controller {

    static async insert_compra(req, res) {

        const { paymentId, movimiento, fecha_pago, monto, nombre, cuenta, origen } = req.body??null;

        if(!paymentId||!monto){
            res.status(418).send("Error: paymentId and monto are required");
            return;
        }
        try{
        let resoult=await Compra_model.insert_compra(paymentId, movimiento, fecha_pago, monto, nombre, cuenta, origen);
        res.status(200).send("Inserted payment");
        }catch(e){
            res.status(418).send("payment already exists");
        } 
    }
}