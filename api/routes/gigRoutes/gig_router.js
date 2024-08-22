const { express } = require("../../config/node_packages")

const router = express.Router()

// testing gig route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Gig route is working' })
})





module.exports = router
