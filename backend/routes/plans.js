var express = require('express');
var router = express.Router();
const AQ = require('../aquarium');

// Retrieves a user's plan folders
// 'POST' isn't currently modifiying any data
router.post('/folders', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.User.where({ login: req.body.username }))
    .then(user => {
      return user[0].id;
    })
    .then(uid => AQ.get('/plans/folders?user_id=' + uid))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// Retrieves plans from a specific folder
// 'POST' isn't currently modifiying any data
router.post('/', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.User.where({ login: req.body.username }))
    .then(user => {
      return user[0].id;
    })
    .then(uid => AQ.Plan.where({ user_id: 209, folder: req.body.folder }))
    .then(data => res.send(data))
    .catch(console.log);
});

module.exports = router;
