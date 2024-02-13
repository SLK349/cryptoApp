const model = require("../models/Login.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretkey = "crypto";

exports.getOneUserAuth = function (req, res) {
  model.GetOneUserAuth(req.body.user.username, function (err, results) {
    if (err) {
      return res.status(500).json(err);
    } else {
      if (!results.length) {
        return res.status(404).json({ success: "false", message: "Username invalide" });
      }

      let authentificate = bcrypt.compareSync(req.body.user.password, results[0].password);

      if (authentificate) {
        const payload = { id: results[0].user_id };
        const token = jwt.sign(payload, secretkey, { expiresIn: "24h" });
        res.status(200).json({
          success: "true",
          message: "Connexion réussie",
          token: token,
        });
      } else {
        res.status(404).json({ success: "false", message: "Mot de passe incorrects" });
      }
    }
  });
};
