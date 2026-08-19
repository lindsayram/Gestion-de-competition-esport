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
        const { pseudo, email, password, memberTeam } = req.body
        
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

        if(memberTeam != null) {
            user.memberTeam = req.body.memberTeam
        }

        // Values modified
        const updatedProfile = await user.save()
        res.json(updatedProfile)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {profile, updateProfile}