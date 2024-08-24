const { db_queries, sequelize } = require("../config/config");
const { DataTypes } = require('../config/node_packages')
const User = require("./user_model");

const Vacancy = sequelize.define(db_queries.vacancy_table_name, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    deadline: {
        type: DataTypes.DATE
    },
    contact: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

Vacancy.belongsTo(User, { foreignKey: 'username' })
User.hasMany(Vacancy, { foreignKey: 'username' })


module.exports = Vacancy
