const { connection } = require('../services/connect')

const allUsers = (result) => {
  const query = "SELECT * FROM user"

  connection.query("SELECT * FROM user", (err, result, fields) => {
    if (err) {
      console.log("error: ", err);
      return
    }
    console.log("users: ", result);
    return "haha"

  })
}

module.exports = { allUsers }
