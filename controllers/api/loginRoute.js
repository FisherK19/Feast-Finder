// Import necessary modules and dependencies
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// Create an instance of the router
const router = express.Router();

// Define the login route
router.post('/login', async (req, res) => {
    // Extract username and password from request body
    const { email, password } = req.body;

    try {
        // Find the user in the database by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });

        // Send token back to client
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
