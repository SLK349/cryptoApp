const { connection } = require("../services/database.js");

exports.createPub = function (body, callback) {
  let sql = "INSERT INTO publication SET ?";
  connection.query(sql, [body], callback);
};

exports.getAllPub = function (callback) {
  let sql = "SELECT * FROM publication";
  connection.query(sql, callback);
};

exports.getUsername = function (body, callback) {
  let sql = "SELECT username FROM user WHERE user_id = ?";
  connection.query(sql, [body], callback);
};

exports.getAllUsernameForPubs = function (body, callback) {
  let sql = "SELECT user_id, username FROM user WHERE user_id IN (?)";
  connection.query(sql, [body], callback);
};

// exports.like = function (body, callback) {
//   let sql = "UPDATE publication SET jaime = jaime + 1 WHERE id_publication = ?";
//   connection.query(sql, [body], callback);
// };

exports.deletePub = function (publicationId, userId, callback) {
  let sql = "DELETE FROM publication WHERE id_publication = ? AND user_id = ?";
  const values = [publicationId, userId];
  connection.query(sql, values, callback);
};

exports.like = function (body, callback) {
  let sql = "INSERT INTO jaime SET ?";
  connection.query(sql, [body], callback);
};

exports.alreadyLike = function (id_user, id_publication, callback) {
  let sql = "SELECT * FROM jaime WHERE id_user = ? AND id_publication = ?";
  connection.query(sql, [id_user, id_publication], callback);
};

exports.unlike = function (id_user, id_publication, callback) {
  let sql = "DELETE FROM jaime WHERE id_user = ? AND id_publication = ?";
  connection.query(sql, [id_user, id_publication], callback);
};

exports.checkCreator = function (id_publication, callback) {
  let sql = "SELECT user_id FROM publication WHERE id_publication = ?";
  connection.query(sql, [id_publication], callback);
};

exports.checkUserLike = function (id_user, callback) {
  let sql = "SELECT * FROM jaime WHERE id_user = ?";
  connection.query(sql, [id_user], callback);
};

exports.countLike = function (callback) {
  let sql = "SELECT id_publication, COUNT(*) AS likeCount FROM jaime GROUP BY id_publication";
  connection.query(sql, callback);
};
