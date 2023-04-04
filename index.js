var porta = process.env.PORT || 5000;

const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');

let resultados

const connection = mysql.createConnection({
	host     : 'db4free.net',
	port     : 3306,
	user     : 'joaopaulo',
	password : 'qwerty123',
	database : 'jpdatabase'
});


const app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.static(__dirname +'/public'));

app.set('view engine', 'ejs');


app.get('/', function(request, response) {
	response.redirect('/login')
});

app.get('/login', function(request, response) {
	if (request.session.loggedin == true) {
		response.redirect('/home')
	} else {
		response.render(__dirname + "/public/login.ejs",{visi:"invisible",alert:""});
	}
	response.end();
});

app.get('/register', function(request, response) {
	response.render(__dirname + "/public/register.ejs",{visi:"invisible",alert:""});
});


app.post('/reg', function(request, response) {
	
	const name = request.body.name;
	const email = request.body.email;
	const username = request.body.username;
	const password = request.body.password;

	
	connection.query('INSERT INTO accounts (user,pass,name,email) values (?,?,?,?)',[username,password,name,email], function(error, results, fields) {

		if (error) {

			console.log(error);
			response.redirect('/register#');

		}else{

			response.redirect('/login');

		}			
		response.end();
	});


});

app.post('/auth', function(request, response) {

	const username = request.body.username;
	const password = request.body.password;

	if (username && password) {

		connection.query('SELECT name FROM accounts WHERE user = ? AND pass = ?', [username, password], function(error, results, fields) {
			if ((error)||(results<1)) {
				//response.send('Incorrect Username and/or Password!');
				//response.render(__dirname + "/public/login.ejs",{visi:"visible",alert:"Incorrect Username and/or Password!"});
				response.redirect('/login#');
			}else{
				request.session.loggedin = true;
				request.session.username = results[0].name;
				response.redirect('/home');
			}			
			response.end();
		});


	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
	
});

app.post('/update',function(request,response){

	const mynote = request.body.mynote;
	connection.query('UPDATE accounts SET note=? WHERE name=?',[mynote,request.session.username], function(error, results, fields) {

		if (error) {
			console.log(error);
			response.render(__dirname + "/public/error404.ejs");
		}else{
			response.redirect('/home');
		}			
		response.end();
	});

});

app.get('/logout',function(request,response){
	request.session.loggedin = false;
	response.redirect('/login');
});

app.get('/home', function(request, response) {

	function get_info(data, callback){

		connection.query('SELECT note FROM accounts WHERE name=?', request.session.username, function(error, results, fields) {
			
			if (error){ 
				console.log(error);
				response.render(__dirname + "/public/error404.ejs");
			}

			return callback(results);
		});
	}



	if (request.session.loggedin == true) {

		get_info("mydata", function(results){
			response.render(__dirname + "/public/home.ejs", {user:request.session.username,note:results[0].note});	
		});
		

	} else {
		response.render(__dirname + "/public/unauthorized.ejs");
	}
	
});

app.get('*', function(request, response){
	response.render(__dirname + "/public/error404.ejs");
});

console.log(`Server Running on port ${porta} !`)
app.listen(porta);