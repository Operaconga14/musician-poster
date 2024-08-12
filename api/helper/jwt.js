const { auth_jwt } = require("../config/config");
const { jwt } = require("../config/node_packages");


const authenticate_user = (req, res, next) => {
    auth_jwt.token = req.cookies.token
    if (!auth_jwt.token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(auth_jwt.token, auth_jwt.secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' }); // Invalid token
        console.log('User details', user)
        req.user = user; // Attach user information to request
        next();
    });
}

module.exports = {
    authenticate_user
}
