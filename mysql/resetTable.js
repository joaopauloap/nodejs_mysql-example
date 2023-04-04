const mysql      = require('mysql');
const connection = mysql.createConnection({
	host     : 'db4free.net',
	port     : 3306,
	user     : 'joaopaulo',
	password : 'qwerty123',
	database : 'jpdatabase'
})



function eraseTable(conn){

  const sql = "truncate accounts"

  conn.query(sql, function (error, results, fields){
    if(error) return console.log(error);
    console.log('Truncate');
  });
}


function createTable(conn){

	const sql = "CREATE TABLE IF NOT EXISTS accounts (\n"+
	"id int NOT NULL AUTO_INCREMENT,\n"+
	"name varchar(150) NOT NULL,\n"+
	"email varchar(150) NOT NULL,\n"+
	"user varchar(150) NOT NULL,\n"+
	"pass varchar(150) NOT NULL,\n"+
	"PRIMARY KEY (ID)\n"+
	");";

	conn.query(sql, function (error, results, fields){
		if(error) return console.log(error);
		console.log('Created');
	});
}



connection.connect(function(err){

  if(err) return console.log(err);
  eraseTable(connection);
  createTable(connection);
  connection.end();//fecha a conexão

});
