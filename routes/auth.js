var express = require('express');
var router = express.Router();
var _ = require('lodash');
var jwt = require('jsonwebtoken');

var Users = require('../models/index').Users;

router.post('/', function (req, res, next) {
  Users.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(400).json({
        message: '[remove me] No user with that email found.'
      })
    }

    if (!user.validPassword(req.body.password)) {
      return res.status(401).json({
        message: '[remove me] Wrong password'
      })
    }

    // if user is found and password is right
    // create a token
    var token = jwt.sign(user.dataValues, 'sweeprsecret', {
      expiresIn: "1 day"
    });

    res.json({
      success: true,
      message: 'Login Successful',
      token: token
    })

  })
})

module.exports = router;
