var express = require('express');
var router = express.Router();

/* GET twitter comments. */
router.get('/', function(req, res, next) {
  res.send('respond');
});

module.exports = router;
