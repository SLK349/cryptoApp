const { connection } = require("../services/database.js");

exports.createUser = function (body, callback) {
  let sql = "INSERT INTO user SET ?";
  connection.query(sql, [body], callback);
};

exports.checkUsername = function (username, callback) {
  let sql = `SELECT * FROM user WHERE username = ?`;
  connection.query(sql, [username], callback);
};
