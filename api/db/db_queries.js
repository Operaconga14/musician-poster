// user query
const user_table_query = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    picture varchar(100),
    facebook varchar(100),
    instagram varchar(100),
    youtube varchar(100),
    audiomack varchar(100),
    tiktok varchar(100),
    boomplay varchar(100),
    applemusic varchar(100),
    spotify varchar(100),
    contact varchar(100),
    role varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

module.exports = {
    user_table_query
}
