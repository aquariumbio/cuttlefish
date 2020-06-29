var express = require('express');
var router = express.Router();
const AQ = require('../aquarium');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
