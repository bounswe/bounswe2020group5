var express = require('express');
var router = express.Router();

// GET the average number of tweets that the specific vendor is mentioned in
router.get('/', function(req, res, next) {
    
    // Create a Twitter object with tokens
    var Twitter = require('twitter');
    var key = require('./keys.js');
    var client = new Twitter(key);

    var todayDate = new Date();
    var yesterdayDate = new Date(Date.now() - 864e5);
    var today = (todayDate.getFullYear()) + '-' + (todayDate.getMonth() + 1) + '-' + (todayDate.getDate()); // Date of today
    var yesterday = (yesterdayDate.getFullYear()) + '-' + (yesterdayDate.getMonth() + 1) + '-' + (yesterdayDate.getDate()); // Date of yesterday

    // Parameters used for search 
    var vendor = req.query.vendor;

    var params = {
        q: '@' + vendor,
        count: 100, // Maximum number possible is given for getting tweets
        result_type: 'recent',
        since: yesterday,
        until: today
    };

    // Time of the last tweet about the vendor
    var firstMentionTime = 0;    
    // Time of the first tweet about the vendor
    var lastMentionTime = 0;   
  
    client.get('search/tweets/', params, function (error, data, response) {
        if (error) throw error;
        else {
            // Take only the text part from the statuses of tweets
            var tweets = data.statuses;
            
            // Take the time the first and last tweets created
            // Since we get the most recent tweets, first tweet in the tweets list is the last posted one
            firstMentionTime = tweets[tweets.length - 1].created_at;
            lastMentionTime = tweets[0].created_at;

            // Calculate the time difference between lastTweetTime and firstTweetTime in seconds
            var splitFirst = firstMentionTime.split(" ")[3].split(":");
            var splitLast = lastMentionTime.split(" ")[3].split(":");
            var firstTimeInSeconds = parseInt(splitFirst[2]) + parseInt(splitFirst[1] * 60) + parseInt(splitFirst[0] * 3600);
            var lastTimeInSeconds = parseInt(splitLast[2]) + parseInt(splitLast[1] * 60) + parseInt(splitLast[0] * 3600);

            var avgMentionsPerDay =  Math.floor((24.0 * tweets.length * 3600) / (lastTimeInSeconds - firstTimeInSeconds));
             // Result message
            var msg = 'The vendor ' + vendor + ' mentioned ' + avgMentionsPerDay + ' times on average in the last 24 hours.'
 
            // Convert message to JSON and display
            res.json(JSON.stringify(msg));
        }
    });
});
module.exports = router;