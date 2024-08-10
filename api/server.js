const express = require('express')


// Application configuration
const app = express()

// Route configuration
app.get('/', (req, res) => {
    res.json({ messae: 'Welcome to MUGIVIES' })
})






// App port listening
app.listen(3000, () => {
    console.log(`Api url: http://localhost:3000`)
})
