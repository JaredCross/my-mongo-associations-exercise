var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/mongo-associations-lesson')
var meetups = db.get('meetups')
var locations = db.get('locations')
var users = db.get('users')

router.get('/', function(req, res, next) {
  meetups.find({}, function (err, documents) {
    if(err) throw err
    res.render('index', { meetups: documents });
  })
});

router.get('/meetups/:id', function (req, res, next) {
  meetups.findOne({_id : req.params.id}, function (err, data) {
    res.render('show', {meetup : data});
  });
});

module.exports = router;
