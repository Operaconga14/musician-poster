const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const cookie_parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('../../models/user.model')
const { sequelize, auth_jwt } = require('../../config/config')
const { checkIfEmailExists } = require('./user_controller')
const { authenticate_user } = require('../../helper/jwt')




// testing route
router.get(`/`, (req, res) => {
    res.json({ message: 'User Api working' })
})

//  register route
router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body

    try {
        // check if email exists
        checkIfEmailExists(email)
            .then(async exists => {
                if (exists) {
                    res.json({ message: 'Email Exists use another email address' })
                } else {
                    // hash password
                    auth_jwt.salt = await bcrypt.genSalt(10)
                    auth_jwt.hashed_password = await bcrypt.hash(password, auth_jwt.salt)
                    // register user into the database
                    auth_jwt.user = await User.create({ name: name, email: email, username: username, password: auth_jwt.hashed_password })
                    res.status(201).json({ message: 'Registration successful', user: auth_jwt.user })
                }
            })

    } catch (err) {
        res.status(401).json({ message: 'Database error', err })
    }
})

// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        // check if there is any email requested in the database
        auth_jwt.user = await User.findOne({
            where: { email: email }, attributes: {
                exclude: password
            }
        })
        if (!auth_jwt.user) {
            res.status(401).json({ message: 'User not found or wrong email and password' })
        } else {
            // compare password
            auth_jwt.is_match = await bcrypt.compare(password, auth_jwt.user.password)
            if (!auth_jwt.is_match) {
                res.json({ message: 'Wrong or incorrect password' })
            } else {
                // generate and verify token into cookie
                auth_jwt.payload = ({ username: auth_jwt.user.username })
                auth_jwt.token = jwt.sign(auth_jwt.payload, auth_jwt.secret, { expiresIn: '1d' })
                res.cookie('token', auth_jwt.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7600000
                })
                res.status(201).json({ message: 'Login successful' })
            }
        }
    } catch (err) {
        console.error(err)
    }
})

// get user profile
router.get('/me', authenticate_user, async (req, res) => {
    try {
        const username = req.user.username
        // check for the user email
        auth_jwt.user = await User.findOne({ where: { username: username }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            res.json({ message: { user: auth_jwt.user } })
        }
    } catch (err) {
        res.status(500).json({ message: 'Database error', err })
    }

})

router.delete('/delete', authenticate_user, async (req, res) => {
    try {
        const username = req.user.username
        // check for the user email
        auth_jwt.user = await User.findOne({ where: { username: username }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await auth_jwt.user.destroy()
            res.json({ message: 'Account Deleted' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Database error', err })
    }
})



module.exports = router
