const express = require('express')
const router = express.Router()

const { getUsersPerPage, userLogin, viewUser, addNewUser, editUser, deleteUser } = require('../controllers/users')

router.route('/').get(getUsersPerPage).post(userLogin)
router.route('/view-user').get(viewUser)
router.route('/add-user').get(addNewUser).post(addNewUser)
router.route('/edit-user').put(editUser)
router.route('delete-user').delete(deleteUser)

module.exports = router;