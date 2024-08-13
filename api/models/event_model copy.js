const { sequelize, db_queries, test_img_upload } = require("../config/config");
const { DataTypes } = require('../config/node_packages');
const User = require("./user_model");

const Event = sequelize.define(db_queries.event_table_name, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled Event'
    },
    picture: {
        type: DataTypes.STRING,
        defaultValue: test_img_upload
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'This is a description'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Concert'
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '2024-08-22'
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '04:00pm'
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    username: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, {
    timestamps: false
})

Event.belongsTo(User, { foreignKey: 'username' })
User.hasMany(Event, { foreignKey: 'username' })

module.exports = Event
