var express = require('express');
var router = express.Router();

/* GET twitter comments. */
router.get('/', function (req, res, next) {
  // import twitter
  var Twitter = require('twitter');
  //get the all access keys
  var key = require('./key.json');
  //create new twitter object
  var client = new Twitter(key);

  //To specify searching parameters
  var params = {
    q: 'github',
    count: 100
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
      //this is will be used in sorting
      var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });
      // Sort the array based on the second element
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      // Create a new array with only the first 10 items
      N = items.slice(0, 10);
      //then construct the line containing the top popular tweets
      for (var key in dict) {
        word = word + key + "  ->";
      }
      //print out all of them
      res.send(word);
    }
  });
});
module.exports = router;
