// imports
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // find the user
            const user = await User.findOne({ email })

            // check if the user exists

            if (!user) {
                return done(null, false, { message: 'No account has been found associated with this email' })
            }

            // check if the password is correct

            const isMatch = await user.matchPassword(password)

            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' })
            }

            // return the user if the password is correct
            return done(null, user)


        } catch (error) {
            done(error)
        }
    }))


// serialize the user to store in the session

passport.serializeUser((user, done) => {
    done(null, user.id)
})


// deserialize the user to get the user from the session    

passport.deserializeUser((id, done) => {
    try {
        const user = User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

// export the passport
module.exports = passport;