const bcrypt = require('bcrypt');
const Hospital = require('../models/hospital');

const registerHospital = async (req, res) => {
  try {
    const { name, password, location, contact } = req.body;

    const existingHospital = await Hospital.findOne({ name });

    if (existingHospital) {
      return res.return_error({}, "Hospital with the same name already exist");
    }

    const hashedPassword = await bcrypt.hash( password, 10);
    const newHospital = new Hospital({
      name,
      password: hashedPassword,
      location,
      contact,
    });

    await newHospital.save();
    res.return_success(newHospital, "Hospital has been created")
  } catch (error) {
    res.return_error(error, "Failed to create new hospital")
  }
};

const updateHospital = async(req, res) => {
  try{
    const {name, password, location, contact} = req.body;
    const {hospitalId} = req.params;

    const encriptedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await Hospital.findByIdAndUpdate(hospitalId, {
      name : name,
      password : encriptedPassword,
      contact : contact,
      location : location
    })

    return res.status(200).json()

  }catch(error){
    res.status(500).json( error );
  }
}

module.exports = {
  registerHospital,
};
