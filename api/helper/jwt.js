const jwt = require('jsonwebtoken')
const { auth_jwt } = require('../config/config')



const authenticate_user = (req, res, next) => {
    auth_jwt.token = req.cookies.token;

    if (!auth_jwt.token) return res.sendStatus(401); // No token provided

    jwt.verify(auth_jwt.token, auth_jwt.secret, (err, user) => {
        if (err) return res.sendStatus(403); // Invalid token

        req.user = user; // Attach user information to request
        next();
    });
}


module.exports = {
    authenticate_user
}
