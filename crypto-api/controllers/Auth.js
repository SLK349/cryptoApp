const model = require("../models/Auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = "crypto";

exports.authById = function (req, res) {
  model.authById(req.params.id, function (err, results) {
    if (err) {
      return res.status(500).json(err);
    } else {
      console.log("results", results);
      return res.status(200).json(results);
    }
  });
};
