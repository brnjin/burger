
//Import from connection.js
var connection = require("./connection.js");

//MYSQL table name to reference 
var tableName = "burgers";

var orm = {
	//Used to retreive all types of burgers from the table
	selectAll: function(callback) {

		connection.query("SELECT * FROM " + table, function(err, result) {
			callback(result);
		})

	},

	insertOne: function(burgerName, callback) {
		connection.query( "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?, ?)");
		burgerName.devoured = burgerName.devoured || 0; 
		connection.query( "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?, ?)", 
			[
				burgerName.burger_name, burgerName.devoured
			], function(err, result) {

				callback(result);
			})
	},

	updateOne: function(burgerName, callback) {
		connection.query("UPDATE" + tableName + " SET text=? WHERE id=?", [
			burgerName.burger_name, burgerName.devoured
		], function(err, result) {
			callback(result)
		} )
	}
}
//--------------fix updateOne Where the devoured the booleans
module.exports = orm;