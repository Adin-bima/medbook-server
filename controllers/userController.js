const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const exsistedEmail = await User.findOne({ email: email });

    if (exsistedEmail) {
      res.return_error({}, (message = "Email already used"));
    }

    const user = await User.create({ email, password: hashedPassword });
    return res.return_success(user, "User has been created");
  } catch (error) {
    return res.return_error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password, ...updateData } = req.body;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.return_success(updatedUser, (message = "User has been updated"));
  } catch (error) {
    return res.return_error(error)
  }
};

const getCurrentUserProfile = async (req, res) => {
  try {
    return res.return_success(req.user);
  } catch (error) {
    return res.return_error(error);
  }
};

const updateCurentUserProfile = async (req, res) => {
  try {
    const { userId } = req.user._id;
    const { password, ...updateData } = req.body;

    const exsistedEmail = await User.findOne({
      email: updateData.email,
      _id: { $ne: userId },
    });

    if (exsistedEmail) {
      res.return_error({}, (message = "Email already used"));
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.return_success(updatedUser, (message = "User has been updated"));
  } catch (error) {
    return res.return_error(error)
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, { password: 0 });

    return res.return_success(user, "User data successfully retrieved")
  } catch (error) {
    return res.return_error(error)
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    return res.return_success("User has been deleted")
  } catch (error) {
    return res.return_error(error)
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, medical_record: 0 });
    return res.return_success(users, "All user data successfully retrieved")
  } catch (error) {
    return res.return_error(error)
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.return_error({}, "Invalid email or password", code = 401)
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.return_error({}, "Invalid email or password", code = 401)
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    return res.return_success({token}, "User sucecssfully loged in")
  } catch (error) {
    return res.return_error(error)
  }
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  login,
  deleteUserById,
  getCurrentUserProfile,
  updateCurentUserProfile,
};
