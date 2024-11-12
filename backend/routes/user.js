import { Router } from "express";
import { User_controller } from "../structure/controller/user.js";
export const user_router = Router();

user_router.post("/test", User_controller.test)
user_router.post("/create_user", User_controller.create_user)
user_router.post("/login", User_controller.login)
user_router.post("/logout", User_controller.logout)

