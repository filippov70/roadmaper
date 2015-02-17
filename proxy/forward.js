var request = require('request')

/*Default*/
/*module.exports = function(pattern, host){
  return function(req, res, next){
    if(req.url.match(pattern)){
      var db_path = req.url.match(pattern)[1]
        , db_url = [host, db_path].join('/');
      req.pipe(request[req.method.toLowerCase()](db_url)).pipe(res);
    }else{
      next();
    }
  }
}*/

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