const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const cookie_parser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('../../models/user.model')
const { sequelize, auth_jwt, cloudinary } = require('../../config/config')
const { checkIfEmailExists } = require('./user_controller')
const { authenticate_user } = require('../../helper/jwt')

router.use(cookie_parser())

// cloudinary config
cloudinary.config({
    secure: true,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET,
    cloud_name: process.env.CLOUD_NAME
})


// testing route
router.get(`/`, (req, res) => {
    res.json({ message: 'User Api working' })
})

//  register route
router.post('/register', async (req, res) => {
    const { name, email, username, password, role } = req.body

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
                    let default_picture = "https://res.cloudinary.com/defmlxshw/image/upload/v1722939368/profile-image/lzcm73qdev3ngcoe2slq.png"
                    // register user into the database
                    auth_jwt.user = await User.create({ name: name, email: email, username: username, role: role, picture: default_picture, password: auth_jwt.hashed_password })
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
                auth_jwt.payload = ({ username: auth_jwt.user.username, email: auth_jwt.user.email })
                auth_jwt.token = jwt.sign(auth_jwt.payload, auth_jwt.secret, { expiresIn: '1d' })
                res.cookie('token', auth_jwt.token, {
                    httpOnly: true, // Prevents JavaScript from accessing the token
                    secure: true,   // Ensure the cookie is only sent over HTTPS
                    sameSite: 'strict', // Adjust for cross-site requests if needed
                    maxAge: 3600000 // 1 hour in milliseconds
                })
                res.status(201).json({ message: 'Login successful', token: auth_jwt.token })
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

router.put('/update', authenticate_user, async (req, res) => {
    try {
        const { username, email } = req.body;

        auth_jwt.user = await User.findOne({ where: { username: req.user.username } });

        if (!auth_jwt.user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Perform data validation here if needed
        await auth_jwt.user.save({ username: username, email: email })
        res.status(201).json({ message: 'Profile updated successfully', user: await auth_jwt.user.save({ username: username, email: email }) });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the profile', err });
    }

})

router.purge('/delete', authenticate_user, async (req, res) => {
    try {
        const username = req.user.username
        // check for the user email
        auth_jwt.user = await User.findOne({ where: { username: username }, attributes: { exclude: ['password', 'id'] } })
        if (!auth_jwt.user) {
            res.status(404).json({ message: 'User not found' })
        } else {
            await User.destroy({ user: auth_jwt.user })
            res.json({ message: 'Account Deleted' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Database error', err })
    }
})



module.exports = router


// https://res.cloudinary.com/defmlxshw/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1722875159/default-logo_ygqexi.png
