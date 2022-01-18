const connectDB = require('../services/connect')
const connection = connectDB()

/* const { allUsers, signIn } = require('../models/User') */
const getAllUsers = (req, res) => {

  const query = "SELECT * FROM user"

  connection.query(query, (err, result) => {
    if (err) {
      console.log("Please check if your SQL syntax is correct", err);
      return
    }

    if (!result) {
      res.status(500).json({ success: false, data: result })
    }
    /* const r = res.json({  }) */
    res.status(200).render('index', {
      title: "EJS example", success: true, data: result
    });
  })


}

const userLogin = (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).send({ success: false, message: "Email or Password is empty", data: req.body })
  }
  // query if their is a same email and right password registered in the database
  const query = `SELECT * FROM user WHERE email="${email}" && password="${password}"`

  const sql = new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        console.log("Please check if your SQL syntax is correct", err);
        reject(err)
      }
      resolve(result);
    })
  })

  sql.then((value) => {
    console.log("value", value);
    if (!value) {
      console.log("No result");
      return res.status(400).send({ success: false, message: "Email or Password is incorrect", data: req.body })
    }
    console.log("result found", value);
    return res.status(201).json({ success: true, message: "Successfully Login", data: req.body })
  })

}

module.exports = { getAllUsers, userLogin }

