const jwt = require('jsonwebtoken');

const key = process.env.JWT_SECRET_KEY;
const getAuthToken= (user) =>{
    const token = jwt.sign ({
        _id: user._id,
        name: user.name,
        email:user.email
    }, key)
    return  token
}

module.exports = getAuthToken;