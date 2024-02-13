const model = require("../models/Abonnement.js");
const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {sendPaymentMail} = require("../middleware/sendgrid");
const secretkey = "crypto";

exports.createAbonnement = function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const user_id = decodedToken.id;

    console.log(req.body);

    let abonnementData = {
        ...req.body.data,
        user_id: user_id,
    };

    model.createAbonnement(abonnementData, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        console.log("pas derreur");

        userModel.getUser(user_id, async function (err, results) {
            if (err) {
                return res.status(500).json(err);
            }

            let productData = req.body.data.subscription_type;

            sendPaymentMail(results[0].mail, results[0].username, productData)
                .then(() => {
                    let abonne = 1;
                    userModel.updateAbonnement(user_id, abonne, function (err, updateResults) {
                        if (err) {
                            console.error(err);
                            return res.status(500).json(err);
                        }

                        // Send the final response here after all operations are complete
                        res.status(200).json({abonnementResults: results, updateResults: updateResults});
                    });
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({message: "Failed to send email"});
                });
        });
    });
};
