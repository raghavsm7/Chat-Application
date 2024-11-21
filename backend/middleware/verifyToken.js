import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ msg: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        console.log("value of decoded is :",decoded)
        next(); 
    } catch (error) { 
        res.status(400).json({ msg: "Invalid token" });
    }
}

// module.exports = {
//     verifyToken
// };