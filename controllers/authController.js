// Importing packages and models
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')

// Token expiration
const JWT_SECRET =process.env.JWT_SECRET
const JWT_EXPIRES_IN = '30d'

// Generate token
const generateToken = (id) =>{
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

// User registration US1
const register = async (req, res) => {
    try {
        const {pseudo, email, password, role} = req.body

        // Fields don't have to be empty
        if(!pseudo || !email || !password){
            return res.status(400).json({message: 'Pleaase provide pseudo, email and password'})
        }

        // Elements required for password
        const isPasswordOk = validator.isStrongPassword
        (password, {
            minLength: 6,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1,
        })

        if(!isPasswordOk) {
            return res.status(400).json({message:'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 characters long'})
        }

        // Email must to be valid
        const isEmailOk = validator.isEmail(email)
        if(!isEmailOk) {
            return res.status(400).json({message: "Email invalid"})
        }

        // Email already exists?
        const existingEmail = await User.findOne ({email})
        if(existingEmail) {
            return res.status(400).json({message: "Email invalid"})
        }

        // Values allocation
        const user = await User.create({
            pseudo,
            email,
            password,
            role: role || 'player'
        })

        // Generate a new token
        const token = generateToken(user._id)

        // Response 
        res.status(201).json({
            message: "You are registered",
            token,
            user: {
                pseudo: user.pseudo,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message})
    }
}

// User login US2
const login = async (req, res) => {
    try {
       const { email, password } = req.body
       
       if(!email || !password){
            return res.status(400).json({ message: 'Please provide email and password'})
       }

       //Find user and explicitly select password field
       const user = await User.findOne({ email }).select('+password')

       if(!user){
            return res.status(401).json({ message: 'Invalid credentials'})
       }

       //Check password match
       const isMatch = await user.comparePassword(password)
       if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'})
       }

       const token = generateToken(user._id)

        res.status(200).json({
            message: 'Login successful',
            token, 
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err) {
        res.status(500).json({message: 'Server error during login', error: err.message})
    }
}

module.exports = {register, login}