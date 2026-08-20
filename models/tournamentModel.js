// Importing packages
const mongoose = require('mongoose')

// Creation tournament schema
const tournamentSchema = new mongoose.Schema (
    {
        name:{
            type: String,
            required:[true, 'Name is required'],
            unique: true,
        },
        game:{
            type: String,
            required:[true, 'Game is required']
        },
        date:{
            type: Date,
            required:[true, 'Date is required']
        },
        rules:{
            type: String,
            required:[true, 'Rules are required']
        },
        organizer:{
            type: mongoose.Schema.ObjectId,
            required: true,
        },
        participants:{
            type: Array,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Tournament', tournamentSchema)