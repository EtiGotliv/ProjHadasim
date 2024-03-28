const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)


const vaccinSchema = new mongoose.Schema({
    identityMember:{
        type: String,
        required: true,
        ref:'Member'
    },
    vaccineDate: {
        type: Date,
        required: true
    },
    manuFacturer: {
        type: String,
        required: true
    }
})


// Apply the AutoIncrement plugin to generate sequential IDs for vaccine documents
vaccinSchema.plugin(AutoIncrement, {
    inc_field: 'vaccineId',
    start_seq: 1
});


module.exports = mongoose.model('Vaccin', vaccinSchema)