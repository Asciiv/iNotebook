var jwt = require("jsonwebtoken");
const JWT_SECRET = "OneManShow";

const fetchuser = (req, res,next) => {
    // get the user from jwt token and add id to request
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({error: "Invalid token"});
    }
    try {
        
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next()
    } catch (error) {
        res.status(401).send({error: "Invalid token"});
    }
}

module.exports = fetchuser;