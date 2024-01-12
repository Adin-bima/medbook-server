const mongoose = require('mongoose');

// Define Hospital schema
const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password : {type : String, required : true},
  location: String,
  contact: {
    phone: String,
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
    },
  },
});

const HospitalModel = mongoose.model('Hospital', HospitalSchema);
module.exports = HospitalModel;