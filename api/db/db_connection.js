const mysql2 = require('mysql2');
const { cloud_db_options } = require('../config/config');


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




module.exports = {
    connectToDbCloud
}
