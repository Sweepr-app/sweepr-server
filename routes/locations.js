var express = require('express');
var router = express.Router();

var Locations = require('../models/index').Locations;
var Users = require('../models/index').Users;
var Sweeps = require('../models/index').Sweeps;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Locations.find().then(function (locations) {
    res.send(locations)
  })
});

router.get('/:id', function(req, res, next) {
  Locations.find({
    where: {
      id: req.params.id
    },
    include: [{model: Users}, {model: Sweeps}]
  }).then(function (locations) {
    res.send(locations)
  })
});

/* POST */
router.post('/', function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send();
  } else {
    Locations.create({
      name: req.body.name,
      type: req.body.type,
      desctiption: req.body.description,
      created_by_user: req.body.created_by_user,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }).then(function (locations) {
      res.send(locations)
    })
  }
});

router.delete('/:id', function (req, res, next) {
  Locations.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (locations) {
    if (locations) {
      res.json(locations);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
