var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', (req, res, next) => {
  axios.get('https://api.exchangeratesapi.io/latest?base=USD')
  .then(response => {
    console.log(res.json(response.data))
    res.send(response.data)
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;