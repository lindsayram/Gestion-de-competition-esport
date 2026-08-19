const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createTeam, joinTeam, deleteMembers } = require('../controllers/teamController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTeam)
router.put('/:idTeam', authMiddleware, joinTeam)
router.delete('/:idTeam', authMiddleware, deleteMembers)

module.exports = router