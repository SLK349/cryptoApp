const { connection } = require("../services/database");

exports.GetOneUserAuth = function (username, callback) {
  let sql = `SELECT * FROM user WHERE username = ?`;
  connection.query(sql, [username], callback);
};
