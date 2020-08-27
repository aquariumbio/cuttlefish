var express = require('express');
var router = express.Router();
const AQ = require('../aquarium');
var CircularJSON = require('circular-json');
var uuid = require('uuid');

// Retrieves a user's plan folders
// 'POST' isn't currently modifiying any data
router.post('/folders', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.User.where({ login: req.body.username }))
    .then(user => {
      return user[0].id;
    })
    .then(uid => AQ.get('/plans/folders?user_id=' + 66))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// Retrieves plans from a specific folder
// 'POST' isn't currently modifiying any data
router.post('/', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.Plan.where({ user_id: 66, folder: req.body.folder }))
    .then(plans => getPlans(plans))
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => res.status(400).send(err));
});

router.post('/strains', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.Plan.where({ user_id: 66, folder: req.body.folder }))
    .then(plans => getPlans(plans))
    .then(data => {
      let result = data.map(plan => {
        let json = JSON.parse(plan.data);
        let operations = json.operations;
        json.jobs = groupByJobID(operations);
        json.operations = null;
        return json;
      });
      res.status(200).send(CircularJSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

// Helper function for /strains
const groupByJobID = array => {
  let jobsObject = [];
  let flag = false;
  // const id = uuid.v4();
  array = array.reduce((objectsByKeyValue, obj) => {
    if (obj.job_associations.length > 0) {
      const value = obj.job_associations[0].job_id;
      if (!jobsObject.some(job => job.id === value)) {
        jobsObject.push(obj.job_associations[0].job);
      }
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    } else {
      if (!flag) {
        flag = true;
        jobsObject.push({ id: 'No Job Assigned' });
      }
      objectsByKeyValue['No Job Assigned'] = (
        objectsByKeyValue['No Job Assigned'] || []
      ).concat(obj);
      return objectsByKeyValue;
    }
  }, {});
  let i = 0;
  for (jobID in array) {
    jobsObject[i].operations = array[jobID];
    i++;
  }
  return jobsObject;
};

// Helper function for "/"
async function getPlans(plans) {
  const pArray = plans.map(async plan => {
    const response = await AQ.get('/plans/' + plan.id + '.json');
    return response;
  });
  const result = await Promise.all(pArray);
  return result;
}

// Get names of OperationTypes
router.post('/op_names', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.OperationType.where())
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
