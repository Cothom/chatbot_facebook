var express = require('express');
var router = express.Router();

/* GET hello world page. */
router.get('/webhook', function(req, res, next) {
  res.render('index');
});

module.exports = router;
