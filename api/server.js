const { api_url, cors_options } = require("./config/config");
const { express, cookie_parser, morgan, cors } = require("./config/node_packages");
const { connectToLocal } = require("./db/db_connection");
const { user_router } = require("./routes/route.controller");

const app = express()

// middleware config
app.use(cookie_parser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(cors(cors_options))

/**
 * LIST OF ROUTES
 * main api to test the api
 * user routes => done not completed
 * event route => done  not completed
 * gigs route => done not completed
 * service route => last to do
 * gadget route =>
 * post route =>
 * vaccancies route =>
 */

// testing api
app.get(`${api_url.url}`, (req, res) => {
    res.status(200).json({ message: 'Api is working' })
})
// user router
app.use(`${api_url.url}user`, user_router)





app.listen(api_url.port, () => {
    // connect to dtabase
    connectToLocal()
    console.log(`listening to ${api_url.port} url: http://localhost:${api_url.port}${api_url.url}`)
})
