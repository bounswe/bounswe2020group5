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
    q: 'vahşetin ortasında şafak vakti açan bir çicek gibi ısıldıyorum',
    result_type: 'popular',
    count: 100
  };



  client.get('search/tweets/', params, function (error, data, response) {
    if (!error) {
      var tweets = data.statuses;
      var word = req.params.word;

      for (var i = 0; i < tweets.length; i++) {


        word = word + tweets[i].text + "  ";


      }
      res.send(word);

    }

  });



});

module.exports = router;
