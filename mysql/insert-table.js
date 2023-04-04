const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'db4free.net',
  port     : 3306,
  user     : 'joaopaulo',
  password : 'qwerty123',
  database : 'jpdatabase'
})



function addRows(conn){
  const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
  const values = [
  ['teste1', '12345678901'],
  ['teste1', '09876543210'],
  ['teste3', '12312312399']
  ];
  conn.query(sql, [values], function (error, results, fields){
    if(error) return console.log(error);
    console.log('adicionou registros!');
          conn.end();//fecha a conexão
        });
}


connection.connect(function(err){
  if(err) return console.log(err);
  console.log('conectou!');
  addRows(connection)

})