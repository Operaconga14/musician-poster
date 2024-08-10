const cloudinary = require('cloudinary').v2
require('dotenv').config()


// Server config
const api_url = {
    url: process.env.API_URL,
    port: process.env.PORT
}

// Cloudinary config
cloudinary.config({
    secure: true,
    api_key: process.env.CLOUD_APIKEY,
    api_secret: process.env.CLOUD_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

// Database cloud config
const cloud_db_options = {
    db_name: process.env.DB_DATABASE,
    db_user: process.env.DB_USERNAME,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_port: process.env.DB_PORT,
    db_connection_limit: process.env.DB_CONNECTION_LIMIT
}

// Database local config
const local_db_options = {
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
}


module.exports = {
    api_url,
    cloudinary,
    cloud_db_options,
    local_db_options
}
