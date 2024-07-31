const express = require('express')
const morgan = require('morgan')
const { createAndSetupDatabase } = require('./db/db_connections')
const { user_router } = require('./routes')
const cookie_parser = require('cookie-parser')

const app = express()
const PORT = 3000
const api = `/v1/`


// app middleware config
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookie_parser())


// test the api
app.get(`${api}`, (req, res) => {
    res.status(200).json({ message: 'Api is Working' })
})

// other routes
app.use(`${api}auth`, user_router)





// listen to port
app.listen(PORT, () => {

    // connect to database server
    createAndSetupDatabase()
    console.log(`listening to ${PORT} url: http://localhost:${PORT}${api}`)
})
