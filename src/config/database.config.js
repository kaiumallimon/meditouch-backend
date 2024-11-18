// import mongoose
const mongoose = require('mongoose');

// configure dotenv
require('dotenv').config();

// get the database URL from the environment
const databaseURL = process.env.DB_URL;


//connect to the database

const connectDB = async()=>{
    try{
        await mongoose.connect(databaseURL)

        console.log("Mongodb connected successfully")
    }catch(error){
        console.log("Mongodb connection failed: "+error)
        process.exit(1);
    }
}


// export the connection
module.exports = connectDB


