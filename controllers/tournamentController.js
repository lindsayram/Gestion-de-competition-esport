// Importing packages and models
const Tournament = require('../models/tournamentModel')
const Team = require('../models/teamModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// Create a tournament US8
const createTournament  = async (req, res) => {
    try {
        // Datas recovery
        const {name, game, date, rules} = req.body

        // Fields not empty
        if(!name || !game || !date || !rules){
            return res.status(400).json({message:'Please provide a name, a game, a date and rules'})
        }

        // Tournament name already exists?
        const existingName = await Tournament.findOne({name})
        if(existingName){
            return res.status(400).json({message:'This name already exists'})
        }

        // Am I an organizer?
        if(req.user.role != 'organizer'){
            return res.status(401).json({message:'You are not allowed'})
        }

        // Controls checked
        const tournament = await Tournament.create({
            name,
            game,
            date,
            rules,
            organizer : req.user._id
        })

        // Response
        res.status(201).json({
            message: "Your tournament are registered",
            tournament: {
                id: tournament._id,
                name: tournament.name,
                game: tournament.game,
                date: tournament.date,
                rules: tournament.rules,
                organizer: tournament.organizer
            }
        })

    } catch (err) {
        res.status(500).json({message: 'Server error during create a new tournament', error: err.message})
    }
}

// Update a tournament US9
const updateTournament = async (req, res) => {
    try {
        // Tournament exists?
        const tournament = await Tournament.findById(req.params.idTournament)
        if(tournament == null){
            return res.status(404).json({message:'Tournament not found'})
        }

        // Am I an organizer?
        if(req.user.role != 'organizer'){
            return res.status(401).json({message:'You are not allowed'})
        }

        // Datas recovery
        // Tournament name already exists?
        const nameTournament = req.body.name
        const existingName = await Tournament.findOne({nameTournament})
        if(req.body.name != null && !existingName){
            tournament.name = req.body.name
        }

        if(req.body.game != null){
            tournament.game = req.body.game
        }

        if(req.body.date != null){
            tournament.date = req.body.date
        }

        if(req.body.rules != null){
            tournament.rules = req.body.rules
        }

        // controls checked
        const updatedTournament = await tournament.save()
        res.json(updatedTournament)

    } catch (err) {
        res.status(500).json({message: 'Server error during update tournament', error: err.message})
    }
}

// Delete a tournament US10
const deleteTournament = async (req, res) => {
    try {
        // Tournament exists?
        const tournament = await Tournament.findById(req.params.idTournament)
        if(tournament == null){
            return res.status(404).json({message: 'Tournament not found'})
        }

        //Am I the organizer or an admin 
        if(req.user.role != "admin" && tournament.organizer.toString() != req.user._id.toString()){
            return res.status(401).json({message: 'You are not allowed'})
        }

        // Controls are checked
        await tournament.deleteOne()

        // Response
        res.json({message:'The tournament are deleted'})

    } catch (err) {
        res.status(500).json({message: 'Server error during delete a tournament', error: err.message})
    }
}

// Add his team to a tournament US11
const addParticipants =async (req, res) => {
    try {
        // tournament exists?
        const tournament = await Tournament.findById(req.params.idTournament)
        if(tournament == null){
            return res.status(404).json({message: 'Tournament not found'})
        }

        // datas recovery
        const name = req.body.name

        // fields not empty
        if(name == null){
            return res.status(400).json({message: 'Please provide a name'})
        }
        
        // Team exists?
        const exisitingTeam = await Team.findOne({name})
        if(exisitingTeam == null){
            return res.status(404).json({ message: "Team not found"})
        }

        // This team is mine?
        if(!exisitingTeam.members.includes(req.user._id) && exisitingTeam.leader.toString() != req.user._id.toString()){
            return res.status(401).json({message:'This team is not yours'})
        }

        // team already in participants
        if(tournament.participants.includes(exisitingTeam._id)){
            return res.status(400).json({message:'Your team already participates'})
        }

        // Controls checked
        tournament.participants.push(exisitingTeam._id)
        const addedParticipant = await tournament.save()

        // Response
        res.json(addedParticipant)

    } catch (err) {
        res.status(500).json({message: 'Server error during add a team on this tournament', error: err.message})
    }
}

// Display tournaments US12
const getAllTournaments = async (req, res) => {
    try {
        // Found all tournaments
        const tournament = await Tournament.find()
            // .select( 'name game date -_id')
        // Response
        res.json(tournament)

    } catch (err) {
        res.status(500).json({message: 'Server error during get tournaments', error: err.message})
    }
}

// Display members of this tournament US13
const getMembers = async (req, res) =>{
    try {
        // tournament exists?
        const tournament = await Tournament.findById(req.params.idTournament).populate('participants', 'name')

        if(tournament == null){
            return res.status(404).json({message: 'Tournament not found'})
        }

        // Am i organizer
        if(tournament.organizer.toString() != req.user._id.toString()){
            return res.status(401).json({message:'You are not the organizer'})
        }

        // Controls checked
        // Response
        res.status(200).json({
            tournament: {
                name: tournament.name,
                participants: tournament.participants,
            }
        })        

    } catch (err) {
        res.status(500).json({message: 'Server error during get participants on this tournament', error: err.message})
    }
}

// Display number of participants  US15
const quantityParticipants = async (req, res) => {
    try {

        // Am i an admin
        const amAdmin = await User.findById(req.user._id)
        if(amAdmin.role != 'admin'){
            return res.status(401).json({message:'You are not authorized'})
        }

        // Controls checked
        const stats = await Tournament.aggregate([
          { 
            $project: {
            name: "$name",
            quantity: { $size: "$participants" }}
          }
        ])
        
        res.status(200).json(stats)

    } catch (err) {
        res.status(500).json({message: 'Server error during get participants quantity on this tournament', error: err.message})
    }
}

// Display tournaments when my team is registered US18
const getTournamentsRegistered = async (req, res) => {
    try {
        // // Team exists?
        const existingTeam = await Team.findById(req.params.idTeam)
        if(existingTeam == null){
            return res.status(404).json({message:'Team not found'})
        }

        // // Am I a member?
        if(!existingTeam.members.includes(req.user._id)){
            return res.status(400).json({message:'This is not your team'})
        }

        // Convert string to object
        const idTeam= new mongoose.Types.ObjectId(req.params.idTeam)

        // Filter tournaments
        const tournament = await Tournament.find({participants: idTeam})
        
        // Response
        res.status(200).json(tournament)

    } catch (err) {
        res.status(500).json({message: 'Server error during get tournaments', error: err.message})
    }
}

module.exports = {createTournament, updateTournament, deleteTournament, addParticipants, getAllTournaments, getMembers, quantityParticipants, getTournamentsRegistered}