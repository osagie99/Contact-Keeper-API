const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    // check if token is in header
    const token = req.header('x-auth-token')
    // check if not token 
    if(!token) {
        return res.status(401).json({msg: "Invalid Token Authoriztaion denied"})
    }
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
            req.user = decoded.user;
            next()
    } catch (err){
        res.status(402).json({msg: "Token is not valid"})
    }
}