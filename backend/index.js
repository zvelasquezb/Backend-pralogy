import express, { request, response } from "express"
import { PORT } from "./config.js"
import { register } from "./user/register.js"
//para validadr el username usar zod
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
    res.send("hola mundo")
})

app.post("/login", (req, res) => {
    res.send("hola mundo")
})

app.post("/register", async (req, res) => {
    const { username, pass, email } = req.body
    res.status(201).send("usuario creado")
    //falta enviar respuesta y manejar mejor creacion de usuarios
    try {
        await register.name(username, pass, email)
    } catch (err) {
        res.status(401).send("sin assceso")
    }


    res.send("hola mundo")
})
app.post("/logout", (req, res) => {
    res.send("hola mundo")
})
app.post("/protected", (req, res) => {
    res.send("hola mundo")
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto: ${PORT}`)
})