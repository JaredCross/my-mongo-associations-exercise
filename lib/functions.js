ObjectID = require('mongodb').ObjectID;

module.exports = function alsoFollowArrBuild (members, followers, meetupId) {
  var alsoFollowArr = [];
  meetupId = meetupId.toString();
  for (var i = 0; i < members.length; i++) {
    for (var j = 0; j < members[i].follows.length; j++) {
      if (members[i].follows[j] != meetupId) {
        alsoFollowArr.push(members[i].follows[j]);
      }
    }
  }
  for (var i = 0; i < followers.length; i++) {
    for (var j = 0; j < followers[i].follows.length; j++) {
      if (meetupId != followers[i].follows[j]) {
        alsoFollowArr.push(followers[i].follows[j]);
      }
    }
  }
  var noDupesArr= [];
  var tempObj= {};

  for (i=0; i < alsoFollowArr.length; i++) {
    tempObj[alsoFollowArr[i]]='overwriting dupes';
  }
  for (key in tempObj) {
    noDupesArr.push(new ObjectID(key));
  }
  return noDupesArr;
};
