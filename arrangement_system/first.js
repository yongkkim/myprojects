var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var io = require('socket.io');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname));
app.use(express.static(__dirname + "/images"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use('/javascripts', express.static(__dirname + '/views'));
app.use('/stylesheets', express.static(__dirname + '/views'));
app.get('/', function(req, res){res.sendFile(__dirname + "/" + "main.html");})

/*function getPost(request, response, db) {
	var qs = require('querystring');
		var body = '';

		request.on('data', function (data) {
			body += data;

			if (body.length > 1e6)
			request.connection.destroy();
		});

		request.on('end', function () {
		var post = qs.parse(body);
		// use post['blah'], etc.
		var accountinfo = { lolusername: post['lolusername'], username: post['username'], email: post['email'], password: post['pw']}
			db.collection("customers").insertOne(accountinfo, function(err, res) {
				if (err) throw err;
				db.close();
			});
		});
}
// This responds a POST request for the homepage
app.post('/post', function (req, res) {
	console.log("Got a POST request for the homepage");
	var word;
	
	MongoClient.connect("mongodb://localhost:27017/namedb", function (err, db) {
		if(err) throw err;
		getPost(req, res, db);

	});
})*/

	var server = http.createServer(app).listen(8080);
	io = io.listen(server);

	io.sockets.on('connection', function (socket) {
		
		var toClient = {data:"connection established"}
		//socket.send(JSON.stringify(toClient));
		/*MongoClient.connect("mongodb://localhost:27017/loldb", function (err, db) {
		   if(err) throw err;
			 db.collection("account").findOne({}, function(err, result) {
				if (err) throw err;
				toClient = {data: result.password}
				socket.send(JSON.stringify(toClient));
				db.close();
			  });
		});*/
	});

	app.get('/signin', function(req, res){
		var toClient = {data:"You are on signin.html"}
		io.sockets.send(JSON.stringify(toClient));
		res.sendFile(__dirname + "/" + "signin.html");
		})

	app.post('/signin', function(req, res){
		var matched = false;
		var dbemail;
		MongoClient.connect("mongodb://localhost:27017/loldb", function (err, db) {
		   if(err) throw err;
			 db.collection("account").findOne({}, function(err, result) {
				if (err) throw err;
				
				console.log(req.body.pw);
				bcrypt.compare(req.body.pw, result.password, function(err, resp) {
				if(resp)
					res.render("main.html");
				else
					res.render("signin.html");			
				db.close();
			  });	  
			});
		})
	})
		
	app.get('/signup', function(req, res){
		var toClient = {data:"You are on signup.html"}
		io.sockets.send(JSON.stringify(toClient));
		res.sendFile(__dirname + "/" + "signup.html");
		})
		

