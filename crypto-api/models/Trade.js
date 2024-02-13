const { connection } = require("../services/database.js");

exports.createTrade = function (body, callback) {
  let sql = `INSERT INTO trade SET ? `;
  connection.query(sql, [body], callback);
};

exports.getAllTrade = function (id, callback) {
  let sql = `SELECT * FROM trade WHERE id_user = ? `;
  connection.query(sql, [id], callback);
};

exports.deleteOne = function (name, callback) {
  let sql = `DELETE FROM trade WHERE id_trade = ?`;
  connection.query(sql, [name], callback);
};

exports.updateOne = function (id, body, callback) {
  let sql = `UPDATE trade SET comment = ? WHERE id_trade = ?`;
  connection.query(sql, [body, id], callback);
};
