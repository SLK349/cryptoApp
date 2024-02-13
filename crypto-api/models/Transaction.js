const { connection } = require("../services/database.js");

exports.createTransaction = function (body, callback) {
  let sql = `INSERT INTO transaction SET ?`;
  connection.query(sql, [body], callback);
};

exports.getAllTransactions = function (id, callback) {
  let sql = `SELECT * FROM transaction WHERE id_user = ?`;
  connection.query(sql, [id], callback);
};

exports.getAll = function (callback) {
  let sql = `SELECT * FROM transaction`;
  connection.query(sql, callback);
};

exports.deleteOne = function (name, callback) {
  let sql = `DELETE FROM transaction WHERE name = ?`;
  connection.query(sql, [name], callback);
};

// exports.getAll = function (callback) {
//   let sql = `SELECT name, SUM(total) AS total_sum, AVG(prix) AS prix, MAX(id_transaction) AS id_transaction, id_user FROM transaction GROUP BY name ;`;
//   connection.query(sql, callback);
// };
