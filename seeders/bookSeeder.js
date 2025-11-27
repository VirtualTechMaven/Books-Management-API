const Book = require("../models/Book");
const User = require("../Models/User");
const runSeeder = require("./seed");

const seedBooks = async () => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      console.log("No users found. Please run: npm run seed:users first");
      process.exit(1);
    }

    const ownerId = users[0]._id; 

    const booksData = [
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        year: 1999,
        genre: "Technology",
        owner: ownerId,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        year: 2018,
        genre: "Self Improvement",
        owner: ownerId,
      }
    ];

    await Book.deleteMany();
    console.log("Old books removed.");

    await Book.insertMany(booksData);
    console.log("New books inserted successfully.");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runSeeder(seedBooks);
