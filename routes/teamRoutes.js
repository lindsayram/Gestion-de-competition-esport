const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { createTeam, joinTeam, addMember,deleteMembers } = require('../controllers/teamController')
const router = express.Router()

// Roads network
router.post('/', authMiddleware, createTeam)                    //US5
router.put('/', authMiddleware, joinTeam)                       //US6
router.put('/invite/:idTeam', authMiddleware, addMember)        //US7
router.put('/delete/:idTeam', authMiddleware, deleteMembers)    //US7

module.exports = router