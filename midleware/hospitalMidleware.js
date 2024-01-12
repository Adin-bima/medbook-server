const jwt = require("jsonwebtoken");
const Hospital = require("./models/Hospital");

const hospitalMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const [prefix, token] = authHeader.split(" ");

    if (prefix !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid authorization format" });
    }

    // Verify the token using the JWT secret key from the environment variable
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: "JWT secret key not configured" });
    }

    const decoded = jwt.verify(token, secretKey);

    // Assume the decoded information includes hospital ID
    const hospitalId = decoded.hospitalId;

    const authorizedHospital = await Hospital.findById(hospitalId);

    if (!authorizedHospital) {
      return res.status(403).json({ error: "Hospital not authorized" });
    }

    req.authorizedHospital = authorizedHospital;
    next();
  } catch (error) {
    console.error("Error in hospitalMiddleware:", error);
    res.status(500).json({ error: error });
  }
};

module.exports = hospitalMiddleware;
