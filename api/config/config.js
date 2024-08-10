const { Sequelize } = require('sequelize')
const mariadb = require('mariadb')
const { user_table_query, events_table_query, gadget_table_query, post_table_query, services_table_query, gigs_table_query } = require('../db/db_queries')
const cloudinary = require('cloudinary').v2
require('dotenv').config()

// database config option
const db_options = {
    db_conn: 'conn',
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASSWORD,
    db_host: process.env.DB_HOST,
    db_connection_limit: 5,
}

// cloudinary upload config
// cloudinary.config({
//     secure: true,
//     api_key: process.env.CLOUD_APIKEY,
//     api_secret: process.env.CLOUD_SECRET,
//     cloud_name: process.env.CLOUD_NAME
// })

// database queries option
const db_queries = {
    user_table_name: 'users',
    user_query: user_table_query,
    events_table_name: 'events',
    events_query: events_table_query,
    gadget_table_name: 'gadgets',
    gadget_query: gadget_table_query,
    post_table_name: 'posts',
    post_query: post_table_query,
    services_table_name: 'services',
    services_query: services_table_query,
    gigs_table_name: 'gigs',
    gigs_query: gigs_table_query
}

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


// api url and port config option
const api_url = {
    url: process.env.API_URL,
    port: process.env.PORT
}

// sequelize configuration
const sequelize = new Sequelize(db_options.db_name, db_options.db_user, db_options.db_pass, {
    host: db_options.db_host,
    dialect: 'mariadb'
})

// database pool configuration
const pool = mariadb.createPool({
    host: db_options.db_host,
    user: db_options.db_user,
    password: db_options.db_pass,
    connectionLimit: db_options.db_connection_limit
})


module.exports = {
    sequelize,
    pool,
    auth_jwt,
    api_url,
    db_options,
    db_queries,
    cloudinary
}
