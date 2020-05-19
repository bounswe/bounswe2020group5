
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  //create a Twitter object with tokens
  var Twitter = require('twitter');
  var key = require('./keys.js');
  var Twit = new Twitter(key);

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //date of today

  var product = req.query.product; //get product name from URL

  //parameter declarations that are going to be used in search
  var params = {

    q : product,
    count : 100, 
    result_type: 'recent',
    until : date
  };
  
  Twit.get('search/tweets/', params, function (error, data, response) {
    if (!error) { //if there is no error
      var tweets = data.statuses; // get statuses of tweets
      if(tweets.length != 0){
        var lastTweet = tweets[0].created_at; //get time of tweet
        var firstTweet = tweets[tweets.length-1].created_at; //get time of tweet

        //to calculate the time difference between lastTweet and firstTweet
        var turnSecFirst = lastTweet.split(" ")[3].split(":");
        var turnSecLast = firstTweet.split(" ")[3].split(":");
        var totalLast = parseInt(turnSecFirst[2]) + parseInt(turnSecFirst[1]*60) + parseInt(turnSecFirst[0]*3600); //to turn time to seconds
        var totalFirst = parseInt(turnSecLast[2]) + parseInt(turnSecLast[1]*60) + parseInt(turnSecLast[0]*3600); //to turn time to seconds
        var avgTweet;
        if(tweets.length == 1){
          var ratioTime = 24 * 60 * 60 - totalFirst;
          avgTweet =  Math.floor((24.0 * tweets.length * 3600) / (ratioTime)); //to calculate average number of tweets that are posted within 24 hours
        }
        else{
          avgTweet =  Math.floor((24.0 * tweets.length * 3600) / (totalLast-totalFirst)); //to calculate average number of tweets that are posted within 24 hours
        }
      }
      else{
        avgTweet = 0; //no tweet is posted 
      }

      //convert average number of tweets to JSON and display
      res.json(JSON.stringify(avgTweet));
    }
  });
});
module.exports = router;
