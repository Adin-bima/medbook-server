const mongoose = require('mongoose');
const {allFakers : {en_US : faker}} = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

async function seedDatabase() {
  try {
    console.log('User seeding started');
    await User.deleteMany();

    const users = [];
    for (let i = 0; i < 20; i++) {
      const password = "password"+(i+1)
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email: faker.internet.email(),
        password: hashedPassword,
      };
      users.push(newUser);
    }

    await User.insertMany(users);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
  }
}


module.exports = seedDatabase
