const mongoose = require('mongoose');
const Admin = require('../models/admin');
const Role = require('../models/role')
const bcrypt = require('bcrypt')


const adminsData = [
  { username: 'admin1', password: 'password1' },
  { username: 'admin2', password: 'password2' },
  { username: 'admin3', password: 'password3' },
];

async function seedDatabase() {
  try {
    console.info('Admin seeding started')
    await Admin.deleteMany(); 

    const [head_admin_role, admin_role] = await Promise.all([
      Role.findOne({ role: 'head_admin' }),
      Role.findOne({ role: 'admin' }),
    ]);

    if (!head_admin_role || !admin_role) {
      console.error('Roles not found');
      return;
    }

    const hashedAdminsData = await Promise.all(adminsData.map(async (admin) => {
      const hashedPassword = await bcrypt.hash(admin.password, 10);

      if (admin.username === 'admin1') {
        return { username: admin.username, password: hashedPassword, role_id: head_admin_role._id };
      } else {
        return { username: admin.username, password: hashedPassword, role_id: admin_role._id };
      }
    }));

    await Admin.create(hashedAdminsData);
    console.info('Admin seeded')
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
  }
}

module.exports = seedDatabase
