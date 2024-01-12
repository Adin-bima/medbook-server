const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Hospital = require('../models/hospital');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateJwt = async (req, res) => {
  try {
    const { hospitalId, password } = req.body;

    const hospital = await Hospital.findOne({ _id: hospitalId });
    if (!hospital || !await bcrypt.compare(password, hospital.password)) {
      return res.status(401).json({ error: 'Invalid hospital credentials' });
    }
    
    const token = jwt.sign({ hospitalId }, JWT_SECRET_KEY, { expiresIn: "100y" });
    res.json({ token });
  } catch (error) {
    console.error('Error in generateJwt:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  generateJwt,
};
