var express = require('express');
var router = express.Router();

var Signups = require('../models/index').Signups;
var Sweeps = require('../models/index').Sweeps;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Signups.find().then(function (signups) {
    res.send(signups)
  })
});

router.get('/:id', function(req, res, next) {
  Signups.find({
    where: {
      id: req.params.id
    },
    include: [{model: Sweeps}]
  }).then(function (signups) {
    res.send(signups)
  })
});

/* POST */
router.post('/', function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send();
  } else {
    Signups.create({
      sweep_id: req.body.sweep_id,
      participant_id: req.body.participant_id,
      confirmed: false
    }).then(function (signup) {
      res.send(signup)
    })
  }
});

router.delete('/:id', function (req, res, next) {
  Signups.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (signup) {
    if (signup) {
      res.json(signup);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
