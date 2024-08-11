const mysql2 = require('mysql2');
const { cloud_db_options, db_queries, sequelize } = require('../config/config');


// Creating cloud database connection
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

async function connectToDbCloud() {
    mysql.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }
        console.log('Connected to the database.');
    })
}

function setupAndCreateDatabase() {
    setupDatabase(cloud_db_options.db_name)
    createTable(db_queries.user_table_name, db_queries.user_query)
}

async function setupDatabase(db_name) {
    try {
        // create database and use database
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${db_name};`)
        await sequelize.query(`USE ${db_name}`)
        await sequelize.sync({ force: false })
    } catch (err) {
        console.error(err)
    }
}

async function createTable(table_name, table_query) {
    try {
        // create table
        await sequelize.query(`CREATE TABLE IF NOT EXISTS ${table_name}${table_query}`)
        await sequelize.sync({ force: false })
    } catch (err) {

    }
}




module.exports = {
    connectToDbCloud,
    setupAndCreateDatabase
}
