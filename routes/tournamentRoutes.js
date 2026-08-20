// Importing packages, functions
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {createTournament, updateTournament, deleteTournament, addParticipants} = require('../controllers/tournamentController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTournament )                 //US8
router.put('/:idTournament', authMiddleware, updateTournament )     //US9
router.delete('/:idTournament', authMiddleware, deleteTournament )  //US10
router.patch('/:idTournament', authMiddleware, addParticipants )    //US11

module.exports = router