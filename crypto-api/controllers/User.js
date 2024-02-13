const model = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getUsername = function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const id_user = decodedToken.id;
    req.body.id_user = id_user;

    model.getUsername(id_user, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        res.status(200).json(results);
    });
};

exports.getUser = function (req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token);
    const id_user = decodedToken.id;
    req.body.id_user = id_user;

    model.getUser(id_user, function (err, results) {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(results);
    });
};

exports.isSubscriber = function (req, res) {

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.decode(token);
    console.log('token', decodedToken);
    const id_user = decodedToken.id;

    model.isSubscriber(id_user, function (err, results) {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        console.log(results);
        res.status(200).json(results);
    })
}
