// Importing packages
const User = require('../models/userModel')

const profile = async (req, res) => {
    try {
        res.status(200).json({ user: req.user })
    } catch (err) {
        res.status(500).json({ message: 'Servor error fetching user profile', error: err.message})
    }
}

// Update user profile US3
const updateProfile = async (req, res) => {
    try {
        // User exists?
        const user = await User.findById(req.user._id)
        if(user == null) {
            return res.status(404).json({message:'User not found'})
        }

        // Datas recovery
        const { pseudo, email, password, role } = req.body
        
        // Values allocation
        if(pseudo != null){
            user.pseudo= req.body.pseudo
        }

        if(email != null){
            user.email= req.body.email
        }

        if(password != null){
            user.password= req.body.password
        }

        if(role != null){
            return res.status(401).json({message: 'You are not authorized'})
        }
        // Values modified
        const updatedProfile = await user.save()
        res.json(updatedProfile)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

// Update roles US16
const updateRole  = async (req, res) => {
    try {
        // user exists?
        const existingUser = await User.findById(req.params.idUser)
        if(existingUser == null){
            return res.status(404).json({message: 'User not found'})
        }

        // datas recovery
        const roleUser = req.body.role

        // fields not empty
        if(!roleUser){
            return res.status(400).json({message:'Please provide a role'})
        }

        // Am I an admin
        if(req.user.role != 'admin'){
            return res.status(401).json({message: 'You are not authorized'})
        }

        // role already exists?
        if(roleUser == existingUser.role){
            return res.status(400).json({message: 'This role already exists'})
        }

        // Value allocation
        if(roleUser != null){
            existingUser.role = roleUser
        }

        // Values modified
        const updatedRole = await existingUser.save()
        res.json(updatedRole)

    } catch (err) {
        return res.status(500).json({message: 'Servor error during update a role', error: err.message})
    }
}
module.exports = {profile, updateProfile, updateRole}