const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
})

/* const connectDB = (dbParams) => {
  //create a connection
  const connection = mysql.createConnection(dbParams)
  //open the MySQL connection
  connection.connect()
} */

module.exports = pool
