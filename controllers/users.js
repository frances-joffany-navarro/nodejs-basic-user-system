let { allUsers } = require('../models/user.model')
const getAllUsers = (req, res) => {


  /* allUsers = (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      })
    } else { res.send(data) }
  } */
  res.status(200).json({ success: true, data: allUsers })

}

const userLogin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ success: false, message: "Email or Password is empty", data: req.body })
  }
  // query if their is a same email and right password registered in the database


  res.status(201).json({ success: true, message: "Successfully Login", data: req.body })
}

module.exports = { getAllUsers, userLogin }

