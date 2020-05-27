var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //create a Twitter object with tokens
  var Twitter = require('twitter');
  var key = require('./keys.js');
  var client = new Twitter(key);

  //parameter declarations that are going to be used in search
  var params = {
    screen_name : req.query.name
  };
  

  client.get('users/show/', params, function (error, data, response) {
      if (!error) { 
        var followers = data.followers_count; //get the follower count of the user
        res.json(JSON.stringify(followers));
      }
  });
});
module.exports = router;
