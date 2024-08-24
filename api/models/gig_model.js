const { DataTypes } = require("../config/node_packages");
const { sequelize, db_queries } = require("../config/config");
const User = require("./user_model");



const Gig = sequelize.define(db_queries.gigs_table_name, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    username: {
        type: DataTypes.STRING
    },
    contact: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

Gig.belongsTo(User, { foreignKey: 'username' })
User.hasMany(Gig, { foreignKey: 'username' })

module.exports = Gig
