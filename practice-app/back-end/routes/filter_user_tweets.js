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
  //To specify searching parameters
  var params = {
    q: req.query.product_name, //get the product name
    count: 100,
    lang: 'tr' //see which language the program search
  };

  //defining dictiornary to store tweets
  var dict = {};

      sorted_array = [];
  //gets the tweets here
  client.get('/search/tweets/', params, function (error, data, response) {
    if (!error) { //if there is no error
      var tweets = data.statuses; //take tweets status
      for (var i = 0; i < tweets.length; i++) {
        dict[tweets[i].text] = tweets[i].favorite_count; //defining pairs for dictionary
      }
	    try{
      //get the keys and mapp them with its regarding values
      items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });
      //sorted them one by one
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      //create array for sorted verision
      //fill this array with first 10 tweets
      for (var i = 0; i < 10; i++) {
        sorted_array.push(items[i][0]);
      }
	    }
	    catch(err){
console.log("there is an error");
	    }
      //create the json file
      var myJsonString = JSON.stringify(sorted_array);
      //and show them on screen
      res.json(myJsonString);

    }
    }); 
});

module.exports = router;
