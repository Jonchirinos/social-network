const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    // Drop existing tables/collections
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Add Thoughts to the collection and await the results
    await Thought.collection.insertMany(thoughts);

    // Add Users to the collection and await the results
    await User.collection.insertMany(users);

    // Log out the seed data to indicate what should appear in the database
    console.table(thoughts);
    console.table(users);
    console.info("Seeding complete! 🌱");
    process.exit(0);
});
