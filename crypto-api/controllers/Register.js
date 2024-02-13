const model = require("../models/Register.js");
const bcrypt = require("bcryptjs");
const { sendWelcomeMail } = require("../middleware/sendgrid.js");

exports.createUser = function (req, res) {
  let { user } = req.body;

  model.checkUsername(user.username, function (err, existingUser) {
    if (err) {
      return res.status(500).json(err);
    } else if (existingUser.length > 0) {
      res.status(409).json({ message: "Username already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);

      user.password = bcrypt.hashSync(user.password, salt);

      model.createUser(req.body.user, function (err, results) {
        if (err) {
          res.status(500).json(err);
        } else {
          sendWelcomeMail(user.mail, user.username);
          res.status(200).json(results);
        }
      });
    }
  });
};
