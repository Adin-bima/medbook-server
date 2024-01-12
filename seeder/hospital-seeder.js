const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {allFakers : {en_US : faker}} = require('@faker-js/faker');
const Hospital = require('../models/hospital');

const generateFakeHospitalsData = () => {
  const hospitalsData = [];
  for (let i = 0; i < 10; i++) {
    const hospital = {
      name: "Hospital "+(i+1),
      password: "password"+(i+1),
      location: faker.location.city(),
      contact: {
        phone: faker.phone.number(),
        email: `${faker.company.name().toLowerCase().replace(/\s+/g, '')}@mail.example`,
      },
    };
    hospitalsData.push(hospital);
  }
  return hospitalsData;
};

async function seedDatabase() {
  try {
    console.info('Hospital seeding started')
    await Hospital.deleteMany();

    // Hash passwords before storing
    const fakeHospitalsData = generateFakeHospitalsData();
    const hashedHospitalsData = await Promise.all(fakeHospitalsData.map(async (hospital) => {
      const hashedPassword = await bcrypt.hash(hospital.password, 10);
      return { name: hospital.name, password: hashedPassword, location: hospital.location, contact: hospital.contact };
    }));

    await Hospital.create(hashedHospitalsData);
    console.log('Hospital seeding succeed');
  } catch (error) {
    console.error('Error seeding hospital database:', error);
  } finally {
  }
}

module.exports = seedDatabase

