// Importing packages, functions
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createTeam, joinTeam, addMember, deleteMembers, deleteTeam, getTeams } = require('../controllers/teamController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTeam)                    //US5
router.put('/', authMiddleware, joinTeam)                       //US6
router.put('/invite/:idTeam', authMiddleware, addMember)        //US7
router.put('/delete/:idTeam', authMiddleware, deleteMembers)    //US7
router.delete('/:idTeam', authMiddleware, deleteTeam)           //US14
router.get('/', authMiddleware, getTeams)                       //US17

module.exports = router