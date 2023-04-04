const mysql      = require('mysql');
const connection = mysql.createConnection({
	host     : 'db4free.net',
	port     : 3306,
	user     : 'joaopaulo',
	password : 'qwerty123',
	database : 'jpdatabase'
})


function createTable(conn){

connection.query('UPDATE accounts SET pass="123" WHERE name="joao"', function(error, results, fields) {
		if(error) return console.log(error);
		console.log('atualizou!');
	});
}


connection.connect(function(err){
	if(err) return console.log(err);
	console.log('conectou!');
	createTable(connection);

})