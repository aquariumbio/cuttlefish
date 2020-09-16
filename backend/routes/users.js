var express = require('express');
var router = express.Router();
const AQ = require('../aquarium');

// Login to aquarium
router.post('/login', function(req, res, next) {
  console.log(args);
  AQ.login(req.body.username, req.body.password)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
