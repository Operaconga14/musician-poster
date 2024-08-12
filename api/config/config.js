const { user_table_query } = require("../db/db_queries")
const { dotenv, Sequelize, cloudinary, multer } = require("./node_packages")
dotenv

// cors configuration option
const cors_options = {
    allowed_origin: ['https://musician-poster-frontend.vercel.app', 'http://localhost:4200', '*']
}

const cors_option = {
    origin: (origin, callback) => {
        if (cors_options.allowed_origin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}

// api url and port config option
const api_url = {
    url: process.env.API_URL,
    port: process.env.PORT
}

// database cloud config
const cloud_db_options = {
    db_name: process.env.DB_DATABASE,
    db_user: process.env.DB_USERNAME,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_connection_limit: process.env.DB_CONNECTION_LIMIT
}

// database local config
const local_db_options = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
}

// database queries option
const db_queries = {
    user_table_name: 'users',
    user_query: user_table_query,
    default_image: process.env.DEFAULT_PROFILE_PICTURE
    // events_table_name: 'events',
    // events_query: events_table_query,
    // gadget_table_name: 'gadgets',
    // gadget_query: gadget_table_query,
    // post_table_name: 'posts',
    // post_query: post_table_query,
    // services_table_name: 'services',
    // services_query: services_table_query,
    // gigs_table_name: 'gigs',
    // gigs_query: gigs_table_query
}

// cloud sequelize config
const sequelize = new Sequelize(cloud_db_options.db_name, cloud_db_options.db_user, cloud_db_options.db_pass, {
    host: cloud_db_options.db_host,
    dialect: 'mysql',
    port: cloud_db_options.db_port,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }
    }
})

// cloudinary config
cloudinary.config({
    secure: true,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET,
    cloud_name: process.env.CLOUD_NAME,
})

// jwt authentication config option
const auth_jwt = {
    secret: process.env.AUTH_SECRET,
    payload: {},
    header: {},
    token: undefined,
    jwt: undefined,
    auth_header: undefined,
    auth: undefined,
    user: undefined,
    hashed_password: undefined,
    salt: undefined,
    is_match: undefined,
    updated_user: undefined,
    default_picture: undefined
}

const test_img_upload = process.env.DEFAULT_IMG

const storage = multer.memoryStorage()
const upload = multer({ storage })


module.exports = {
    api_url,
    cloud_db_options,
    local_db_options,
    db_queries,
    sequelize,
    cloudinary,
    auth_jwt,
    cors_option,
    test_img_upload,
    upload
}
