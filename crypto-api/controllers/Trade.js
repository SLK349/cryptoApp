const model = require("../models/Trade.js");
const jwt = require("jsonwebtoken");

exports.createTrade = function (req, res) {
  console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);
  const id_user = decodedToken.id;
  req.body.id_user = id_user;

  model.createTrade(req.body, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
};

exports.getAllTrade = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;
  console.log(user_id);

  model.getAllTrade(user_id, function (err, results) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
};

exports.deleteOne = function (req, res) {
  model.deleteOne(req.params.id, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      console.log(results);
      res.status(200).json(err);
    }
  });
};

exports.updateOne = function (req, res) {
  model.updateOne(req.params.id, req.body.comment, function (err, results) {
    console.log(req.body);
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(results);
    return res.status(200).json(results);
  });
};
