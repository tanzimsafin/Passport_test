const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { userModel } = require('../db');
function userMiddleware() {
    passport.use(new LocalStrategy(async function(username, password, done) {
        try {
            const user = await userModel.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.verifyPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }); 
}
module.exports = {
    userMiddleware
};




