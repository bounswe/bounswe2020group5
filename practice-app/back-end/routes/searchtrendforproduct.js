
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  //create a Twitter object with tokens
  var Twitter = require('twitter');
  var key = require('./keys.js');
  var Twit = new Twitter(key);

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); //date of today
  var yesterday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()-1); //date of yesterday

  var product = req.query.product; //get product name from URL

  //parameter declarations that are going to be used in search
  var params = {

    q : product,
    count : 100, 
    result_type: 'recent',
    since : yesterday,
    until : date
  };

  var tweetList = {};   //tweets are going to be stored here
  var lastTweet = 0;   //time of the last tweet of today
  var firstTweet = 0; // time of the "count" tweets before the last tweet
  
  Twit.get('search/tweets/', params, function (error, data, response) {
    if (!error) { //if there is no error
      var tweets = data.statuses; // get statuses of tweets
      for (var i = 0; i < tweets.length; i++) {
        tweetList[tweets[i].text] = tweets[i]; //store tweets' text parts      
      }
      lastTweet = tweets[0].created_at; //get time of tweet
      firstTweet = tweets[tweets.length-1].created_at; //get time of tweet

      //to calculate the time difference between lastTweet and firstTweet
      var splittedFirst = lastTweet.split(" ")[3];
      var splittedLast = firstTweet.split(" ")[3];
      var turnSecFirst = splittedFirst.split(":");
      var turnSecLast = splittedLast.split(":");
      var firstTotal = parseInt(turnSecFirst[2]) + parseInt(turnSecFirst[1]*60) + parseInt(turnSecFirst[0]*3600); //to turn time to seconds
      var lastTotal = parseInt(turnSecLast[2]) + parseInt(turnSecLast[1]*60) + parseInt(turnSecLast[0]*3600); //to turn time to seconds
      
      var avgTweet =  Math.floor((24.0 * tweets.length * 3600) / (firstTotal-lastTotal)); //to calculate average number of tweets that are posted within 24 hours
      
      var message = 'On average ' + avgTweet + ' tweets related to this product are posted in the last 24 hours.' //message to return
 
      //convert message to JSON and display
      res.json(JSON.stringify(message));
    }
  });
});
module.exports = router;
