var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('evenementlist',['eventlist']);
var bodyParser = require('body-parser');


	app.use(express.static(__dirname + "/public"));
	app.use(bodyParser.json());

	app.get('/getEventList', function (req, res){
		db.eventlist.find(function (err, docs){
			res.json(docs);
		});
	});

	app.post('/addEventList', function (req, res){
		db.eventlist.insert(req.body, function (err, doc){
			res.json(doc);
		});
	});

	app.delete('/delEventList/:id', function (req, res){
		var id = req.params.id;
		db.eventlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	app.put('/updateEvent/:id', function (req, res){
		var id = req.params.id;
		console.log(id);
		db.eventlist.findAndModify({query: {_id: mongojs.ObjectId(req.body._id)},
		update: {$set: {title: req.body.title, desc: req.body.desc, date: req.body.date, type: req.body.type, base64:req.body.base64}},
		new: true}, function (err, docs){
			res.json(docs);
		});
	});

app.listen(3000);
console.log("Server running on Port 3000");