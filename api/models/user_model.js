const { sequelize, db_queries } = require("../config/config")
const { DataTypes } = require('../config/node_packages')

const User = sequelize.define(`${db_queries.user_table_name}`, {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    youtube: {
        type: DataTypes.STRING
    },
    audiomack: {
        type: DataTypes.STRING
    },
    tiktok: {
        type: DataTypes.STRING
    },
    boomplay: {
        type: DataTypes.STRING
    },
    applemusic: {
        type: DataTypes.STRING
    },
    spotify: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
})


module.exports = User
