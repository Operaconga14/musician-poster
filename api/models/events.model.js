const { DataTypes } = require('sequelize')
const { sequelize, db_queries } = require('../config/config')
const User = require('./user.model')

const Events = sequelize.define(db_queries.events_table_name, {
    title: {
        type: DataTypes.STRING, // Ensure this matches your actual column name
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        // allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        // allowNull: false,
    },
    username: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true
})
Events.belongsTo(User, { foreignKey: 'username' })
User.hasMany(Events, { foreignKey: 'username' })

module.exports = Events
