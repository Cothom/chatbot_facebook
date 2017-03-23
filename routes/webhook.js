var express = require('express');
var router = express.Router();
var chatservice = require('../server/chatService.js')

/* GET hello world page. */
router.get('/', function(req, res, next) {
	authenticate(req);
  res.render('index');
});

module.exports = router;
