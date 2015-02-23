var request = require('request')

module.exports = function(pattern, host){
  return function(req, res, next){
    if(req.url.match(pattern)){
      var gf_path = req.url.match(pattern)[1];
      req.pipe(request[req.method.toLowerCase()](gf_path)).pipe(res);
    }else{
      next();
    }
  }
}