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
        defaultValue: ''
    },
    description: {
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
