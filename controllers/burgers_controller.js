//dependencies 
var express = require("express");

var router = express.Router();

//Import from burger.js
var burger = ("../models/burger.js");

//Setting up the routes 
router.get("/", function(req, res) {
	burger.all(function(data) {
		var hbObject = {
			burgers: data
	};
		res.render("index", hbObject);
	});
});

router.post("api/burgers", function(req, res) {
	burger.create([
		"burger_name", "devoured"
	], [
		req.body.name, req.body.devoured
	], function(result) {
		res.json({id: result.insertedID});
	});
});

router.put("/api/burgers/:id", function(req, res) {
	var burgerID = "id = " + req.params.id;

	burger.update({
		devoured: req.body.devoured
	}, burgerID, function(result) {
		if (result.changedRows === 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	})
})

//Export to server.js 
module.exports = router;