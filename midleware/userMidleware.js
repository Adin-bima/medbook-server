const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userMidleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const [prefix, token] = authHeader.split(" ");

    if (prefix !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid authorization format" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: "JWT secret key not configured" });
    }

    const decoded = jwt.verify(token, secretKey);

    const userId = decoded.userId;

    const authorizedUser = await User.findById(userId).select("-password");

    if (!authorizedUser) {
      return res.status(403).json({ error: "User not authorized" });
    }

    req.user = authorizedUser;
    next();
  } catch (error) {
    console.error("Error in UserlMiddleware:", error);
    res.status(500).json({ error: error });
  }
};

module.exports = userMidleware;
