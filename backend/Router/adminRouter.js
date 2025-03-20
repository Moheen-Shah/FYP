const express = require('express')
const adminController = require('./../Controllers/adminController')

const router = express.Router();
  router.route('/login').post(adminController.adminLogin)
  router.route('/signup').post(adminController.adminSignup)


module.exports = router