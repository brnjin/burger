USE burgers_db;

CREATE TABLE burgers (
	id INT NOT NULL AUTO_INCREMENT,
	burger_name VARCHAR(60) NOT NULL,
	devoured BOOLEAN NOT NULL,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
);

INSERT INTO burgers (burger_name, devoured)
VALUES (Double cheese, false);

INSERT INTO burgers (burger_name, devoured)
VALUES (chicken, false);

INSERT INTO burgers (burger_name, devoured)
VALUES (plain, false);