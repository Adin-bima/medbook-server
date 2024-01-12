require('dotenv').config();
const mongoose = require('mongoose')
const roleSeeder = require('./roles-seeder')
const adminSeeder = require('./admin-seeder')
const userSeeder = require('./user-seeder')
const medicationSeeder = require('./medication-seeder')
const hospitalSeeder = require('./hospital-seeder')

const mongoUri = process.env.MONGODB_URI

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
  
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


async function run(){
   await roleSeeder()
   await adminSeeder()
   await userSeeder()
   await medicationSeeder()
   await hospitalSeeder()

   mongoose.connection.close();
}

run()