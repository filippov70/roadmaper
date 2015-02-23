var config = require("nconf");
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {

        if (username == "admin" && password == "admin") {
            return done(null, {
                username: "admin",
                photoUrl: "https://pp.vk.me/c7003/v7003079/374b/53lwetwOxD8.jpg",
                profileUrl: "http://vk.com/durov"
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