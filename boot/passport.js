var conf = require('../conf');
var passport = require('passport');
var AuthLocalStrategy = require('passport-local').Strategy;

passport.use('local', new AuthLocalStrategy(
    function (username, password, done) {
        var users = conf.get("users");
        //console.log(users.length);
        for (var i=0; users.length; i++){
            //console.log(users[i]);
            if (username === users[i].name && 
                    password === users[i].pass) {
                return done(null, {
                    username: users[i].name
                });
            }
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