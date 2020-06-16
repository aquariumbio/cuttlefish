express = require('express');
var router = express.Router();
const AQ = require('../aquarium');

// router.get('/plans', function(req, res, next) {
//   AQ.login('pennert', 'fa9b87vKSDAQ6tW8')
//     .then(() => AQ.get('/plans/folders?user_id=209'))
//     .then(data => res.send(data))
//     .catch(console.log);
// });

router.get('/plans', function(req, res, next) {
  AQ.login('pennert', 'fa9b87vKSDAQ6tW8')
    .then(() => AQ.Plan.where({ user_id: 209, folder: 'Covid-19' }))
    .then(data => res.send(data))
    .catch(console.log);
});

module.exports = router;
