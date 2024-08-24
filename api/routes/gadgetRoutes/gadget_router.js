const { router } = require("../../config/node_packages");


// test gadget route
router.get('', (req, res) => {
    res.status(200).json({ message: 'Gadget route working' })
})



module.exports = router
