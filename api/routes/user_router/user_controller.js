const { auth_jwt } = require("../../config/config");
const User = require("../../models/user.model");



async function checkIfEmailExists(email) {
    auth_jwt.user = await User.findOne({ where: { email: email } })
    return !!auth_jwt.user
}

module.exports = {
    checkIfEmailExists
}
