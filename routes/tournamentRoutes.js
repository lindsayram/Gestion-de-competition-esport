// Importing packages, functions
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const {createTournament, updateTournament, deleteTournament, addParticipants, getAllTournaments, getMembers, quantityParticipants, getTournamentsRegistered} = require('../controllers/tournamentController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTournament )                                 //US8
router.put('/:idTournament', authMiddleware, updateTournament )                     //US9
router.delete('/:idTournament', authMiddleware, deleteTournament )                  //US10
router.patch('/:idTournament', authMiddleware, addParticipants )                    //US11
router.get('/', authMiddleware, getAllTournaments)                                  //US12
router.get('/statistics', authMiddleware, quantityParticipants)                     //US16
router.get('/participation/:idTournament', authMiddleware, getMembers)              //US13
router.get('/:idTeam', authMiddleware, getTournamentsRegistered)                    //US18

module.exports = router