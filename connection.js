var Connection = require('express').Connection;
var Request = require('express').Request;
var sql = require('mssql');


var config = {
  user: 'sa', // update me
  password: '12345', // update me
  server: 'localhost',
  database:'bbsr'
}

// var connection = new Connection(config);

// connection.on('connect', function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     executeStatement();
//   }
// });

// function executeStatement() {
//   request = new Request("select 123, 'hello world'", function(err, rowCount) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(rowCount + ' rows');
//     }
//     connection.close();
//   });

//   request.on('row', function(columns) {
//     columns.forEach(function(column) {
//       if (column.value === null) {
//         console.log('NULL');
//       } else {
//         console.log(column.value);
//       }
//     });
//   });

//   connection.execSql(request);
// }

function lets_connect(){
    var conn = new sql.ConnectionPool(config);
    var req = new sql.Request(conn);

    conn.connect(function(err){
        if(err){
            console.log(err);
            return
        }else{
          
            console.log("connected");
            return
        }
    });
}

lets_connect();
