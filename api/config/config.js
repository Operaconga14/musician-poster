require('dotenv').config()


// Server config
const api_url = {
    url: process.env.API_URL,
    port: process.env.PORT
}


module.exports = {
    api_url
}
