const express = require('express')
const router = express.Router()

const { getUsersPerPage, userLogin } = require('../controllers/users')

router.route('/').get(getUsersPerPage).post(userLogin)
/* router.get('/', getAllUsers); */

module.exports = router;