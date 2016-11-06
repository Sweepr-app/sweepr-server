var express = require('express');
var router = express.Router();

var Sweeps = require('../models/index').Sweeps;
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
    include: {model: Signups}
  }).then(function (sweep) {
    res.send(sweep)
  })
});

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
      sweep.updateAttributees(attrUpdating).then(function (sweep) {
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
