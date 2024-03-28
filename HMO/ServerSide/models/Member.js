const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    memberName:{
        memberFirstName:{
            type: String,
            required: true
        },
        memberLastName:{
            type: String,
            required: true
        }
    },
    identityMember:{
        type: String,
        required: true,
        ref: 'Vaccin',
    },
    adress:[{
        city:{
            type: String,
            required: true
        },
        street:{
            type: String,
            required: true
        },
        numberOfStreet:{
            type: String,
            required: true
        }
    }], 
    dateOfBirth:{
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    numVaccin: {
        type: Number,
        required: true,
        default: 0
    }
  
})

// Custom validation to ensure at least one phone number is provided
memberSchema.path('telephone').validate(function(value) {
    return value || this.mobilePhone;
}, 'At least one of Telephone or Mobile Phone is required');

module.exports = mongoose.model('Member', memberSchema)