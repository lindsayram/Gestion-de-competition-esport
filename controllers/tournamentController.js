// Importing packages and models
const Tournament = require('../models/tournamentModel')
// const User = require('../models/userModel')

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
        const existingName = await Tournament.findOne({name})
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
module.exports = {createTournament, updateTournament}