const model = require("../models/Publication.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
const { sendPaymentMail } = require("../middleware/sendgrid");

exports.paymentMail = async function (req, res) {
  console.log(req.body);
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;

  userModel.getUser(user_id, async function (err, results) {
    if (err) {
      return res.status(500).json(err);
    }

    let productData = req.body.product.description;
    let product = req.body.product.price;

    try {
      await sendPaymentMail(results[0].mail, results[0].username, product, productData);
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Filed to send email" });
    }
  });
};
