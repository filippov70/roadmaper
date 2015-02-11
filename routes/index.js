
/*
 * GET home page.
 */

exports.index = function(req, res){
	if (req.url === '/'){
		res.send();
		
	}
	else{
		res.send(500);
	}
};