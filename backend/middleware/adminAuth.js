import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.token || req.headers["auth-token"];
        if (!token) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Internal Server Error" });
    }
}

export default adminAuth;
