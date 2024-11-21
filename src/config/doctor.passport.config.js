// imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models/doctor.model');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // find the doctor by email
            const doctor = await Doctor.findOne({ email })

            // check if the doctor exists

            if (!doctor) {
                return done(null, false, { message: 'No account has been found associated with this email' })
            }

            // check if the password is correct

            const isMatch = await doctor.matchPassword(password)

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' })
            }

            // return the doctor if the password is correct
            return done(null, doctor)


        } catch (error) {
            done(error)
        }
    }))


// serialize the doctor to store in the session

passport.serializeUser((doctor, done) => {
    done(null, doctor.id)
})


// deserialize the doctor to get the user from the session    

passport.deserializeUser((id, done) => {
    try {
        const doctor = Doctor.findById(id)
        done(null, doctor)
    } catch (error) {
        done(error)
    }
})

// export the passport
module.exports = passport;