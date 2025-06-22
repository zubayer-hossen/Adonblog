const express = require('express');
const { registerAdmin, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerAdmin); // Only for initial admin creation
router.post('/login', loginUser);

module.exports = router;
