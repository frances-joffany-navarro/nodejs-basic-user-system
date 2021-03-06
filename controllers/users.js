const connectDB = require('../services/connect')
const connection = connectDB()
const bcrypt = require('bcrypt');

const getUsersPerPage = (req, res) => {

  let query = "SELECT * FROM user"

  connection.query(query, (err, result) => {
    if (err) {
      console.log("Please check if your SQL syntax is correct", err);
      return
    }

    if (!result) {
      res.status(500).json({ success: false, data: result })
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const resultPerPage = 10;
    const totalResult = result.length;
    const totalOfPages = Math.ceil(totalResult / resultPerPage)

    if (page > totalOfPages) {
      res.redirect(`/?page=${encodeURIComponent(totalOfPages)}`)
    } else if (page < 1) {
      res.redirect(`/?page=${encodeURIComponent('1')}`)
    }

    const startingLimit = (page - 1) * resultPerPage

    query = `SELECT * FROM user LIMIT ${startingLimit}, ${resultPerPage}`

    connection.query(query, (err, result) => {

      if (err) {
        console.log("Please check if your SQL syntax is correct", err);
        return
      }

      const linksToShow = 4;
      const numberOfLinksToShow = Math.ceil(linksToShow / 2)
      const startingLink = (page - numberOfLinksToShow) < 1 ? 1 : (page + numberOfLinksToShow) > totalOfPages ? (totalOfPages - linksToShow) : (page - numberOfLinksToShow);
      const endingLink = (startingLink + linksToShow) > totalOfPages ? totalOfPages : (startingLink + linksToShow)

      res.status(200).render('index', {
        success: true, data: result, page, resultPerPage, totalResult, totalOfPages, startingLink, endingLink
      });
    })
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

// view one user depending on the id
const viewUser = (req, res) => {
  const user_id = req.query.id
  const query = `SELECT * FROM user WHERE id = ${user_id}`

  connection.query(query, (err, result) => {
    if (err) {
      console.log("Please check if your SQL syntax is correct", err);
      return
    }
    res.render('view-user', { success: true, data: result })
  });
}

const addNewUser = async (req, res) => {
  //get the payload
  const payload = req.body
  const saltRounds = 10

  payload.password = await bcrypt.hash(payload.password, saltRounds)

  console.log(payload);

  res.render('add-user', { success: true, data: payload })

}

const editUser = (req, res) => {
  res.send('Edit Section')
}

const deleteUser = (req, res) => {
  res.send('delete Section')
}

module.exports = { getUsersPerPage, userLogin, viewUser, addNewUser, editUser, deleteUser }

