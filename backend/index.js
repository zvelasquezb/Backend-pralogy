import express from 'express'
import { Router } from 'express'
import { user_router } from './routes/user.js'
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';


import pool from './util/conection_postgres.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.sesion = { user: null }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET1);
        console.log("data", data)
        req.sesion.user = data

    } catch (e) {}
    next()
})
app.disable('x-powered-by')

app.use("/user", user_router)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/protected", (req, res) => {
    const { user } = req.sesion
    console.log(user)
    if (!user) {
        console.log("dsads")
        res.status(401).send("Error: User not authenticated")
        return
    } else {
        res.send(user.email)
    }

})


app.post("/ping", (req, res) => {
    let test = req.body.asd
    console.log(test)
    res.send(test)
})

app.listen(process.env.BACKEND_PORT ?? 3000)