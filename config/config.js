require('dotenv').config(); // Make sure to require dotenv at the top

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306 // Add this if your MySQL server runs on a different port
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "database_test", // Update as necessary
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "database_production", // Update as necessary
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3306
  }
};
