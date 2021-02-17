// JavaScript source code
const fs = require('fs');
const http = require('http');
const _ = require('lodash');
const server = http.createServer(function(req,res){

	console.log('request made',req.url,req.method);
	res.setHeader('content-type','text/html');
	let path = './views/';
	switch(req.url) {
		case '/':
		  path+= 'index.html';
		  status = 200;
		  break;
		case '/about':
		  path+= 'about.html';
		  status = 200;
		  break;
		case '/about-me':
		  res.statusCode = 301;
		  res.setHeader('Location','/about');
		  res.end();
		  break;
		 default:
		   path += '404.html';
		   status = 404;
		   break;
	}

	fs.readFile(path,function(err,data){
		if (err){
			console.log(err);
			res.end();
		} else {
			res.statusCode = status;
			res.write(data);
			res.end();
		}
		res.end();

	});
	
	
});
server.listen(3000,'127.0.0.1',function(){
	console.log('listening on port 3000');
});


//type this at shell to stop npx kill-port 3000



