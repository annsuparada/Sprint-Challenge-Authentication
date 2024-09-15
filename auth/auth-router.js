const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrect.js')

const Users = require('./auth-model.js')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genarateToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

function genarateToken(user) {
  const payload = {
    username:user.username
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, secrets.jwtSecrets, options);
}

module.exports = router;