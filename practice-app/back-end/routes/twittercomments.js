var express = require('express');
var router = express.Router();

/* GET twitter comments. */
router.get('/', function (req, res, next) {
  // import twitter
  var Twitter = require('twitter');
  //get the all access keys
  var key = require('./keys.js');
  //create new twitter object
  var client = new Twitter(key);
  console.log("count is", req.query.count);
  //To specify searching parameters
  var params = {
    q: req.query.query,
    result_type: 'popular',
    count: req.query.count
  };

  //defining dictiornary to store tweets
  var dict = {};
  //gets the tweets here
  client.get('search/tweets/', params, function (error, data, response) {
    if (!error) { //if there is no error
      var tweets = data.statuses; //take tweets status
      var word = req.params.word; //this will be like one line
      for (var i = 0; i < tweets.length; i++) {
        dict[tweets[i].text] = tweets[i].favorite_count; //defining pairs for dictionary
      }
      //get the all keys of our dictionary
      const keys = Object.keys(dict);
      //convert to a json style
      var myJsonString = JSON.stringify(keys);
      //and show them on screen
      res.json(myJsonString);
    }
  });
});
module.exports = router;