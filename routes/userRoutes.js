// Importing packages, functions
const express = require('express')
const router = express.Router()
const { updateProfile, profile } =require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Roads network
router.get('/profile', authMiddleware, profile)
router.put('/profile', authMiddleware, updateProfile)

module.exports = router