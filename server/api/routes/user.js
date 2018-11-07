const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const config =  require('../../config');
const VerifyToken = require('../../VerifyToken');
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');


router.post('/signup', function(req, res, next) {
    let body = req.body.user;
    let user = new User({
     fullname: body.fullname.trim(),
     email: body.email.trim(),
     password: bcrypt.hashSync(body.password)
    });
    user.save(function(err, user) { 
       if (err) throw err;
      // var token = generateToken(user);
      console.log(user);
       var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      console.log(token);
       res.json({
          user: user,    
          token: token
       });
    });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      var token = jwt.sign({ id: user._id, email: user.email, password:user.password }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });

router.post('/verify', function(req,res){
     var token = req.body.accesstoken;
  //return res.status(200).json(req.body.accesstoken);
  if(token){
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  }else{
    res.status(404).json('no token cookie found');
  }
    
});
router.post('/me', VerifyToken , function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});



module.exports = router;