const jwt = require('jsonwebtoken');
const secrets = require('../config/secrect.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
      if(err) {
        res.status(400).json({ message: 'No credentials provided' });
      } else {
        req.user = { username: decodedToken.user }
        next()
      }
    })
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
