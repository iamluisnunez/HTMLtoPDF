// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Initialize Express
const app = express();
const port = 3000;

// Set up MongoDB connection
mongoose.connect("mongodb://localhost/user-signup-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", UserSchema);

// Middleware to parse JSON data
app.use(express.json());

// Route to handle user signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
