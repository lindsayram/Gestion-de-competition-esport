// Importing packages and models
const Team = require('../models/teamModel')
const User = require('../models/userModel')

// Create a team US5
const createTeam = async (req, res) => {
    try {
        // destructuration des données body
        const {name} = req.body

        // Fields are empty
        if(name == null) {
            return res.status(400).json({message: 'Please provide a name'})
        }

        // Team already exists?
        const existingTeam = await Team.findOne({name})
        if(existingTeam){
            return res.status(400).json({message: 'This team already exists'})
        }

        // Is he already a member ou leader?  
        // const user = await User.findById(req.user._id)      
        // if(user.memberTeam != null || user.role == 'leader'){
        //     return res.status(401).json({message: 'You have already a team'}) 
        // }
        // const haveTeam = await Team.find(req.user._id)
        // if(haveTeam) {
        //     return res.status(400).json({message: 'You have already a team'}) //verif code erreur
        // }

        // Controls are passed, create a new team
        const team = await Team.create({
            name,
            members: req.user._id,
            leader: req.user._id,
        })

        // Response
        res.status(201).json({
            message: 'New team created',
            team:{
                id: team._id,
                name: team.name,
                members: team.members,
                leader: team.leader
            }})

    } catch (err) {
        res.status(500).json({message: 'Server error during create a new team', error: err.message})
    }
}

// Find and join a Team US6
const joinTeam = async (req, res) => {
    try {
        // Team exists?
        const team = await Team.findById(req.params.idTeam)
        if(team == null){
            return res.status(400).json({message:'This team does not exist'})
        }

        // Fiels empty?
        const email = req.body.email
        if(!email){
            return res.status(400).json({message: 'Please provide your email'})
        }

        // user has already a team?
        // const user = await User.findById(req.user._id)      
        // if(user.memberTeam != null || user.role == 'leader'){
        //     return res.status(401).json({message: 'You have already a team'}) 
        // }

        // Email lié à l'id
        const idMember = await User.findOne({email})
        if(idMember == null){
            return res.status(404).json({message: 'User not found'})
        }

        // Suis-je déjà dans cette équipe?
        if(team.members.includes(idMember._id)){
            return res.status(400).json({ message: 'This member already exists'})
        }

        // Suis-je leader de cette équipe?
        if(team.leaders == idMember._id){
            return res.status(400).json({ message: 'You are already this team leader'})
        }

        // All controles ares passed
        team.members.push(idMember._id)
        const newMember = await team.save()

        // Response
        res.json(newMember)

    } catch (err) {
        res.status(500).json({message: 'Server error during create a new team', error: err.message})
    }
}

// Delete a member in my team US7
const deleteMembers = async (req, res) => {
    
    try {
    // Team exists?
    const team = await Team.findById(req.params.idTeam)
    if (team == null){
        return res.status(404).json({message:'This team does not exist'})
    }

    // I am leader of this team
    if(req.user._id != team.leader.toString()){
        return res.status(401).json({message:'You are not permissived to do that'})
    }

    // datas recovery
    const email = req.body.email

    // field not empty
    if(!email){
        return res.status(400).json({message:'Please provide an email'})
    }

    // Email corresponding to id
    const exisitingUser = await User.findOne({email})
    if(exisitingUser == null){
        return res.status(404).json({ message: "User not found"})
    }

    // Delete email in team.members

    // All controles are passed
    await team.members.deleteOne({email})
        res.json({message: "The member was delete"})

    // Response

    } catch (err) {
        res.status(500).json({message: 'Server error during create a new team', error: err.message})
    }

}
module.exports = {createTeam, joinTeam, deleteMembers}