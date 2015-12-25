function handle_GET_request(res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain',
	});
	res.end('Get action was requested');

}
function handle_POST_request(res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain',
	});
	res.end('Post action was requested');

}
function handle_PUT_request(res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain',
	});
	res.end('Put action was requested');

}
function handle_HEAD_request(res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain',
	});
	res.end('Head action was requested');

}
function handle_DELETE_request(res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain',
	});
	res.end('Delete action was requested');

}
function handle_bad_request(res) {
	res.writeHead(400, {
		'Content-Type' : 'text/plain',
	});
	res.end('Bad request');

}
function handle_request(req, res) {
	switch (req.method) {
	case 'GET':
		handle_GET_request(res);
		break;
	case 'POST':
		handle_POST_request(res);
		break;
	case 'PUT':
		handle_PUT_request(res);
		break;
	case 'DELETE':
		handle_DELETE_request(res);
		break;
	case 'HEAD':
		handle_HEAD_request(res);
		break;
	default:
		handle_bad_request(response);
		break;
	}
	console.log('Request processing ended');
}
