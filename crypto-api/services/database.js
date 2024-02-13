const mysql = require("mysql2");

exports.connection = mysql.createConnection({
  host: "crypto_db_host",
  user: "crypto",
  database: "crypto-db",
  password: "pwd",
});
