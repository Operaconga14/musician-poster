const { router } = require("../../config/node_packages");




// test service route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Service route is working' })
})


module.exports = router
