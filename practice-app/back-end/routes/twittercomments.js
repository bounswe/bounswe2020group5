var express = require('express');
var router = express.Router();

/* GET twitter comments. */
router.get('/', function (req, res, next) {
  var Twitter = require('twitter');
var key = require('./key.json');
  var client = new Twitter(key);


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
