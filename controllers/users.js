let { allUsers, signIn } = require('../models/User')
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
/*   console.log(req.body); */
  const result = signIn(req.body)

  console.log("signin result", result);
  
  if (!result) {
    console.log("signin result in", result);
    return res.status(400).send({ success: false, message: "Email or Password is incorrect", data: req.body })
  }

  res.status(201).json({ success: true, message: "Successfully Login", data: req.body })
}

module.exports = { getAllUsers, userLogin }

