var express = require('express');
var router = express.Router();

var Users = require('../models/index').Users;

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
    }
  }).then(function (user) {
    res.send(user)
  })
});

/* POST */
router.post('/', function(req, res, next) {
  console.log(req.body)
  Users.create({
    username: req.body.username,
    email: req.body.email
  }).then(function (user) {
    res.send(user)
  })
});

module.exports = router;
