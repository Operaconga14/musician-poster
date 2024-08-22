const { express } = require("../../config/node_packages");

const router = express.Router()


// test service route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Service route is working' })
})


module.exports = router
