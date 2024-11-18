const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create the user schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    dob:{
        type: Date,
        required: true
    },
})


// hash the password before saving

userSchema.pre('save',async (next)=>{
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

// export the model
module.exports = mongoose.model('User',userSchema)