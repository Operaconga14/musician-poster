const { multipart_form, cors_option } = require("../../config/config")
const { router, body_parser, cors } = require("../../config/node_packages")
const { authenticate_user } = require('../../helper/jwt')
const Event = require("../../models/event_model")

// middleware config
router.use(body_parser.urlencoded({ extended: true }))
router.use(cors(cors_option))

// test event api
router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Event route is working' })
})

// get all event api
router.get('/events', async (req, res) => {
    try {
        const events = await Event.findAll()
        if (!events) {
            return res.status(404).json({ message: 'No events found chack back later' })
        }
        return res.status(201).json({ events: events })
    } catch (err) {
        return res.status(501).json({ message: 'Database error', err })
    }

})

// get event by id api
router.get('/event/:id', async (req, res) => {
    const event_id = req.params.id
    try {
        const event = await Event.findByPk(event_id, { attributes: { exclude: ['id'] } })
        if (!event) {
            return res.status(404).json({ message: 'No events found chack back later' })
        }
        return res.status(201).json({ event: event })
    } catch (err) {
        return res.status(501).json({ message: 'Database error', err })
    }

})

// post event route
router.post('/create', authenticate_user, multipart_form.any(), async (req, res) => {
    const email = req.user.email
    const { title, description, } = req.body
    console.log('Bosy Restfsfsgf', req.body)
    try {
        // check user existence
        const event = await new Event({
            title: title,
            description: description,
            username: email,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })

        // save the details into database
        event.save()

        return res.status(201).json({ message: 'Event created successfully', event })
    } catch (err) {
        console.error(err)
        return res.status(501).json({ message: 'Database error', err })
    }
})

// update event route
router.put('/update/:id', authenticate_user, async (req, res) => {
    const email = req.user.email
    const event_id = req.params.id
    try {
        const { title, description } = req.body
        // check user existence
        const event = await Event.findByPk(event_id)
        if (!event) {
            return res.status(404).json({ message: 'No events found or you have not created the requested event' })
        }
        // check user existence
        event.update({
            title: title,
            description: description,
            username: email,
            updatedAt: Date.now()
        })

        return res.status(201).json({ message: 'Event updatetd successfully', event })

    } catch (err) {
        console.error(err)
        return res.status(501).json({ message: 'Database error', err })
    }
})

// delete event route
router.delete('/delete/:id', authenticate_user, async (req, res) => {
    const event_id = req.params.id
    try {
        // check user existence
        const event = await Event.findByPk(event_id)
        if (!event) {
            return res.status(404).json({ message: 'No events found or you have not created the requested event' })
        }
        // check user existence
        event.destroy({ where: { id: event_id } })
        return res.status(201).json({ message: 'Event deleted successfully' })

    } catch (err) {
        console.error(err)
        return res.status(501).json({ message: 'Database error', err })
    }
})

module.exports = router
