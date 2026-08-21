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
            ref: 'User'
        },
        leader:{
            type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'User',
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Team', teamSchema)