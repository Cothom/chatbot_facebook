var express = require('express');
var router = express.Router();
var chatservice = require('../server/chatService.js');

/* GET hello world page. */
router.get('/', function(req, res, next) {
	if (chatservice.authenticate(req)){
	    res.status(200).send(req.query['hub.challenge']);
	} else {
	    res.sendStatus(403);
	} 
});

router.post('/', function(req, res, next) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });
});

module.exports = router;
