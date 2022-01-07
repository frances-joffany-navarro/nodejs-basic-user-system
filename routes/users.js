const express = require('express')
const router = express.Router()

const { getAllUsers, userLogin } = require('../controllers/users')

router.route('/').get(getAllUsers).post(userLogin)
/* router.get('/', getAllUsers); */

module.exports = router;