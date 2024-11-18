import { User_model } from "../model/user.js";
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class User_controller {

    static async create_user(req, res) {

        const username = req.body.username??"";
        const email = req.body.email;
        const password = req.body.password;
        const current_state="Active"; //Esto hay que añadirlo a la tabla en produccion 

        if(!email||!password){
            res.status(418).send("Error: Username and password are required");
            return;
        }
        const exists=await User_model.get_user_by_email(email); 
        if(exists.length>0){
            console.log("Email already exists");
            res.status(418).send("Error: Email already exists");
            return;
        }else{
            const salt = bycrypt.genSaltSync(10);
            const hashed_password = await bycrypt.hash(password, salt);
            const respose = await User_model.create_user(username, email, hashed_password, current_state);
            res.status(200).send(respose);
        }
        //res.send(ret)
        
    }

    static async login(req, res) {

        const email = req.body.email
        const password = req.body.password
        if(!email||!password){
            res.status(418).send("Error: Username and password are required");
            return;
        }

        const user=await User_model.get_user_by_email(email);

        if(user.length==0){
            res.status(418).send("Error: User not found");
            return;
        }
        const isvalid= await bycrypt.compare(password, user[0].pass);        
        if(isvalid){
            const token = jwt.sign({email:email, id:user[0].id,username:user[0].username,teleplone:user[0].teleplone,current_state:user[0].current_state}, process.env.JWT_SECRET1, {expiresIn:"1h"});
            res.status(200).cookie("access_token", token,{httpOnly: true,maxAge: 1000*60*60*24}).send("Login successful");

        }else{
            res.status(418).send("Error: Invalid password or email");
        }
        console.log(isvalid)
    }

    static async logout(req, res) {
        //aqui hace falta almacenar temporalmente la coockie 
        res.clearCookie("access_token");
        res.send("Logout successful");
    }
    static async test(req, res) {
        const ret = req.body.ret??"notrae"
        res.send(ret)
    }
}