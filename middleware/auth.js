const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // get the token from the header if present
    const token = req.header('x-auth-token');
    //if no token found, return response (without going to the next middelware)
    if (!token) return res.status(401).send('Unauthorized. Please provide a token');
    try{
      //if can verify the token, set req.user and pass to next middleware
       const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
       req.user = decoded;
       next();
    }catch(ex){
      res.status(400).send('Invalid token.');
    }
}