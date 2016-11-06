var express = require('express');
var router = express.Router();

var Groups = require('../models/index').Group;
var Users = require('../models/index').Users;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Groups.find().then(function (groups) {
    res.send(groups)
  })
});

router.get('/:id', function(req, res, next) {
  Groups.find({
    where: {
      id: req.params.id
    },
    include: [{model: Users}]
  }).then(function (groups) {
    res.send(groups)
  })
});

/* POST */
router.post('/', function(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).send();
  } else {
    Groups.create({
      name: req.body.name,
      type: req.body.type,
      owner_id: req.body.owner_id
    }).then(function (group) {
      res.send(group)
    })
  }
});

router.delete('/:id', function (req, res, next) {
  Groups.destroy({
    where: {
      id: req.params.id
    },
    paranoid: true
  }).then(function (group) {
    if (group) {
      res.json(group);
    } else {
      res.sendStatus(404);
    }
  })
})

module.exports = router;
