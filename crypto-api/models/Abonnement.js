const { connection } = require("../services/database.js");

exports.createAbonnement = function (body, callback) {
  let sql = "INSERT INTO abonnement SET ?";
  connection.query(sql, [body], callback);
};

exports.getAllAbonnement = function (callback) {
  let sql = "SELECT * FROM abonnement";
  connection.query(sql, callback);
};

exports.getOneAbbonnment = function (id, callback) {
  let sql = "SELECT * FROM abonnement WHERE id_abonnement = ?";
  connection.query(sql, [id], callback);
};

exports.updateOne = function (id, body, callback) {
  let sql = `UPDATE abonnement SET abonne = ? WHERE id_abonnement = ?`;
  connection.query(sql, [body, id], callback);
};

exports.deleteOne = function (id, callback) {
  let sql = "DELETE FROM abonnement WHERE id_abonnement = ?";
  connection.query(sql, [id], callback);
};
