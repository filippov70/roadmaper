var passport = require('passport');

module.exports = function (app) {  
    
    /*роут на map3*/
    app.get('/map3', function (req, res) {
        if (req.isAuthenticated()) {
            if (req.path === '/'+req.user.username){
                res.render('maps/'+req.user.username+'.ejs');
                return;
            }
        }     
           
        res.redirect('/auth');
    });
    
    /*роут на map2*/
    app.get('/map2', function (req, res) {
        if (req.isAuthenticated()) {
            if (req.path === '/'+req.user.username){
                res.render('maps/'+req.user.username+'.ejs');
                return;
            }
        }       
           
        res.redirect('/auth');
    });    

    /*роут на map1*/
    app.get('/map1', function (req, res) {
        if (req.isAuthenticated()) {
            if (req.path === '/'+req.user.username){
                res.render('maps/'+req.user.username+'.ejs');
                return;
            }
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

    /* Обработка POST-данных авторизации */
    app.post('/auth', 
        passport.authenticate('local', 
            {
                successRedirect: '/',
                failureRedirect: '/auth',
                failureFlash: true 
            }
                    )
    );

};