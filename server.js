var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('evenementlist',['evenementlist']);
var bodyParser = require('body-parser');


	app.use(express.static(__dirname + "/public"));
	app.use(bodyParser.json());

	app.get('/evenementlist', function (req, res){
		console.log("I receive a GET Request");
		db.evenementlist.find(function (err, docs){
			res.json(docs);
		});
	});
	app.post('/evenementlist', function (req, res){
		console.log(req.body);
		db.evenementlist.insert(req.body, function (err, doc){
			res.json(doc);
		})
	});

	app.delete('/evenementlist/:id', function (req, res){
		var id = req.params.id;
		console.log(id);
		db.evenementlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
			res.json(doc);
		})
	});

	app.get('/evenementlist/:id', function (req, res){
		var id = req.params.id;
		console.log("I receive a GET Request");
		db.evenementlist.findOne({_id: mongojs.ObjectId(id)}, function (err, docs){
			res.json(docs);
		})
	});

	app.put('/evenementlist/:id', function (req, res){
		var id = req.params.id;
		console.log(req.body);
		db.evenementlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {titre: req.body.titre, description: req.body.description, date: req.body.date}},
		new: true}, function (err, docs){
			res.json(docs);
		});
	});

app.listen(3000);
console.log("Server running on Port 3000");