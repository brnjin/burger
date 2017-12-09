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
    req.body.name, false
  ], function(result) {
  		burger.ll(function(data) {
  			var hbsObject = {
  				burgers: data
  			};
  			res.redirect("/")
  		})
  });
});

router.put('/api/burgers/update', function(req, res){
	burger.update(req.body.id, function(result){
		console.log("router.put", result);
		res.redirect('/');
	});	
});

//Export to server.js 
module.exports = router;