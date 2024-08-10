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

}

// Database local config
const local_db_options = {

}


module.exports = {
    api_url,
    cloudinary,
    cloud_db_options,
    local_db_options
}
