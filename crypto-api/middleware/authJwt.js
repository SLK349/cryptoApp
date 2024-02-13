const jwt = require("jsonwebtoken");
const secretKey = "crypto";
const axios = require("axios");
const model = require("../models/Auth.js");

exports.authJwt = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log(err);
        // return res.status(403).error({ message: "Accès refusé. Token invalide ou expiré", code: "INVALID_TOKEN" });
        return res.status(403).send("EXPIRED_TOKEN");
      }
      req.user = user;

      model.authById(user.id, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(403).send("INVALID_TOKEN");
        } else {
          // return res.status(200).json(results);
          console.log("utilisateur vérifié");
          next();
        }
      });
    });
  } else {
    return res.status(401).send("NO_TOKEN");
  }
};
