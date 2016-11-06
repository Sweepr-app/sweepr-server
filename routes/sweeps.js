var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Sweeps = require('../models/index').Sweeps;
var Locations = require('../models/index').Locations;
var Users = require('../models/index').Users;
var Signups = require('../models/index').Signups;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Sweeps.find().then(function (sweeps) {
    res.send(sweeps)
  })
});

/* GET singlular */
router.get('/:id', function(req, res, next) {
  Sweeps.find({
    where: {
      id: req.params.id
    },
    include: [{model: Signups}, {model: Locations}]
  }).then(function (sweep) {
    res.send(sweep)
  })
});

// Get all users signed up for sweep :id
router.get('/:id/users', function (req, res, next) {
  Signups.findAll({
    where: {
      sweep_id: req.params.id
    },
    include: [{model: Users}]
  }).then(function (signups) {
    var users = [];
    _.forEach(signups, function (signup) {
      users.push(signup.User)
    })
    res.send(users)
  })
})

/* POST */
router.post('/', function(req, res, next) {
  console.log(req.body)
  Sweeps.create({
    title: req.body.title,
    description: req.body.description,
    created_by_user: req.body.created_by_user,
    location_id: req.body.location_id,
    time_start: req.body.time_start,
    time_end: req.body.time_end,
    tagline: req.body.tagline
  }).then(function (sweep) {
    res.send(sweep)
  })
});

/* PUT */
router.put('/:id', function(req, res, next) {

  Sweeps.find({
    where: {
      id: req.params.id
    }
  }).then(function (sweep) {
    if (sweep) {
      attrUpdating = {};
      for (var k in req.body) {
        attrUpdating[k] = req.body[k]
      }
      sweep.updateAttributes(attrUpdating).then(function (sweep) {
        res.send(sweep);
      })
    } else {
      res.status(404).send();
    }
  })
});


router.delete('/:id', function (req, res, next) {
  Sweeps.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (group) {
    if (user) {
      res.json(group);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
