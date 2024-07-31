const { Sequelize } = require('sequelize')
const mariadb = require('mariadb')
const {user_table_query} = require('../db/db_queries')

// database config option
const db_options = {
    db_conn: 'conn',
    db_name: "musician_poster",
    db_user: "root",
    db_pass: "Operaconga@12",
    db_host: "localhost",
    db_connection_limit: 5,
}

// database queries option
const db_queries = {
    // book_table_name: 'books',
    user_table_name: 'users',
    user_query: user_table_query,
    // books_query: books_table_query,
}

// jwt authentication config option
const auth_jwt = {
    secret: "XXACatLZ/1I3pcf8gcIAK96k+r0eazOkOtmnFefE1s6O7vtchpPQXOXnkUxC5M/1jf/6RyGhNub3GcuOY5E0Ng==",
    payload: {},
    header: {},
    token: undefined,
    jwt: undefined,
    auth_header: undefined,
    auth: undefined,
    user: undefined,
    hashed_password: undefined,
    salt: undefined,
    is_match: undefined
}


// api url and port config option
const api_url = {
    url: "/v1/",
    port: 3000
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
    db_queries
}
