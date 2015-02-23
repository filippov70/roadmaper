var passport = require('passport');

module.exports = function (app) {

    app.get('/', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('index.ejs', {
                user: req.user
            });
            return;
        }     
           
        res.redirect('/auth');
    });     

    app.get('/map2', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('map.ejs');
            return;
        }     
           
        res.redirect('/auth');
    });    

    app.get('/map1', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('map.ejs');
            return;
        }     
           
        res.redirect('/auth');
    });

    app.get('/auth', function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }

        res.render('auth', {
            error: req.flash('error')
        });
    });

    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/auth', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true })
    );

}