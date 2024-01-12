const mongoose = require('mongoose');
const Role = require('../models/role'); // Import your Role model


// Define the data to be seeded
const dataToSeed = [
  {
    role: 'admin',
    access_data: [
      { collection_name: 'admin', allowed_access: [ 'read' ] },
      { collection_name: 'hospital_access_data', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'hospital', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'role', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'user', allowed_access: ['create', 'read', 'update', 'delete'] }
    ]
  },

  {
    role: 'head_admin',
    access_data: [
      { collection_name: 'admin', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'hospital_access_data', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'hospital', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'role', allowed_access: ['create', 'read', 'update', 'delete'] },
      { collection_name: 'user', allowed_access: ['create', 'read', 'update', 'delete'] }
    ]
  }
];


// Function to seed the data
const seedDatabase = async () => {
  try {
    console.info('Role seeding started')
    // Remove existing data
    await Role.deleteMany();

    // Insert the new data
    await Role.create(dataToSeed);

    console.log('Role seeded');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
  }
};

// Call the seed function
module.exports = seedDatabase
