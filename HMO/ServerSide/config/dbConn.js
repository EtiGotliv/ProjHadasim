 const mongoose = require('mongoose')

 // Function to connect to the database
 const connectDB = async () =>{
    try {
        // Attempting to connect to the MongoDB database using the provided URI
        await mongoose.connect(process.env.DATABASE_URI)
    } catch(err){
        // Logging any errors that occur during the connection attempt
        console.log(err)
    }
 }

// Exporting the connectDB function
 module.exports = connectDB