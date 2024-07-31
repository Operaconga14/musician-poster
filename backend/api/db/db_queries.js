// user query
const user_table_query = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

module.exports = {
    user_table_query
}
