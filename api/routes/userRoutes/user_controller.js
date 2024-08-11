const { auth_jwt } = require('../../config/config')
const bcrypt = require('bcrypt')
const User = require('../../models/user_model')

// Check if email exist
async function checkIfEmailExists(email) {
    auth_jwt.user = await User.findOne({ where: { email: email } })
    return !!auth_jwt.user
}


async function hashPassword(password) {
    auth_jwt.salt = await bcrypt.genSalt(10)
    auth_jwt.hashed_password = await bcrypt.hash(password, auth_jwt.salt)
    return auth_jwt.hashed_password
}

module.exports = {
    checkIfEmailExists,
    hashPassword
}
