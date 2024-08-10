const cloudinary = require('cloudinary')
require('dotenv').config()


// Server config
const api_url = {
    url: process.env.API_URL,
    port: process.env.PORT
}

// Cloudinary config



module.exports = {
    api_url,
    cloudinary
}
