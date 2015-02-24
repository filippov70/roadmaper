var passport = require('passport');

module.exports = function (app) {  

    /*роут на map2*/
    app.get('/map2', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('maps/map2.ejs');
            return;
        }     
           
        res.redirect('/auth');
    });    

    /*роут на map1*/
    app.get('/map1', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('maps/map1.ejs');
            return;
        }     
           
        res.redirect('/auth');
    });

    /*роут на auth*/
    app.get('/auth', function (req, res) {

        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }

        res.render('auth', {
            error: req.flash('error')
        });
    });

    /*роут на главную страницу*/
    app.get('/', function (req, res) {

        if (req.isAuthenticated()) {
            res.render('index.ejs', {
                user: req.user
            });
            return;
        }     
           
        res.redirect('/auth');
    });     

    /*роут на logout*/
    app.get('/sign-out', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /*авторизация*/
    app.post('/auth', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth',
        failureFlash: true })
    );

}