export default function verify_session(req, res, next) {
    const token = req.cookies.access_token;
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET1);
        console.log("data", data)

    } catch (e) {
        res.status(401).send("Error: User not authenticated")
    }
    next()
    }