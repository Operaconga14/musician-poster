// Node module packages installation and configuration
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const morgan = require('morgan')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const cookie_parser = require('cookie-parser')
const express = require('express')
const { Sequelize } = require('sequelize')
const body_parser = require('body-parser')
const mysql2 = require('mysql2')
const dotenv = require('dotenv').config()
const mariadb = require('mariadb')
const { DataTypes } = require('sequelize')
const multer = require('multer')
const fs = require('fs')
const { Readable } = require('stream')
const moment = require('moment')
const { Op } = require('sequelize')
const router = express.Router()

module.exports = {
    bcrypt,
    jwt,
    morgan,
    cors,
    cloudinary,
    cookie_parser,
    express,
    Sequelize,
    mysql2,
    dotenv,
    body_parser,
    mariadb,
    DataTypes,
    multer,
    fs,
    Readable,
    moment,
    Op,
    router
}
