const express = require('express')
const router = express.Router()



// Testing user router
router.get('', (req, res) => {
    res.json({ message: 'User Router is Working' })
})





module.exports = router
