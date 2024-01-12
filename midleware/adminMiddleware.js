const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const adminMidleware = async (req, res, next) => {
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

    const AdminId = decoded.AdminId;

    const authorizedAdmin = await Admin.findById(AdminId);

    if (!authorizedAdmin) {
      return res.status(403).json({ error: "Admin not authorized" });
    }

    req.admin = authorizedAdmin;
    
    next();
  } catch (error) {
    console.error("Error in AdminlMiddleware:", error);
    res.status(500).json({ error: error });
  }
};

module.exports = adminMidleware;
