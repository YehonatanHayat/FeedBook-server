const User = require('../models/users');

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password, dob, gender, photo } = req.body;

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password,
      dob,
      gender,
      photo
    });

    // Save the user to the database
    await newUser.save();
    console.log('user created');
    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    // Send error response
    res.status(500).json({ error: 'Internal server error' });
  }
};
