var mysql = require('mysql');

var pool = mysql.createPool({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '',
  database: 'pictionary'
});

/* Test du pool connection*/
/*
pool.getConnection(function(err, db) {

	db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
		if (err) throw err;
		console.log('The solution is: ', rows[0].solution);
	});
	db.release();
});
*/