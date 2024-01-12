const Admin = require('../models/admin');
const bcrypt = require('bcrypt')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Admin.findOne({ username });

    if (!user) {
      return res.return_error({}, "Admin not found")
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.return_error({}, "Username and password does not match", 401)
    }

    const token = jwt.sign({ adminId: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

    res.return_success({token})
  } catch (error) {
    return res.return_error(error, code = 400)
  }
};

module.exports = {login}