const express = require('express')
const { authenticate_user } = require('../../helper/jwt')
const { auth_jwt } = require('../../config/config')
const Events = require('../../models/events.model')
const User = require('../../models/user.model')
const router = express.Router()


// test router if it is working
// router.get('/', (req, res) => {
//     res.status(200).json({ message: 'Events router is working.' })
// })

// get posted event
router.get('/', async (req, res) => {
    try {
        const events = await Events.findAll()
        res.status(201).json({ events: events })
    } catch (err) {
        res.status(501).json({ message: 'Database error', err })
    }
})

// post events
router.post('/addevent', authenticate_user, async (req, res) => {
    const { title, picture, date } = req.body
    try {
        const event = await Events.create({ title: title, picture: picture, date: new Date(date), username: req.user.username })
        res.status(201).json({ message: 'Event succesfully poste', event: event })
    } catch (err) {
        res.status(501).json({ message: 'Database error', err })
    }
})







// exports router
module.exports = router
