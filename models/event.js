const { sequelize } = require(".");
const User = require("./user");

const Event = sequelize.define('Event', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    genre: {
        type: Sequelize.STRING,
        allowNull: true
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postedBy: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    timestamps: false,
    tableName: 'Events',
    paranoid: true
})

Event.belongsTo(User, { foreignKey: 'username' })
User.hasMany(Event, { foreignKey: 'username' })

module.exports = Event
