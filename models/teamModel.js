// Importing packages
const mongoose = require('mongoose')

// Creation team model
const teamSchema = new mongoose.Schema (
    {
        name:{
            type:String,
            required:[true, 'Name is required'],
            unique: true,
        },
        members:{
            type: Array,
            default: [],
            ref: 'User'
        },
        leader:{
            type:  mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Team', teamSchema)