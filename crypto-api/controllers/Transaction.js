const model = require("../models/Transaction.js");
const soldeModel = require("../models/Solde.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.createTransaction = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const id_user = decodedToken.id;
  req.body.id_user = id_user;

  model.createTransaction(req.body, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
};

exports.getAllTransactions = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;
  model.getAllTransactions(user_id, function (err, transactions) {
    if (err) {
      return console.error(err);
    }

    // Récupérer les noms des cryptomonnaies pour la requête API
    // créer un ensemble (Set) à partir d'un tableau et éliminer les doublons.
    const names = [...new Set(transactions.map((transaction) => transaction.name))].join(",");

    // Appeler l'API Coingecko pour obtenir les prix en temps réel
    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=usd`)
      .then((response) => {
        const currentPrices = response.data;

        // Regrouper les transactions par nom de cryptomonnaie
        const groupedTransactions = {};
        transactions.forEach((transaction) => {
          const { name, total, prix, quantité } = transaction;
          if (!groupedTransactions[name]) {
            groupedTransactions[name] = {
              name: name,
              totalSpent: 0,
              totalQuantity: 0,
              averagePrice: 0,
              currentPrice: currentPrices[name].usd,
            };
          }
          groupedTransactions[name].totalSpent += total;
          groupedTransactions[name].totalQuantity += quantité;
          groupedTransactions[name].averagePrice = groupedTransactions[name].totalSpent / groupedTransactions[name].totalQuantity;
        });

        // Effectuer les calculs nécessaires pour chaque groupe de transactions
        for (let name in groupedTransactions) {
          const { totalSpent, totalQuantity, averagePrice, currentPrice } = groupedTransactions[name];
          // Calculs souhaités pour chaque groupe de transactions
          const variation = currentPrice - averagePrice;
          const change = (variation / averagePrice) * 100;
          const montant = (totalSpent * change) / 100;

          // Mettre à jour les valeurs calculées dans l'objet regroupé
          groupedTransactions[name].variation = variation;
          groupedTransactions[name].change = change;
          groupedTransactions[name].montant = montant;
        }
        console.log(groupedTransactions);
        // Répondre avec les résultats regroupés et calculés
        res.status(200).json(groupedTransactions);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  });
};

exports.solde = function (req, res) {
  model.getAll(function (err, transactions) {
    if (err) {
      return console.error(err);
    }

    soldeModel.getAllUser(function (err, users) {
      if (err) {
        return console.error(err);
      }
      users.map((user) => {
        const tab = transactions.filter((e) => user.user_id === e.id_user);
        const obj = {};
        for (let item of tab) {
          if (!obj[item.name]) {
            obj[item.name] = {
              totalSpent: 0,
              totalQuantity: 0,
              averagePrice: 0,
              id: 0,
              totalProfitLoss: 0,
            };
          }

          obj[item.name].totalSpent += parseInt(item.total);
          obj[item.name].totalQuantity += item.quantité;
          obj[item.name].averagePrice = obj[item.name].totalSpent / obj[item.name].totalQuantity;
          obj[item.name].id = item.id_user;
        }

        const names = Object.keys(obj).join(",");
        axios
          .get(`https://api.coingecko.com/api/v3/simple/price?ids=${names}&vs_currencies=usd`)
          .then((response) => {
            const currentPrices = response.data;

            for (let item of tab) {
              const realTimePrice = currentPrices[item.name].usd;
              const profitLoss = (realTimePrice - obj[item.name].averagePrice) * item.quantité;
              obj[item.name].totalProfitLoss += profitLoss;
            }

            let solde = 0;
            for (let asset in obj) {
              solde += obj[asset].totalSpent + obj[asset].totalProfitLoss;
            }

            const date = new Date().toISOString().slice(0, 10);

            soldeModel.createSolde(solde, date, user.user_id, function (err, results) {
              if (err) {
                return console.error(err);
              }
              console.log("Solde Crée");
            });

            console.log("User ID:", user.user_id);
            console.log("Solde final:", solde);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    });
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

exports.getAllSolde = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const id_user = decodedToken.id;
  req.body.id_user = id_user;
  soldeModel.getAllSolde(id_user, function (err, results) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(results);
    }
  });
};

// exports.createSolde = function(req, res){
// console.log(req);

//   const date = new Date();
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.decode(token);
//   const id_user = decodedToken.id;
//   req.body.id_user = id_user;

//   soldeModel.createSolde(req.body.solde, date, id_user, function (err, results){
//     if (err) {
//       console.error(err);
//       res.status(500).json(err);
//     } else {
//       res.status(200).json(results);
//       console.log(results);
//     }
//   })
// }

// exports.notification = function (req, res) {
//   model.getAll(function (err, transactions) {
//     if (err) {
//       return console.error(err);
//     }

//     soldeModel.getAllUser(function (err, users) {
//       if (err) {
//         return console.error(err);
//       }

//       users.map((user) => {
//         const tab = transactions.filter((e) => user.user_id === e.id_user);
//         const obj = {};

//         tab.forEach((item) => {
//           if (!obj[item.name]) {
//             obj[item.name] = {
//               name: item.name,
//               totalSpent: 0, // Total dépensé
//               totalQuantity: 0, // Quantité totale
//               averagePrice: 0, // Prix moyen
//               id: 0,
//               change: 0, // Pourcentage de changement
//             };
//           }

//           // Calculer le total dépensé et la quantité totale détenue pour cet actif
//           obj[item.name].totalSpent += parseInt(item.total);
//           obj[item.name].totalQuantity += item.quantité;
//           obj[item.name].id = item.id_user;

//           // Calculer le prix moyen
//           obj[item.name].averagePrice = obj[item.name].totalSpent / obj[item.name].totalQuantity;

//           // Récupérer le prix en temps réel
//           axios
//             .get(`https://api.coingecko.com/api/v3/simple/price?ids=${item.name}&vs_currencies=usd`)
//             .then((response) => {
//               const currentPrice = response.data[item.name].usd;
//               obj[item.name].currentPrice = currentPrice;

//               // Calculer le pourcentage de changement
//               obj[item.name].change = ((currentPrice - obj[item.name].averagePrice) / obj[item.name].averagePrice) * 100;
//               if(obj[item.name].change > 10){
//                 console.log(obj[item.name]);
//                 return obj[item.name];
//               }
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         });
//       });
//     });
//   });
// };

//Restructurer pour envoyer une seule requete
//Socket trouver le moyen de passer l'id à la connection

async function fetchNotifData() {
  try {
    const transactionsPromise = new Promise((resolve, reject) => {
      model.getAll((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const usersPromise = new Promise((resolve, reject) => {
      soldeModel.getAllUser((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const [transactions, users] = await Promise.all([transactionsPromise, usersPromise]);
    return { transactions, users };
  } catch (error) {
    console.error(error);
  }
}

exports.notification = async function (socket) {
  try {
    const { transactions, users } = await fetchNotifData();
    const updatedData = {};
    // const uniqueAssetNames = Array.from(new Set(transactions.map((item) => item.name)));
    const uniqueAssetNames = [...new Set(transactions.map((transaction) => transaction.name))].join(",");

    const pricesResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${uniqueAssetNames}&vs_currencies=usd`);
    const prices = pricesResponse.data;

    users.map((user) => {
      const tab = transactions.filter((e) => user.user_id === e.id_user);
      tab.forEach((item) => {
        const assetKey = `${item.name}_${item.id_user}`;
        if (!updatedData[assetKey]) {
          updatedData[assetKey] = {
            name: item.name,
            totalSpent: 0,
            totalQuantity: 0,
            averagePrice: 0,
            id: item.id_user,
            change: 0,
          };
        }
        updatedData[assetKey].totalSpent += parseInt(item.total);
        updatedData[assetKey].totalQuantity += item.quantité;
        updatedData[assetKey].averagePrice = updatedData[assetKey].totalSpent / updatedData[assetKey].totalQuantity;
      });
    });

    Object.keys(prices).forEach((assetName) => {
      const currentPrice = prices[assetName].usd;

      Object.keys(updatedData).forEach((assetKey) => {
        if (updatedData[assetKey].name === assetName) {
          const assetInfo = updatedData[assetKey];
          assetInfo.currentPrice = currentPrice;
          assetInfo.change = ((currentPrice - assetInfo.averagePrice) / assetInfo.averagePrice) * 100;
        }
      });
    });
    const filteredData = Object.values(updatedData).filter((assetInfo) => assetInfo.change > 10 || assetInfo.change < -10);
    console.log("sendNotif");
    socket.emit("notif", JSON.stringify(filteredData));
  } catch (error) {
    console.error(error);
    return null;
  }
};
