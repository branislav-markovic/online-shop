const HttpStatus = require('http-status-codes');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(HttpStatus.FORBIDDEN).send({message: 'No token provided!'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(HttpStatus.UNAUTHORIZED).send({message: "Unauthorized!"});
        }

        next();
    });
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;
