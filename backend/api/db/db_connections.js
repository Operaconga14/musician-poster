const { pool, sequelize, db_options, db_queries } = require('../config/config')


async function createAndSetupDatabase() {
    // connect to database server
    connectToDatabaseServer()
    // create database and use database
    setupDatabase(db_options.db_name)
    createTable(db_queries.user_table_name, db_queries.user_query)
    createTable(db_queries.events_table_name, db_queries.events_query)
    createTable(db_queries.post_table_name, db_queries.post_query)
    createTable(db_queries.gadget_table_name, db_queries.gadget_query)
    createTable(db_queries.gigs_table_name, db_queries.gigs_query)
    createTable(db_queries.services_table_name, db_queries.services_query)

}


async function connectToDatabaseServer() {
    // connect to database server
    try {
        pool.getConnection()
        console.log('Connected to database succefully')
    } catch (err) {
        console.error(err)
    }
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
    createAndSetupDatabase
}
