const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type : String,
    required : true,
  },

  role_id: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you're using the role's ObjectId here
    ref: 'Role', // Reference to the Role model
  },
});


const AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel