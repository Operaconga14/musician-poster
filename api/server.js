const express = require('express')
const { user_router } = require('./routes/routes_controller')
const { api_url } = require('./config/config')


// Application configuration
const app = express()

// Route configuration
app.get(`${api_url.url}`, (req, res) => {
    res.json({ messae: 'Welcome to MUGIVIES' })
})

// Other routes config
app.use(`${api_url.url}user`, user_router)




// App port listening
app.listen(api_url.port, () => {
    console.log(`Api url: http://localhost:${api_url.port}${api_url.url}`)
})
