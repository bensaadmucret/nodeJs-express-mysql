const mysql = require('mysql');


    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'crud_nodejs'
    });

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
})

module.exports = connection;



// create a table in MySQL
connection.query('CREATE TABLE IF NOT EXISTS listes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255))',
    function (err, rows) {
        if (!err) {
            console.log('Table created successfully.');
        } else {
            console.log('Error while performing Query.');
        }
    });

    // create a table in MySQL for tasks
connection.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), description VARCHAR(255), status VARCHAR(255))',
        function (err, rows, fields) {
            if (!err) {
                console.log('Table created successfully.');
            } else {
                console.log('Error while performing Query.');
            }
    });

 /*  // insert data in table listes
connection.query('INSERT INTO listes (name, description) VALUES ("Liste 1", "Liste 1")',

    function (err, rows, fields) {
        if (!err) {
            console.log('Data inserted successfully.');
        } else {
            console.log('Error while performing Query.');
        }
    }
);
*/



