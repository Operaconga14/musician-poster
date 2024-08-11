const express = require('express')
const { user_router } = require('./routes/routes_controller')
const { api_url, cors_option } = require('./config/config')
const { connectToDbCloud, setupAndCreateDatabase } = require('./db/db_connection')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')


// Application configuration
const app = express()

// Middleware config
app.use(morgan('tiny'))
app.use(cookieParser())
app.use(cors(cors_option))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Route configuration
app.get(`${api_url.url}`, (req, res) => {
    res.json({ message: 'Welcome to MUGIVIES' })
})

// Other routes config
app.use(`${api_url.url}user`, user_router)




// App port listening
app.listen(api_url.port, () => {

    // Connect to database cloud when the server start
    connectToDbCloud()

    // Setup database and create tables after connected to the database
    setupAndCreateDatabase()

    console.log(`Api url: http://localhost:${api_url.port}${api_url.url}`)
})
