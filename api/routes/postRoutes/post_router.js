const { express } = require("../../config/node_packages");

const router = express.Router()


// test post route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Post route is working' })
})

module.exports = router
