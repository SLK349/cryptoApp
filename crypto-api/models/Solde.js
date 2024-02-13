const { connection } = require("../services/database.js");

exports.createSolde = function (prix, date, id, callback) {
  let sql = `INSERT INTO solde (prix, date, id_user) VALUES (?, ?, ? )`;
  connection.query(sql, [prix, date, id], callback);
};

exports.getAllSolde = function (id, callback) {
  let sql = `SELECT * FROM solde WHERE id_user = ?`;
  connection.query(sql, [id], callback);
};

exports.getAllUser = function (callback) {
  let sql = `SELECT * FROM user`;
  connection.query(sql, callback);
};
