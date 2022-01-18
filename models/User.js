const connectDB = require('../services/connect')
const connection = connectDB()

const allUsers = () => {
  
}

const signIn = (payload) => {
  new Promise((resolve, reject) => {
    const query = `SELECT * FROM user WHERE email="${payload.email}" && password="${payload.password}"`

    connection.query(query, (err, result, fields) => {
      if (err) {
        console.log("Please check if your SQL syntax is correct", err);
        return
      }
      console.log("User result: ", result);
      resolve(result);
    })
  })

}

/* const signIn = (payload) => {
  new Promise((resolve, reject) => {
    query = `SELECT * FROM user WHERE email="${payload.email}" && password="${payload.password}"`

    pool.query(query, (error, result) => {
      if (error) {
        return reject(error)
      }
      console.log("result", result);
      return resolve(result)
    })
  })
} */



module.exports = { allUsers, signIn }
