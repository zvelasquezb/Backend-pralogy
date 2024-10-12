import express, { request, response } from "express"
import { PORT } from "./config.js"
import { register } from "./user/register.js"
import { login } from "./user/login.js"
import { getCompras } from "./compras/getCompras.js"
import cookieParser from "cookie-parser"
import { insertData } from "./data/insertData.js"
import jwt from "jsonwebtoken"


let currentUser = null

const app = express()

app.use(cookieParser())

app.use(express.json())

app.set("view engine", "ejs")

app.post("/insert", async (req, res) => {
        const { paymentId, movimiento, fecha, monto, nombre, cuenta } = req.body
        try {
            await insertData.insert(paymentId, movimiento, fecha, monto, nombre, cuenta)
            res.status(201).send("compra insertada")
        } catch (err) {
            if ("Error: El pago ya se registro" == err) {
                res.status(401).send("El pago ya se encuentra registrado")
            } else {
                res.status(401).send("No es posible insertar esa compra")
            }
        }
    }
)

app.get("/deliver", async (req, res) => {
    const token = req.query.token
    if (!token) {
        return res.status(403).send("Acceso denegado")
    }
    try {
        const verify = jwt.verify(token, "0e99de91e8146855ecc0ac82ec42fbab0bb2d9cd8e6060794d74c73cec8f4193")
        console.log(verify)

        let datos = await getCompras.getCompra()
        let transformed = []
        transformed.push([])
        for (let llaves of Object.keys(datos[0])) {
            transformed[0].push(llaves)
        }
        for (let d of datos) {
            let row = []
            for (let head of transformed[0]) {
                row.push(d[head])
            }
            transformed.push(row)
        }
        res.render("../views/tabla", { data: transformed })

    } catch (error) {
        res.status(401).send("Acceso denegado")
    }

})

app.get("/", (req, res) => {
    res.render("../views/login", { name: "zamir", prueba: true })
})
app.post("/createtoken", async (req, res) => {
    let loginResoult = login.loginDeliver()
    const token = loginResoult[3]
    console.log(`${PORT}/deliver?token=${token}`,)
    res.status(202).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000 }).send("inicio de secion exitoso")
})

app.post("/login", async (req, res) => {
    const { pass, email } = req.body
    try {
        let loginResoult = await login.login(pass, email)
        if (loginResoult[0] == 1) {
            currentUser = email
        }
        const token = loginResoult[3]
        res.status(202).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000 }).send("inicio de secion exitoso")
        //guardar en cookies   
    } catch (err) {
        console.log(err)
        res.status(401).send("No es posible iniciar sesion")
    }
})

app.post("/getData", async (req, res) => {
    if (currentUser == null) {
        res.send("no se ha iniciado secion")
    } else {
        let datos = await getCompras.getCompra()
        res.send(datos)
    }
})

app.post("/logOut", async (req, res) => {
    currentUser = null
    res.send("sesion liberada")
})

app.post("/register", async (req, res) => {
    const { username, pass, email } = req.body
    try {
        await register.name(username, pass, email)
        res.status(201).send("usuario creado")
    } catch (err) {
        res.status(401).send("No es posible crear ese usuario")
    }
})

app.post("/logout", (req, res) => {
    res.send("hola mundo")
})
app.get("/protected", (req, res) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        return res.status(403).send("Acceso denegado")
    }
    try {
        const verify = jwt.verify(token, "0e99de91e8146855ecc0ac82ec42fbab0bb2d9cd8e6060794d74c73cec8f4193")
        console.log(verify)
        res.render("../views/tabla")
    } catch (error) {
        res.status(401).send("Acceso denegado")
    }
})

app.post("/marco", (req, res) => {
    res.send("polo")
})

app.listen(PORT, () => {
    console.log(`servidor escuchando en puerto: ${PORT}`)
})