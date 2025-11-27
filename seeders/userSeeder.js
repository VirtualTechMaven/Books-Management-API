const bcrypt = require("bcrypt");
const User = require("../Models/User");
const runSeeder = require("./seed");

const usersData = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "admin"
  },
  {
    name: "Regular User",
    email: "user@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "user"
  }
];

const seedUsers = async () => {
  try {
    await User.deleteMany();
    console.log("Old users removed.");

    await User.insertMany(usersData);
    console.log("New users inserted.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeeder(seedUsers);
