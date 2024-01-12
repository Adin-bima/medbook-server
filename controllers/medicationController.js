const mongoose = require('mongoose');
const User = require('../models/user'); 
const Hospital = require('../models/hospital'); 


const createMedicationData = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, dose, frequency, hospital_id } = req.body;

    if (!hospital_id) {
      return res.return_error({}, message = "Hospital ID is required", 400);
    }

    const isValidHospital = await isValidHospitalId(hospital_id);
    if (!isValidHospital) {
      return res.return_error({}, message = "Invalid hospital id", 400);
    }

    const newMedication = { name, dose, frequency, hospital_id };
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        $push: { 'medical_records.medication': newMedication },
        $addToSet: { 
          'medical_records.hospital_access': {
            hospital_id,
            allowed: {
              name: false,
              dose: false,
              frequency: false,
            }
          }
        }
      },
      { new: true }
    );

    return res.return_success(updatedUser.medical_records.medication)
  } catch (error) {
    return res.return_error(error)
  }
};

// Validate if the hospital ID exists (you may customize this based on your model)
const isValidHospitalId = async (hospitalId) => {
  try {
    const hospital = await Hospital.findById(hospitalId);
    return !!hospital; // Returns true if the hospital exists, false otherwise
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getMedicationByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId, { password: 0 });

    if (!user) {
      return res.return_error({}, message = "User not found", 404);
    }

    const { medical_records, ...user_bio } = user || {};

    const medications = medical_records ? medical_records.medication : [];

    return res.return_success({medications, user_bio}, "Medication data of user successfully retrieved");
  } catch (error) {
    return res.return_error(error)
  }
};


module.exports = { createMedicationData, getMedicationByUserId };
