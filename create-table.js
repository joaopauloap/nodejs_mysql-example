const mysql      = require('mysql');
const connection = mysql.createConnection({
	host     : 'db4free.net',
	port     : 3306,
	user     : 'joaopaulo',
	password : 'qwerty123',
	database : 'jpdatabase'
})


function createTable(conn){

	const sql = "CREATE TABLE IF NOT EXISTS notes (\n"+
	"id int NOT NULL,\n"+
	"notename varchar(150) NOT NULL,\n"+
	"content varchar(10000) NOT NULL,\n"+
	"PRIMARY KEY (ID)\n"+
	");";

	conn.query(sql, function (error, results, fields){
		if(error) return console.log(error);
		console.log('criou a tabela!');
	});
}


connection.connect(function(err){
	if(err) return console.log(err);
	console.log('conectou!');
	createTable(connection);

})