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
const events_table_query = `(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    picture varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    type varchar(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    contact varchar(100) NOT NULL,
    username varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

// vacancy query
const vacancies_table_query = `(
    Vacancy_ID int AUTO_INCREMENT PRIMARY KEY,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    type varchar(64) NOT NULL,
    location varchar(100) NOT NULL,
    deadline DATA NOT NULL,
    contact varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

//  gadget query
/*.Gadgets Table.*/
const gadget_table_query = `(
    id int NOT NULL,
    type varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    picture varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    price INT NOT NULL,
    contact varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

const services_table_query = `(
    id int NOT NULL,
    type varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    price INT NOT NULL,
    contact varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

const gigs_table_query = `(
    id int NOT NULL,
    type varchar(100) NOT NULL,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    price INT NOT NULL,
    contact varchar(100) NOT NULL,
    createdAt DATE,
    updatedAt DATE
)`

const post_table_query = `(
    id int NOT NULL,
    title varchar(100) NOT NULL,
    description varchar(100) NOT NULL,
    picture varchar(100),
    contact varchar(100) NOT NULL,
    facebook varchar(100),
    youtube varchar(100),
    instagram varchar(100),
    boomplay varchar(100),
    applemusic varchar(100),
    spotify varchar(100),
    titok varchar(100),
    audiomack varchar(100),
    createdAt DATE,
    updatedAt DATE
)`


module.exports = {
    user_table_query,
    events_table_query,
    gigs_table_query,
    services_table_query,
    post_table_query,
    gadget_table_query,
    vacancies_table_query
}
