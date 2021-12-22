
const express = require('express')
const router = express.Router();
const {login,dashBoard} =require('../controller/main')


router.route('/login').post(login)
router.route('/dashboard').get(dashBoard)


module.exports = router