const express = require('express')
const router = express.Router()
const userRoutes = require('./user.routes')
const profileRoutes = require('./profile.routes')

router.use('/users', userRoutes)
router.use('/profiles', profileRoutes)
module.exports = router