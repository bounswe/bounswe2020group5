var express = require('express');
var router = express.Router();

// GET the average number of tweets posted for the last 24 hours
router.get('/', function(req, res, next) {
    
    //create a Twitter object with tokens
    var Twitter = require('twitter');
    var key = require('./keys.js');
    var client = new Twitter(key);

    var date = new Date();
    var today = date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate(); // Date of today
    var yesterday = date.getFullYear() + '-' + (date.getMonth() + 1)+'-'+(date.getDate() - 1); // Date of yesterday
    
    // Vendor name from URL
    var vendor = req.query.vendor; 

    // Parameters used for search 
    var params = {
        q: vendor,
        count: 100, // Maximum number for getting tweets
        result_type: 'recent',
        since: yesterday,
        until: today
    };

    // Time of the last tweet about the vendor
    var lastTweetTime = 0;    
    // Time of the first tweet about the vendor
    var firstTweetTime = 0;   
  
    client.get('search/tweets/', params, function (error, data, response) {
        if (error) throw error;
        else {
            // Take only the text part from the statuses of tweets
            var tweets = data.statuses;
            
            // Take the time the first and last tweets created
            // Since we get the most recent tweets, first tweet in the tweets list is the last posted one
            firstTweetTime = tweets[tweets.length - 1].created_at;
            lastTweetTime = tweets[0].created_at;

            // Calculate the time difference between lastTweetTime and firstTweetTime in seconds
            var splitFirst = firstTweetTime.split(" ")[3].split(":");
            var splitLast = lastTweetTime.split(" ")[3].split(":");
            var firstTimeInSeconds = parseInt(splitFirst[2]) + parseInt(splitFirst[1] * 60) + parseInt(splitFirst[0] * 3600);
            var lastTimeInSeconds = parseInt(splitLast[2]) + parseInt(splitLast[1] * 60) + parseInt(splitLast[0] * 3600);

            var avgTweetsPerDay =  Math.floor((24.0 * tweets.length * 3600) / (lastTimeInSeconds - firstTimeInSeconds));
             // Result message
            var msg = 'On average ' + avgTweetsPerDay + ' tweets related to the vendor' + vendor +  'are posted in the last 24 hours.'
 
            // Convert message to JSON and display
            res.json(JSON.stringify(msg));
        }
    });
});
module.exports = router;