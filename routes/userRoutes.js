// Importing packages, functions
const express = require('express')
const router = express.Router()
const { updateProfile, profile, updateRole } =require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// Roads network
router.get('/profile', authMiddleware, profile)
router.put('/profile', authMiddleware, updateProfile)
router.patch('/profile/:idUser', authMiddleware, updateRole)

module.exports = router