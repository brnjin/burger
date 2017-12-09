//dependencies 
var express = require("express");

var router = express.Router();

//Import from burger.js
var burger = require("../models/burger.js");

//Setting up the routes 
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, false
  ], function(result) {
  		burger.all(function(data) {
  			var hbsObject = {
  				burgers: data
  			};
  			res.redirect("/")
  		})
  });
});

router.put('/api/burgers/:id', function(req,res){
	var condition = "ID = " + req.params.id;
	console.log(condition);

	burger.update("burgers",'devoured',req.body.devoured,condition,
		function(data){
				res.json({id: data.insertId});
	})

});

//Export to server.js 
module.exports = router;