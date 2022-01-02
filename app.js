const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan('tiny'))

app.use(express.static('./frontend'))


app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
})
