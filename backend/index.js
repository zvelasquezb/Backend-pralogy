import express from 'express'
import { Router } from 'express'
import { user_router } from './routes/user.js'
import { compra_router } from './routes/compra.js'

import verify_session from './util/verify_session.js';
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';


import pool from './util/conection_mariadb.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')

app.set("view engine", "ejs");



app.use("/user", user_router)
app.use("/compra", compra_router)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/protected",verify_session, (req, res) => {
    res.send("protected")
    }
)


app.post("/ping", (req, res) => {
    res.send("pong")
})

app.listen(process.env.BACKEND_PORT ?? 3000,"0.0.0.0", () => console.log(`Backend listening on port ${process.env.BACKEND_PORT ?? 3000}`))
