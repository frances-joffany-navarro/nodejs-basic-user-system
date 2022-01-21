const express = require('express')
const router = express.Router()

const { getUsersPerPage, userLogin, viewUser } = require('../controllers/users')

router.route('/').get(getUsersPerPage).post(userLogin)
router.route('/view-user').get(viewUser)

module.exports = router;