const pool = require('../services/connect')
let query = ""

const allUsers = (result) => {
  query = "SELECT * FROM user"

  pool.query(query, (err, result) => {
    if (err) {
      console.log("error: ", err);
      return
    }
    console.log("users: ", result);
    return "haha"

  })
}
const signIn = (payload) => {
  return new Promise((resolve, reject) => {
    console.log("Payload:", payload.email);
    query = `SELECT * FROM user WHERE email="${payload.email}" && password="${payload.password}"`

    pool.query(query, (error, result) => {
      if (error) {
        return reject(error)
      }
      console.log("result", result);
      return resolve(result)
    })
  })
}

module.exports = { allUsers, signIn }
