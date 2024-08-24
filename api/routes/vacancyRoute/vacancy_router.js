const { express } = require("../../config/node_packages");
const Vacancy = require('../../models/vacancy_model')
const { authenticate_user } = require('../../helper/jwt')

const router = express.Router()

// test vacancy route
router.get('', (req, res) => {
    return res.status(200).json({ message: 'Vancncy router is working' })
})

// all vacancy
router.get('/vacancies', async (req, res) => {
    try {
        const vacancy = await Vacancy.findAll()
        if (vacancy <= 0 || !vacancy) {
            return res.status(404).json({ message: 'No vacancies yet check back later' })
        }
        return res.status(201).json({ message: 'Vancncies are available', vacancy })

    } catch (error) {
        return res.status(500).json({ message: 'Database error!', error })
    }
})

// create vacancy
router.post('/create', authenticate_user, async (req, res) => {
    const email = req.user.email
    const { title, description, type, location, deadline, contact } = req.body
    try {
        const vacancy = await Vacancy.create({
            title: title,
            description: description,
            type: type,
            location: location,
            deadline: deadline,
            username: email,
            contact: contact,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        return res.status(201).json({ message: 'Vacancy created successfully', vacancy })

    } catch (error) {
        return res.status(500).json({ message: 'Database error!', error })
    }
})

// update vacancy


// delete vacancy

module.exports = router
