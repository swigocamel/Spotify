// src/middleware/authMiddleware.js
const { verifyJWT } = require("../utils/jwtUtils"); // 用來生成 JWT token


function authMiddleware (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: false,
            message: "未授權，請先登入"
        })
    }

    // 取得 token
    const token = authHeader.split(' ')[1];

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const decoded = verifyJWT(token); // 驗證 token
        req.user = decoded; // 將解碼的 token 資料存入 req.user
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "無效的token"
        })
    }
}

module.exports = authMiddleware;