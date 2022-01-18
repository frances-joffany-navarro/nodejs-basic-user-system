const express = require("express")
const app = express()
/* const morgan = require("morgan") */

app.engine('.html', require('ejs').__express);
const connectDB = require('./services/connect')

require('dotenv').config()

const users = require("./routes/users")

/*  app.use(morgan('tiny')) */
/* app.use(express.static(path.join(__dirname, 'public'))); */
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', users)

app.set('view engine', 'html');

app.get('/', function (req, res) {
  res.render('index', {
    title: "EJS example"
  });
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


