var express = require('express');
var router = express.Router();

/* GET 'count' amount of tweets about 'keyword' from user 'username'  */
router.get('/', function(req, res, next) {

    //initiliaze twitter object with token from key.js
    var Twitter = require('twitter');
    var key = require('./keys.js');
    var client = new Twitter(key);

    //convert request parameters to get parameters
    username = req.query.user;
    vendor = req.query.mentioned;
    paramq = 'from:' + username + ' @' + vendor;

    //paramater to be used in get method
    var params = {
        q: paramq,
        count: req.query.count
    }

    //initialize empty list to collect data
    tweetList = [];

    //use Twitter API to get tweets defined above
    client.get('search/tweets', params,  function(error, data, response){
        if(error) throw error;
        else {
            //interested in statuses part of data
            var tweets = data.statuses;

            //add text parts of tweets to the list
            for (var i = 0; i<tweets.length; i++)
                tweetList.push(tweets[i].text)

            //convert to json    
            var res_str = JSON.stringify(tweetList);

            //send JSON response
            res.json(res_str);
        }
    }); 
});

module.exports = router;