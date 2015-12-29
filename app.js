
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , cors = require('cors')
  , mongoose = require('mongoose')
  , dataservice = require('./modules/contactdataservice'); 
var contacts = require('./modules/contacts');
var url = require('url');
var app = express();
app.use(cors());
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
mongoose.connect('mongodb://localhost:27017/contacts');
var contactSchema = new mongoose.Schema({
	primarycontactnumber: {type: String, index: {unique: true}},
	firstname: String,
	lastname: String,
	title: String,
	company: String,
	jobtitle: String,
	othercontactnumbers: [String],
	primaryemailaddress: String,
	emailaddresses: [String],
	groups: [String]
	});
var Contact = mongoose.model('Contact', contactSchema);
app.get('/contacts/:number', function (request, response) {
    console.log(request.url + ' : querying for ' +
        request.params.number);
    dataservice.findByNumber(Contact, request.params.number,
        response);
});
app.post('/contacts', function (request, response) {
    dataservice.update(Contact, request.body, response);
});
app.put('/contacts', function (request, response) {
    dataservice.create(Contact, request.body, response);
});
app.del('/contacts/:primarycontactnumber', function (request, response) {
    dataservice.remove(Contact,request.params.primarycontactnumber, response);
});
app.get('/api/contacts', function (request, response) {
    console.log('Listing all contacts with ' + request.params.key + '=' + request.params.value);
    dataservice.list(Contact, response);
});

/*app.get('/contacts',  cors(), function(request, response){
	var get_params = url.parse(request.url, true).query;
	if (Object.keys(get_params).length ==0) {
		response.setHeader('content-type', 'application/json');
		response.end(JSON.stringify(contacts.list()));	
	}
	else{
		response.setHeader('content-type', 'application/json');
		response.end(JSON.stringify(contacts.query_by_arg(get_params.arg,get_params.value)));	
	}
})
app.get('/contacts/:number',function(request, response){
	var get_params = url.parse(request.url, true).query;	
		response.setHeader('content-type', 'application/json');
		response.end(JSON.stringify(contacts.query(request.params.number)));	
})
app.get('/groups',function(request, response){
	var get_params = url.parse(request.url, true).query;	
		response.setHeader('content-type', 'application/json');
		response.end(JSON.stringify(contacts.list_groups()));	
})
app.get('/group/:name',function(request, response){
	var get_params = url.parse(request.url, true).query;	
		response.setHeader('content-type', 'application/json');
		response.end(JSON.stringify(contacts.get_members(request.params.name)));	
})*/
app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
