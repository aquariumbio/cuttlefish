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
    .then(uid => AQ.get('/plans/folders?user_id=' + 66))
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err));
});

// Retrieves plans from a specific folder
// 'POST' isn't currently modifiying any data
router.post('/', function(req, res, next) {
  AQ.login(req.body.username, req.body.password)
    .then(() => AQ.Plan.where({ user_id: 66, folder: req.body.folder }))
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => res.status(400).send(err));
});

// Gets information about all plans in a user's folder, used primarily in Gantt
router.post('/folder', function(req, res, next) {
  // FINAL OUTPUT
  let plans = {}; // final output

  // TEMPORARY DATA STORES
  let operations = {}; // operation_id      => [ job_id, operation_type_id, operation_status ]
  let operationTypes = {}; // operation_type_id => operation name
  let jobs = {}; // job_id            => { job data }
  let planOperations = {}; // plan_id           => [ list of operation_ids ]

  // VARS TO BUILD SQL CALLS USING "... WHERE <FIELD> IN (<IDS>) ..." CLAUSE
  let planIds = '0';
  let jobIds = '0';
  let operationIds = '0';
  let operationTypeIds = '0';

  AQ.login(req.body.username, req.body.password)

    // GET PLAN IDS
    // CREATE TEMPLATE FOR FINAL OUTPUT
    .then(() => AQ.Plan.where({ user_id: 66, folder: req.body.folder }))
    .then(result => {
      result.forEach(res => {
        planIds += ',' + res.id;
        plans[res.id] = {};
        plans[res.id]['id'] = res.id;
        plans[res.id]['name'] = res.name;
        plans[res.id]['jobs'] = {};
      });
    })

    // GET PLAN ASSOCIATIONS
    .then(() => AQ.PlanAssociation.where('plan_id in (' + planIds + ')')) // .order_by('created_at desc, id')
    .then(result => {
      result.forEach(res => {
        operationIds += ',' + res.operation_id; // I don't think there are duplicates
        if (planOperations[res.plan_id])
          planOperations[res.plan_id].push(res.operation_id);
        else planOperations[res.plan_id] = [res.operation_id];
      });
    })

    // GET OPERATION DATA
    .then(() => AQ.Operation.where('id in (' + operationIds + ')'))
    .then(result => {
      result.forEach(res => {
        operationTypeIds += ',' + res.operation_type_id; // duplicates but who cares for now
        operations[res.id] = [0, res.operation_type_id, res.status]; // reserve first element for job_id
      });
    })

    // GET OPERATION_TYPES
    .then(() => AQ.OperationType.where('id in (' + operationTypeIds + ')'))
    .then(result => {
      result.forEach(res => {
        operationTypes[res.id] = res.name;
      });
    })

    // GET JOB_IDS
    .then(() =>
      AQ.JobAssociation.where('operation_id in (' + operationIds + ')')
    )
    .then(result => {
      result.forEach(res => {
        operations[res.operation_id][0] = res.job_id; // overwrite with the latest job_id
        jobIds += ',' + res.job_id;
      });
    })

    // GET JOB DATA
    .then(() => AQ.Job.where('pc = -2 and id in (' + jobIds + ')')) // only get jobs with pc = -2
    .then(result => {
      result.forEach(res => {
        jobs[res.id] = {};
        jobs[res.id].id = res.id;
        if (res.state.length > 1) {
          jobs[res.id][res.state[0]['operation']] = new Date(
            res.state[0]['time']
          ).toISOString();
          jobs[res.id][res.state[res.state.length - 1]['operation']] = new Date(
            res.state[res.state.length - 2]['time']
          ).toISOString();
          jobs[res.id]['operations'] = {};
        } else {
          jobs[res.id]['NULL'] = '0';
          jobs[res.id]['operations'] = {};
        }
      });
    })

    // BUILD FINAL OUTPUT
    .then(() => {
      Object.keys(plans).forEach(function(plan_id) {
        planOperations[plan_id].forEach(operation_id => {
          // ADD JOBS + OPERATIONS STRUCTURE IF IT DOES NOT EXIST
          if (!plans[plan_id]['jobs']) {
            plans[plan_id]['jobs'] = [];
            plans[plan_id]['jobs']['operations'] = [];
          }

          // ADD OPERATIONS BASED ON JOB_ID
          job_id = operations[operation_id][0];
          if (!plans[plan_id]['jobs'][job_id]) {
            if (job_id == 0) {
              job_id = plan_id + '-0';
              plans[plan_id]['jobs'][job_id] = {};
              plans[plan_id]['jobs'][job_id].id = job_id;
              plans[plan_id]['jobs'][job_id]['operations'] = {};
            } else {
              // ADD THE JOB_ID IF IT DOES NOT EXIST
              plans[plan_id]['jobs'][job_id] = jobs[job_id];
            }
          }

          // ADD THE OPERATION_ID TO ITS JOB_ID
          plans[plan_id]['jobs'][job_id]['operations'][operation_id] = {};
          plans[plan_id]['jobs'][job_id]['operations'][operation_id]['name'] =
            operationTypes[operations[operation_id][1]];
          plans[plan_id]['jobs'][job_id]['operations'][operation_id]['status'] =
            operations[operation_id][2];
        });
      });

      // Convert output to preferred JSON structure
      let result = [];
      Object.entries(plans).forEach(plan => {
        let pl = plan[1];
        let jobs = [];
        Object.entries(pl.jobs).forEach(job => {
          let ops = [];
          Object.entries(job[1].operations).forEach(op => {
            ops.push(op[1]);
          });
          job[1].operations = ops;
          job[1].status = ops[ops.length - 1].status;
          jobs.push(job[1]);
        });
        pl.jobs = jobs;
        pl.initialize = jobs[0].initialize;
        if (jobs[jobs.length - 1].complete) {
          pl.complete = jobs[jobs.length - 1].complete;
        } else {
          pl.complete = jobs[jobs.length - 2].complete;
        }
        pl.status = calculateStatus(pl);
        result.push(pl);
      });
      res.status(200).send(result);
    })
    .catch(err => res.status(400).send('Error fetching plans ', err));
});

// Returns overall status for plan
function calculateStatus(plan) {
  let status = plan.jobs[0].status;
  plan.jobs.forEach(job => {
    switch (job.status) {
      case 'error' && status != 'error':
        status = 'error';
        break;
      default:
        status = job.status;
    }
  });
  return status;
}

module.exports = router;
