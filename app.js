const express = require("express")
const app = express()
const morgan = require("morgan")
const connectDB = require('./services/connect')
require('dotenv').config()

const users = require("./routes/users")

app.use(morgan('tiny'))

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/users', users)

const port = 5000

const db_params = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE
}

const start = async () => {
  try {
    await connectDB(db_params)
    app.listen(port, console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error);
  }
}

start()


