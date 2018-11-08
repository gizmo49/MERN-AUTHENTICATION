const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const Events = require('../models/events');
const config =  require('../../config');
const VerifyToken = require('../../VerifyToken');
var jwt = require('jsonwebtoken');


router.get('/allby/:userIdentity', function(req, res){
 
    Events.find({userid:req.params.userIdentity}).then((result) => {

        return res.json(result);
    })
    .catch((error) => {
       return  res.status(404).json(`not found: ${error}`);
    })
})



router.post('/create', function(req, res){
    token = req.get('x-access-token');

    if(token){
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        const bodyinstance = req.body.body;
     
     //   res.status(200).json(bodyinstance.title);
        jwt.verify(token, config.secret, function(err, decoded) {
          if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            let ResID = decoded.id;
            let event = new Events({
                userid: ResID,
                title: bodyinstance.title,
                venue: bodyinstance.venue,
                date: bodyinstance.date,
                time: bodyinstance.time,
                about: bodyinstance.about
               });
            event.save(function(err, newevent) { 
                if (err) throw err;
               // console.log([newevent]);
                res.json([newevent]);
            
            });
        
        });
      }else{
        res.status(404).json('no token cookie found'); 
      }
  
})

router.get('/test', function(req,res){
    // const result = {
    //     "title": ,
    //     "venue": ,
    //     "date": ,
    //     "time": ,
    //     "about": ,
       
    // }
    Events.find({userid:'5be19db97ab2ca2a9cd70088'}).sort('created_at').limit(1).then((result) => {
        console.log(result);
        return res.json(result);
    })
    .catch((error) => {
       return  res.status(404).json(`not found: ${error}`);
    })
})

module.exports = router;