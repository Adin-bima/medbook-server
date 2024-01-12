const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },

  password: {
    type: String,
    required: true,
  },

  medical_records: {
    medication: {
      type: [
        {
          date: Date,
          name: String,
          dose: String,
          frequency: String,
        },
      ],
      default : []
    },
  },
});

UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel
