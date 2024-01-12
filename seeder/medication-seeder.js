const mongoose = require('mongoose');
const User = require('../models/user'); // Import your User model

const medicationData = [
  { name: 'Medication1', dose: '10mg', frequency: 'Twice a day', date: new Date() },
  { name: 'Medication2', dose: '5mg', frequency: 'Once a day', date: new Date() },
  { name: 'Medication3', dose: '20mg', frequency: 'Three times a day', date: new Date() },
];

async function seedDatabase() {
  try {
    console.info('Medication seeding started')
    const existingUsers = await User.find();

    if (existingUsers.length === 0) {
      console.error('No existing users found');
      return;
    }

    const updatedUsers = await Promise.all(existingUsers.map(async (user) => {
      const updatedMedicalRecords = Array.from({ length: 3 }, (_, index) => {
        return { ...medicationData[index], date: new Date() };
      });

      user.medical_records.medication = updatedMedicalRecords;

      return await user.save();
    }));

    console.log('Medication seeded', updatedUsers);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
  }
}

module.exports = seedDatabase
