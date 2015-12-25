var http = require('http');
var port = 8181;
function handle_request(req, res){
	res.write(
		200,
		{'Content-Type': 'text-plain'}
	);
	res.end('Restful ready');
	console.log('requested');
}
http.createServer(handle_request).listen(port,'127.0.0.1');
console.log('Server started at 127.0.0.1 port' + port);