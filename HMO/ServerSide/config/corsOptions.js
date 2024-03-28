const allowedOrigins = require('./allowedOrigins')

// CORS options configuration
const corsOptions = {
    // origin function determines if the origin is allowed
    origin: (origin, callback) =>{
        // Checking if the origin is in the allowed list or if it's null
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            // If allowed, callback with null
            callback(null, true)
        } else {
            // If not allowed, callback with an error
            callback(new Error('Not allowed by CORS'))
        }
    },
    // Allowing credentials to be shared
    credential: true,
    // Setting the success status for OPTIONS requests
    optionsSuccessStatus: 200
}

// Exporting the CORS options
module.exports = corsOptions