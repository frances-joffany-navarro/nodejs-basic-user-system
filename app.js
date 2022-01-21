const express = require("express")
const app = express()
const path = require('path')
/* const morgan = require("morgan") */

app.engine('.html', require('ejs').__express);


require('dotenv').config()

const connectDB = require('./services/connect')
const users = require("./routes/users")
const { getUsersPerPage } = require('./controllers/users')

/*  app.use(morgan('tiny')) */
/* app.use(express.static(path.join(__dirname, 'public'))); */
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/users', users)

app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.redirect('/api/v1/users')
});

const start = () => {
  const port = 5000

  //open the MySQL connection

  const connection = connectDB()

  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ', err.stack);
      return
    }
    console.log('connected as id ', connection.threadId);
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  })
}

start()