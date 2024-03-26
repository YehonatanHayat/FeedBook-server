// routes/profile.js

const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Assuming you have middleware for token verification
const userService = require('../services/userService');

router.get('/:userId', verifyToken, async (req, res) => {
  try {
    // Verify the token and get the userId
    const userId = req.user.id; // Assuming you have middleware that attaches the user object to the request

    // Retrieve the profile data for the requested userId
    const profile = await userService.getProfile(userId);

    // Check if the requested profile belongs to the same user
    if (profile.userId !== req.params.userId) {
      return res.status(403).json({ error: "You don't have permission to view this profile." });
    }

    // If everything is fine, send the profile data
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
