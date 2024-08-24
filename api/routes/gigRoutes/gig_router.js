const { router } = require("../../config/node_packages")
const { authenticate_user } = require("../../helper/jwt")
const Gig = require("../../models/gig_model")



// testing gig route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Gig route is working' })
})

// get all gigs
router.get('/gigs', async (req, res) => {
    try {
        const gigs = await Gig.findAll()
        if (gigs <= 0 || !gigs) {
            return res.status(404).json({ message: 'No gigs available yet check back later' })
        }
        return res.status(201).json({ message: 'Gigs are Available', gigs: gigs })

    } catch (error) {
        return res.status(500).json({ message: 'Database error!', error })
    }
})


// create gig
router.post('/create', authenticate_user, async (req, res) => {
    const username = req.user.email
    const { title, type, price, description, date, contact } = req.body
    try {
        const gig = await new Gig({
            title: title,
            type: type,
            price: price,
            description: description,
            date: date,
            username: username,
            contact: contact,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        gig.save()
        return res.status(201).json({ message: 'Gig created and posted successfully', gig: gig })

    } catch (error) {
        return res.status(500).json({ message: 'Datbase error!', error })
    }
})

// update gig
router.put('/update/:id', authenticate_user, async (req, res) => {
    const gig_id = req.params.id
    const { title, type, description, price, date, contact } = req.body
    try {
        const gig = await Gig.findByPk(gig_id)
        if (!gig) {
            return res.status(404).json({ message: 'No gig found or it has been deleted' })
        }
        gig.update({
            title: title,
            type: type,
            description: description,
            price: price,
            date: date,
            contact: contact,
            updatedAt: Date.now()
        })
        return res.status(201).json({ message: 'Gig updatetd successfully', gig })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Database error!', error })
    }
})

// delete gig
router.delete('/delete/:id', authenticate_user, async (req, res) => {
    const gig_id = req.params.id
    try {
        const gig = await Gig.findByPk(gig_id)
        if (!gig) {
            return res.status(404).json({ message: 'No gig identity found' })
        }
        gig.destroy({ where: { id: gig_id } })
        return res.status(201).json({ message: 'gig deleted successfully' })

    } catch (error) {
        return res.status(500).json({ message: 'Datbase error!', error })
    }
})


module.exports = router
