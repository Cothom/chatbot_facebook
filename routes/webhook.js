var express = require('express');
var router = express.Router();
var chatservice = require('../server/chatService.js');
var userservice = require('../server/userService.js');

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

  if (userservice.isUserKnown(data.entry.id)){
    // Make sure this is a page subscription
    if (data.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        data.entry.forEach(function(entry) {
          var pageID = entry.id;
          var timeOfEvent = entry.time;

          // Iterate over each messaging event
          entry.messaging.forEach(function(event) {
            if (event.message) {
              chatservice.receivedMessage(event);
            } else {
              console.log("Webhook received unknown event: ", event);
            }
          });
        });
    }
   } else {
       userService.addUser(data.entry.id, data);
       chatService.sendTextMessage(data.entry.id, "Bienvenue !");
   }
   res.status(200).send(req.query['hub.challenge']);
});

module.exports = router;
