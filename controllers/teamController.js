// Importing packages and models
const Team = require('../models/teamModel')
const User = require('../models/userModel')

// Create a team US5
const createTeam = async (req, res) => {
    try {
        // destructuration datas body
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

        // Is he a player?  
        if(req.user.role != 'player'){
            return res.status(401).json({message: 'You have not authorization'})
        }

        // Already team member or a leader? (1 team)
        const alreadyInTeam = await Team.findOne({members: req.user._id})
        if(alreadyInTeam || req.user.role == 'leader'){
            return res.status(400).json({message: 'You have already a team'})
        }

        // Controls are passed, create a new team
        const team = await Team.create({
            name,
            members: req.user._id,
            leader: req.user._id,
        })

           // Update user: player to leader
        const updateRoleUser = await User.findByIdAndUpdate(
            req.user._id,
            {role: 'leader'},
            {new: true}
        )

        // Response
        res.status(201).json({
            message: 'New team created',
            team:{
                id: team._id,
                name: team.name,
                members: team.members,
                leader: team.leader
            },
            user:{
                id: updateRoleUser._id,
                role: updateRoleUser.role
            }})

    } catch (err) {
        res.status(500).json({message: 'Server error during create a new team', error: err.message})
    }
}

// Find and join a Team US6
const joinTeam = async (req, res) => {
    try {
        // Fiels empty?
        const nameTeam = req.body.name
        if(!nameTeam){
            return res.status(400).json({message: 'Please provide a team name'})
        }

        // Team exists?
        const team = await Team.findOne({name: nameTeam})
        if(team == null){
            return res.status(404).json({message:'Team not found'})
        }

        // user has already a team?
        const alreadyTeam = await Team.findOne({members: req.user._id})      
        if(alreadyTeam){
            return res.status(401).json({message: 'You have already a team'}) 
        }

        // All controles ares passed
        team.members.push(req.user._id)
        const newMember = await team.save()

        // Response
        res.json(newMember)

    } catch (err) {
        res.status(500).json({message: 'Server error during join a team', error: err.message})
    }
}

// Add a member in my team US7
const addMember = async (req, res) => {
    try {
        // Team exists?
        const team = await Team.findById(req.params.idTeam)
        if(team == null){
            return res.status(404).json({message:'Team not found'})
        }
        // Am I leader of this team?
        if(req.user._id.toString() != team.leader.toString()){
            return res.status(401).json({message:'You are not allowed to do that'})
        }

        // Datas recovery
        const email = req.body.email

        // fields are not empty
        if(!email){
            return res.status(400).json({message: 'Please provide an email'})
        }

        // user (email) exists?
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({message: 'Please provide an email valid'})
        }
        
        // user (email-->id) already member
        if(team.members.includes(existingUser._id)){
            return res.status(400).json({message: 'He is already a member'})
        }
       
        // All controles ares passed
        team.members.push(existingUser._id)
        const newMember = await team.save()

        // Response
        res.json(newMember)

    } catch (err) {
        res.status(500).json({message: 'Server error during add a member', error: err.message})
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
            return res.status(401).json({message:'You are not alllowed to do that'})
        }

        // datas recovery
        const email = req.body.email

        // field not empty
        if(!email){
            return res.status(400).json({message:'Please provide an email'})
        }

        // Email exists?
        const exisitingUser = await User.findOne({email})
        if(exisitingUser == null){
            return res.status(404).json({ message: "User not found"})
        }

        // User is a member?
        if(!team.members.includes(exisitingUser._id)){
            return res.status(400).json({message:'This user is not a member'})
        }
        
        // Si le membre == leader ne peut pas le supp
        if(exisitingUser._id.toString() == team.leader.toString()){
            return res.status(400).json({message:'This user is a leader you cannot do that'})
        }

        // Delete email in team.members
        // All controles are passed
        const deletedMember = await Team.updateMany({},
            {$pull: {members: exisitingUser._id}},
            { new: true }
        )
            
        res.json({
            message: "The member was delete",
            team: {
                members: deletedMember.members
            }
        })

    } catch (err) {
        res.status(500).json({message: 'Server error during delete a member', error: err.message})
    }

}
module.exports = {createTeam, joinTeam, addMember, deleteMembers}