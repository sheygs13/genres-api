const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  // get the token from the header if present
  const token = req.header('x-auth-token');

  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).json({ message: 'Unauthorized. Please provide a token' });

  try {
      //if can verify the token, set req.user and pass to next middleware
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
  } catch({ message }) {
    console.error(message)
    res.status(400).json({ error: 'Invalid token.', message });
  }
}