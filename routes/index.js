var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/mongo-associations-lesson');
var meetups = db.get('meetups');
var locations = db.get('locations');
var users = db.get('users');
var functions = require('../lib/functions.js');

router.get('/', function(req, res, next) {
  meetups.find({}, function (err, documents) {
    if(err) throw err;
    res.render('index', { meetups: documents });
  });
});


router.get('/meetups/:id', function (req, res, next) {
  meetups.findOne({_id : req.params.id}, function (err, meetup) {
    locations.findOne({_id : meetup.locationId}, function (err, location) {
      users.find({_id: { $in: meetup.memberIds}}, function (err, members) {
        users.find({follows : meetup._id}, function (err, followers) {
          var alsoFollowArr = functions(members, followers, meetup._id);
          console.log(alsoFollowArr);
          meetups.find({_id: {$in: alsoFollowArr}}, function (err, alsoFollow) {
            res.render('show',
              {
                meetup : meetup,
                location : location,
                members: members,
                followers: followers,
                alsoFollow: alsoFollow
              });
          });
        });
      });
    });
  });
});

module.exports = router;
