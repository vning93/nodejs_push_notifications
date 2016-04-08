var express = require('express');
var router = express.Router();
var apn = require('apn');

/* GET push listing. */
// router.get('/', function(req, res, next) {
//   res.send('This is your push page!');
// });

router.post('/', function(req, res, next) {
	// do push stuff here

	console.log(req.body);
	var value = req.body;

	try {
		var options = {
            "pfx": "./_cert/mooment_cert.p12",
            "passphrase": "mooment_cert_pass_sd813u"
        };
        
        var apnConnection = new apn.Connection(options);

        var myDevice = new apn.Device(value.token); // 0085b9f421cf44da50de0c33123c8d68fa650545c842c73dc451b8adb465dc5f

        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600;
        // note.alert = "";
        note.badge = value.badge;
        note.alert = {"body": value.alertBody, "action-loc-key": value.alertActionLocKey};

        apnConnection.pushNotification(note, myDevice);

    	this.status = 200;
		res.send("Push notification SUCCESS!");
	}
	catch (err) {
		console.log(err);
		this.status = 400;
		res.send("Push notification ERROR!");
	}
})

module.exports = router;
