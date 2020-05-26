var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get('https://api.exchangeratesapi.io/latest?base=TRY')
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;