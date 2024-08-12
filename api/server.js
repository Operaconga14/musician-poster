const { api_url, cors_option } = require("./config/config");
const { express, cookie_parser, morgan, cors } = require("./config/node_packages");
const { connectToCloud, setupAndCreateDatabase } = require("./db/db_connection");
const { user_router } = require("./routes/routes_controller");

// app config
const app = express()

// middleware
app.use(cookie_parser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors(cors_option))

/**
 * LIST OF ROUTES
 * main api to test the api
 * user routes
 * event route
 * gigs route
 * service route
 * gadget route
 * post route
 */
app.get(`${api_url.url}`, (req, res) => {
    res.status(200).json({ message: 'Api is Working' })
})

// user route
app.use(`${api_url.url}user`, user_router)

// app port listening
app.listen(api_url.port, () => {

    // connect to database
    connectToCloud()

    // setup database and create tables
    setupAndCreateDatabase()

    console.log(`listening to ${api_url.port} url: http://localhost:${api_url.port}${api_url.url}`)
})
