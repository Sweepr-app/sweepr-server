var express = require('express');
var router = express.Router();
var _ = require('lodash');

var Users = require('../models/index').Users;
var Group = require('../models/index').Group;
var Signups = require('../models/index').Signups;
var Sweeps = require('../models/index').Sweeps;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find().then(function (users) {
    res.send(users)
  })
});

router.get('/:id', function(req, res, next) {
  Users.find({
    where: {
      id: req.params.id
    },
    include: [{model: Group}]
  }).then(function (user) {
    res.send(user)
  })
});

//get all sweeps this user has signed up for
router.get('/:id/sweeps', function (req, res, next) {
  Signups.findAll({
    where: {
      participant_id: req.params.id
    },
    include: [{model: Sweeps}]
  }).then(function (signups) {
    var sweeps = [];
    _.forEach(signups, function (signup) {
      sweeps.push(signup.Sweep)
    })
    res.send(sweeps)
  })
})

/* POST */
router.post('/', function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send();
  } else {
    Users.create({
      username: req.body.username,
      password: Users.generateHash(req.body.password),
      email: req.body.email,
      birth_date: req.body.birth_date,
      group_id: req.body.group_id
    }).then(function (user) {
      res.send(user)
    })
  }
});


/* PUT */
router.put('/:id', function(req, res, next) {

  Users.find({
    where: {
      id: req.params.id
    }
  }).then(function (user) {
    if (location) {
      attrUpdating = {};
      for (var k in req.body) {
        attrUpdating[k] = req.body[k]
      }
      user.updateAttributes(attrUpdating).then(function (user) {
        res.send(user);
      })
    } else {
      res.status(404).send();
    }
  })
});

router.delete('/:id', function (req, res, next) {
  Users.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (user) {
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
