const mongoose = require('mongoose');

// Define Hospital schema
const HospitalAccessSchema = new mongoose.Schema({
  hospital_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  collection_name: String,
  document_id: String,
  field_access: [
    {
      field_name: String,
      allowed_access: [String],
    },
  ],
});


const HospitalAccessModel = mongoose.model('HospitalAccess', HospitalAccessSchema);
module.exports = HospitalAccessModel;