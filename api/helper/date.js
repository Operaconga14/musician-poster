const { moment } = require('../config/node_packages')

// format date
function formatDate(date) {
    return moment(date).format('D MMMM YYYY')
}

module.exports = {
    formatDate
}
