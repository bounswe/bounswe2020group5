var express = require('express');
var router = express.Router();

/* GET 'count' amount of tweets about 'keyword' from user 'username'  */
router.get('/', function(req, res, next) {

    //initiliaze twitter object with token from key.js
    var Twitter = require('twitter');
    var key = require('./keys.js');
    var client = new Twitter(key);

    //paramater to be used in get method
    var params = {
        q: 'from:' + req.query.user + ' @' + req.query.mentioned,
        count: req.query.count
    }

    //use Twitter API to get tweets defined above
    client.get('search/tweets', params,  function(error, data, response){
        if(error) throw error;
        else {
            //initialize empty list to collect data
            tweetList = [];

            //interested in statuses part of data
            var tweets = data.statuses;

            //add text parts of tweets to the list
            for (var i = 0; i<tweets.length; i++)
                tweetList.push(tweets[i].text)

            //send JSON response
            res.json(JSON.stringify(tweetList));
        }
    }); 
});

module.exports = router;