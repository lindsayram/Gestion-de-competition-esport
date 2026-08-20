// Importing packages, functions
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {createTournament, updateTournament} = require('../controllers/tournamentController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTournament )     //US8
router.put('/:idTournament', authMiddleware, updateTournament )     //US9

module.exports = router