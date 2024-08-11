const express = require('express')
const { checkIfEmailExists } = require('./user_controller')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const { auth_jwt, db_queries } = require('../../config/config')
const { hash } = require('bcrypt')
const User = require('../../models/user_model')
const router = express.Router()


// Middleware config
router.use(cookieParser())


// Testing user router
router.get('', (req, res) => {
    res.json({ message: 'User Router is Working' })
})


// Registration route
router.post('/auth/register', async (req, res) => {
    try {
        const { name, email, username, role, password } = req.body
        // check if email exists
        checkIfEmailExists(email)
            .then(async exists => {
                if (exists) {
                    res.status(401).json({ message: 'Email exists use another valid email address' })
                } else {
                    // hash password before storing data into database
                    auth_jwt.salt = await bcrypt.genSalt(10)
                    auth_jwt.hashed_password = await hash(password, auth_jwt.salt)
                    // store data into the database
                    auth_jwt.user = await User.create({ name: name, email: email, picture: db_queries.default_image, username: username, role: role, password: auth_jwt.hashed_password })
                    res.status(201).json({ message: 'Registration successful' })
                }
            })
    } catch (err) {
        res.status(401).json({ message: 'Database error', err })
    }
})




module.exports = router
