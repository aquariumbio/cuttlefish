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
    .then(uid => AQ.get('/plans/folders?user_id=' + 209))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// // Retrieves plans from a specific folder
// // 'POST' isn't currently modifiying any data
// router.post('/', function(req, res, next) {
//   AQ.login(req.body.username, req.body.password)
//     .then(() => AQ.User.where({ login: req.body.username }))
//     .then(user => {
//       return user[0].id;
//     })
//     .then(uid => AQ.Plan.where({ user_id: 209, folder: req.body.folder }))
//     .then(data => res.status(400).send(data))
//     .catch(err => res.status(400).send(err));
// });

// Retrieves plans from a specific folder
// 'POST' isn't currently modifiying any data
router.post('/', function(req, res, next) {
  AQ.login('pennert', 'fa9b87vKSDAQ6tW8')
    .then(() => AQ.Plan.where({ user_id: 209, folder: 'Covid-19' }))
    .then(plans => getPlans(plans))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// Helper function for "/"
async function getPlans(plans) {
  const pArray = plans.map(async plan => {
    const response = await AQ.get('/plans/' + plan.id + '.json');
    return response;
  });
  const result = await Promise.all(pArray);
  console.log(JSON.parse(result));
  return result;
}

module.exports = router;
