var conf = require('../conf');
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {

        if (username == conf.get("user:name") && password == conf.get("user:pass")) {
            return done(null, {
                username: conf.get("user:name")
            });
        }

        return done(null, false, {
            message: 'Неверный логин или пароль'
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});

module.exports = function (app) {
};