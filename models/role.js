const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role : String,
  access_data : [
    {
      collection_name : String,
      allowed_access : [String]
    }
  ]
})

RoleModel = mongoose.model('Role', RoleSchema);
module.exports = RoleModel