/**
 * Get images http://localhost:3000/image?getimg=coala.jpg
 */
module.exports = function (app) {
	
	var filesys = require('fs');
	
	app.get('/image', function (req, res, next) {
		var filename = './image-store/' + req.query.getimg;
		filesys.readFile(filename, function(err, data) {
			if(err) {
				res.send(404);
			}
			res.writeHead(200, {'content-type':'image'});
			res.write(data);
			res.end();
		});
		
	});
};