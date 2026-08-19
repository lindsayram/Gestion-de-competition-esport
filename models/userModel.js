// Importing packages
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Creation User schema
const userSchema = new mongoose.Schema (
    {
        pseudo:{
            type: String,
            required: [true, 'Pseudo is required'],
            trim: true,
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password:{
            type:String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false,
        },
        role:{
            type: String,
            enum: ['player', 'admin', 'organizer'],
            default: 'player'
        },
        memberTeam:{
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

// Hash password
userSchema.pre('save', async function (){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Password verified
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)