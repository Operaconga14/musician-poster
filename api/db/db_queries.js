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

// events query
const event_table_query = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    username varchar(100),
    createdAt DATE,
    updatedAt DATE
)`

// gigs query
const gig_table_query = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    type varchar(100),
    title varchar(100),
    description varchar(100),
    username varchar(100),
    price INT,
    contact varchar(100),
    date DATETIME,
    createdAt DATETIME,
    updatedAt DATETIME
)`

// vacancy query
const vacancies_table_query = `(
    Vacancy_ID int AUTO_INCREMENT PRIMARY KEY,
    title varchar(100),
    description varchar(100),
    type varchar(64),
    location varchar(100),
    username varchar(100),
    deadline DATE,
    contact varchar(100),
    createdAt DATE,
    updatedAt DATE
)`


module.exports = {
    user_table_query,
    event_table_query,
    gig_table_query,
    vacancies_table_query
}
