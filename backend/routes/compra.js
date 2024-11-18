import { Router } from "express";
import { Compra_controller } from "../structure/controller/compra.js";
export const compra_router = Router();

compra_router.post("/create_compra", Compra_controller.insert_compra)
