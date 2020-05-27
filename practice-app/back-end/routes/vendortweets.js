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
  var options = { screen_name: req.query.vendor_name,
                count: 10 };

var dict = {};

client.get('statuses/user_timeline', options , function(err, data) {
if(!err){
  for (var i = 0; i < data.length ; i++) {
    dict[data[i].text] = data[i].favorite_count; //defining pairs for dictionary
      }
      //get the keys and mapp them with its regarding values
      let items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });
      //sorted them one by one
      items.sort(function (first, second) {
        return second[1] - first[1];
      });
      //create array for sorted verision
      let sorted_array = [];
      //fill this array with first 10 tweets
      for (var i = 0; i < Math.min(10,items.length); i++) {
        sorted_array.push(items[i][0]);
      }
      //create the json file
      var myJsonString = JSON.stringify(sorted_array);
      //and show them on screen
      res.json(myJsonString);
}
})
});
module.exports = router;
