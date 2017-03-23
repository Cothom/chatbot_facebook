var express = require('express');
var router = express.Router();
var chatservice = require('../server/chatService.js')

/* GET hello world page. */
router.get('/', function(req, res, next) {
	if (chatservice.authenticate(req)){
	    res.status(200).send(req.query['hub.challenge']);
	} else {
	    res.sendStatus(403);
	} 
});

module.exports = router;
