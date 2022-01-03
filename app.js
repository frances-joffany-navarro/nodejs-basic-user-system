const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan('tiny'))
app.use(express.static('./frontend'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email or Password is empty", data: req.body })
  }
  res.status(201).json({ success: true, message: "Successfully Login", data: req.body })
})


app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
})
