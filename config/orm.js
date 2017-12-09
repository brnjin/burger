
//Import from connection.js
var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

/*//MYSQL table name to reference 
var tableName = "burgers";

var orm = {
	//Used to retreive all types of burgers from the table
	all: function(callback) {

		connection.query("SELECT * FROM " + table, function(err, result) {
			callback(result);
		})

	},

	create: function(burgerName, callback) {
		connection.query( "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?, ?)");
		burgerName.devoured = burgerName.devoured || 0; 
		connection.query( "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?, ?)", 
			[
				burgerName.burger_name, burgerName.devoured
			], function(err, result) {

				callback(result);
			})
	},

	update: function(burgerName, callback) {
		connection.query("UPDATE" + tableName + " SET text=? WHERE id=?", [
			burgerName.burger_name, burgerName.devoured
		], function(err, result) {
			callback(result)
		} )
	}
}
//--------------fix updateOne Where the devoured the booleans*/
module.exports = orm;