var conf = require('../conf');
var express = require('express');
var passport = require('passport');
var path = require('path');
var flash = require('connect-flash');
var gfproxy = require('./gfproxy');

module.exports = function (app) {

    app.set('port', conf.get("app:port") || 3000);
    app.set('views', path.join(__dirname + "/..", 'views'));
    app.set('view engine', 'jade');

    var sessionOptions = conf.get("session");
    if ('production' == app.get('env')) {
        var MemcachedStore = require('connect-memcached')(express);
        sessionOptions.store = new MemcachedStore(conf.get("memcached"));
    }

    /*proxy for getFeatureInfo*/
    app.use(gfproxy(/\/gf\/(.*)/, ''));

    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname + "/..", 'public')));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session(sessionOptions));
    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(app.router);

    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }
};
