const {connection} = require("../services/database.js");

exports.getUsername = function (id, callback) {
    let sql = `SELECT username
               FROM user
               WHERE user_id = ?`;
    connection.query(sql, [id], callback);
};

exports.getUser = function (id, callback) {
    let sql = `SELECT *
               FROM user
               WHERE user_id = ?`;
    connection.query(sql, [id], callback);
};

exports.updateAbonnement = function (id, abonne, callback) {
    let sql = `UPDATE user
               SET abonne = ?
               WHERE user_id = ?`;
    connection.query(sql, [abonne, id], callback);
};


exports.isSubscriber = function (id, callback) {
    let sql = 'SELECT abonne FROM user WHERE user_id = ?';
    connection.query(sql, [id], callback);
}