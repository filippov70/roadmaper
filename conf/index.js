/**
 * New node file
 */

var conf = require('nconf');
var path = require('path');

conf.argv().env().file({file: path.join(__dirname, 'config.json') });
module.exports = conf;