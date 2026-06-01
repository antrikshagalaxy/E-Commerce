import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Unauthorized login, Please login again." })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Internal Server Error" })
    }
}

export default authUser
