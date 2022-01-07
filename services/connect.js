const mysql = require('mysql');

const connectDB = (dbParams) => {
  //create a connection
  const connection = mysql.createConnection(dbParams)
  //open the MySQL connection
  connection.connect()
}

module.exports = connectDB
