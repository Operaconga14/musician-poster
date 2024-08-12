const { cloud_db_options, sequelize, db_queries } = require("../config/config")
const { mysql2 } = require("../config/node_packages")

// create cloud connection
const mysql = mysql2.createConnection({
    host: cloud_db_options.db_host,
    database: cloud_db_options.db_name,
    port: cloud_db_options.db_port,
    user: cloud_db_options.db_user,
    password: cloud_db_options.db_pass,
    connectionLimit: cloud_db_options.db_connection_limit,
    ssl: {
        rejectUnauthorized: false
    }
})

// connect to cloud database
async function connectToCloud() {
    mysql.connect((err) => {
        if (err) {
            return console.error('Error connecting to the database:', err)
        }
        return console.log('Connected to the database.')
    })
}



// setup database and create tables
function setupAndCreateDatabase() {
    setupDatabase(cloud_db_options.db_name)

    // create user table
    createTable(db_queries.user_table_name, db_queries.user_query)
}

// setup database name
async function setupDatabase(db_name) {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${db_name};`)
        // use the created database
        await sequelize.query(`USE ${db_name}`)
        await sequelize.sync({ force: false })
    } catch (err) {
        return console.error(err)
    }
}

// create tables
async function createTable(table_name, table_query) {
    try {
        await sequelize.query(`CREATE TABLE IF NOT EXISTS ${table_name}${table_query}`)
        await sequelize.sync({ force: false })
    } catch (err) {
        return console.error(err)
    }
}

module.exports = {
    connectToCloud,
    setupAndCreateDatabase
}
