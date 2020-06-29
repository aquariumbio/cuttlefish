var express = require('express');
var router = express.Router();
const AQ = require('../aquarium');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Login to aquarium
router.post('/login', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// Retrieves a user's plan folders
router.post('/plans', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.User.where({ login: req.body.username }))
    .then(user => {
      return user[0].id;
    })
    .then(uid => AQ.get('/plans/folders?user_id=' + 209))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
