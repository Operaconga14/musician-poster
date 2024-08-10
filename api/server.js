const express = require('express')
const morgan = require('morgan')
const { createAndSetupDatabase } = require('./db/db_connections')
const { user_router, events_router } = require('./routes')
const cookie_parser = require('cookie-parser')
const { api_url } = require('./config/config')
const cors = require('cors')

const app = express()

const allowedOrigins = ['https://musician-poster-frontend.vercel.app', 'http://localhost:4200', '*',];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};


// app middleware config
app.use(express.json())
app.use(morgan('tiny'))
app.use(cookie_parser())
app.use(cors(corsOptions))


// test the api
app.get(`${api_url.url}`, (req, res) => {
    res.status(200).json({ message: 'Api is Working' })
})

// other routes
app.use(`${api_url.url}auth`, user_router)
app.use(`${api_url.url}events`, events_router)


// listen to port
app.listen(api_url.port, () => {

    // connect to database server
    createAndSetupDatabase()
    console.log(`listening to ${api_url.port} url: http://localhost:${api_url.port}${api_url.url}`)
})
