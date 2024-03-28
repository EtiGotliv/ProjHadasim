const mongoose = require('mongoose')

const vaccinSchema = new mongoose.Schema({
    identityMember:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Member'
    },
    positiveResultDate: {
        type: Date,
        required: true
    },
    recoveryDate: {
        type: Date,
        required: true
    }
  
})

module.exports = mongoose.model('Vaccin', vaccinSchema)