var express = require('express');
var router = express.Router();

/* GET twitter comments. */
router.get('/', function (req, res, next) {
  var Twitter = require('twitter');

  var client = new Twitter({
    consumer_key: 'IN69pKsnfsgXRWDyZN9ktM4me',
    consumer_secret: 'PU8RYfSAdeATpupXrrN6xhJRePPn6p0tm8HPzdp1AhPwWFJsAR',
    access_token_key: '360626802-UWGxOJmy5qRwoamZLxCpFFjd6D10KkuOMoyitm67',
    access_token_secret: 'wQ62fHnY70hM4OljMAzBxOkZPLbDpQkcNheFodR97H4xD'
  });


  var params = {
    q: 'github',
    result_type: 'popular',
    count: 100
  };


  var dict = {};
  client.get('search/tweets/', params, function (error, data, response) {
    if (!error) {
      var tweets = data.statuses;
      var word = req.params.word;

      for (var i = 0; i < tweets.length; i++) {


        dict[tweets[i].text] = tweets[i].favorite_count;





      }


      var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });

      // Sort the array based on the second element
      items.sort(function (first, second) {
        return second[1] - first[1];
      });

      // Create a new array with only the first 5 items


      N = items.slice(0, 5);

      for (var key in dict) {


        word = word + key + "  ";
      }

      res.send(word);

    }

  });



});

module.exports = router;
