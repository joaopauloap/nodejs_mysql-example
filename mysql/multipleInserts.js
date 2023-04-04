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
    console.log('Truncated');
  });
}


function updateUsers(conn){
  const sql = "insert into accounts (ID, user, pass) values ?"

  const values = [
  [1,'admin', 'admin'],
  [2,'joao', '123321'],
  [3,'paulo', '321123']
  ];

  conn.query(sql,[values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('Inserted');
  });
}


connection.connect(function(err){
  if(err) return console.log(err);
  eraseTable(connection)
  updateUsers(connection)
  connection.end();//fecha a conexão

})