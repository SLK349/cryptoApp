const { connection } = require("../services/database.js");

exports.authById = function (id, callback) {
  let sql = `SELECT * FROM user WHERE user_id = ?`;
  connection.query(sql, [id], callback);
};
