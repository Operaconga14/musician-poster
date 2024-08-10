/*.Events Table.*/
CREATE TABLE `events` (
  `event_ID` int NOT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `event_type` varchar(100) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `event_location` varchar(100) DEFAULT NULL,
  `event_description` text,
  PRIMARY KEY (`event_ID`)
)
/*.Gadgets Table.*/
CREATE TABLE `gadgets` (
  `Gadgets_ID` int NOT NULL,
  `Gadget_Type` varchar(100) DEFAULT NULL,
  `Gadget_Name` varchar(100) DEFAULT NULL,
  `Gadget_Description` text,
  `Gadget_Cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Gadgets_ID`)
)
/*.Gigs Table.*/
CREATE TABLE `gigs` (
  `Gig_ID` int NOT NULL,
  `Artiste_ID` int NOT NULL,
  `Gig_Date` date DEFAULT NULL,
  `Gig_Time` time DEFAULT NULL,
  `Gig_Location` varchar(100) DEFAULT NULL,
  `Gig_Desription` text,
  PRIMARY KEY (`Gig_ID`),
  UNIQUE KEY `Artiste_ID_UNIQUE` (`Artiste_ID`)
)
/*.Services Table.*/
CREATE TABLE `services` (
  `Service_ID` int NOT NULL,
  `Service_Type` varchar(100) DEFAULT NULL,
  `Service Description` text,
  `Service_Cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Service_ID`)
)
/*.Users Table.*/
CREATE TABLE `users` (
  `User_ID` int NOT NULL,
  `User_Name` varchar(100) DEFAULT NULL,
  `User_Email` varchar(100) DEFAULT NULL,
  `User_Password` varchar(64) DEFAULT NULL,
  `User_Role` varchar(64) DEFAULT NULL,
  `User_Profile` text,
  PRIMARY KEY (`User_ID`)
)
/*.Vacancy Table.*/
CREATE TABLE `vacancies` (
  `Vacancy_ID` int NOT NULL,
  `Job_Title` varchar(100) DEFAULT NULL,
  `Job_Description` text,
  `Job_Type` varchar(64) DEFAULT NULL,
  `Job_Location` varchar(100) DEFAULT NULL,
  `Job_Application_Deadline` date DEFAULT NULL,
  PRIMARY KEY (`Vacancy_ID`)
)
