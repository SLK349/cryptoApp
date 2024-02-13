const model = require("../models/Publication.js");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.createPub = function (req, res) {
  console.log(req.body);

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;

  const data = {
    content: req.body.publications.content,
    image_url: req.body.publications.image,
    user_id,
  };
  console.log(data);

  model.createPub(data, function (err, results) {
    console.log("results", results);
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(results);
  });
};

// exports.getAllPub = function (req, res) {
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.decode(token);
//   const id_user = decodedToken.id;

//   model.getAllPub(function (err, results) {
//     if (err) {
//       return res.status(500).json(err);
//     }

//     const userIds = results.map((item) => item.user_id);

//     model.getAllUsernameForPubs(userIds, function (userErr, userRes) {
//       if (userErr) {
//         console.log("aaa");
//         return res.status(500).json(userErr);
//       }
//       const usernameMap = {};
//       userRes.forEach((user) => {
//         usernameMap[user.user_id] = user.username;
//       });
//       let enrichedResults = results.map((item) => ({
//         ...item,
//         username: usernameMap[item.user_id], // Associez le nom d'utilisateur à la publication
//         userLikes: false,
//         like: 0,
//       }));

//       model.countLike(function (err, pubLike) {
//         if (err) {
//           console.log(err);
//           return res.status(500).json(err);
//         }
//         const likepub = pubLike;

//         model.checkUserLike(id_user, function (err, results) {
//           if (err) {
//             return res.status(500).json(err);
//           }
//           console.log("the results", results);
//           for (let i = 0; i < enrichedResults.length; i++) {
//             const publication = enrichedResults[i];
//             console.log("user", id_user);
//             // Vérifier si la publication est aimée par l'utilisateur
//             const likedPublication = results.find((like) => like.id_publication === publication.id_publication);

//             // Mettre à jour userLikes en fonction de la vérification
//             publication.userLikes = !!likedPublication;

//             for (let j = 0; j < likepub.length; j++) {
//               const like = likepub[j];
//               if (like.id_publication === publication.id_publication) {
//                 publication.like = like.likeCount;
//               }
//             }
//           }
//         });
//         console.log("enrichedResults", enrichedResults);

//         res.status(200).json(enrichedResults);
//       });

//       // console.log(results);
//     });
//   });
// };

exports.getAllPub = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const id_user = decodedToken.id;

  model.getAllPub(function (err, results) {
    if (err) {
      return res.status(500).json(err);
    }

    const userIds = results.map((item) => item.user_id);

    model.getAllUsernameForPubs(userIds, function (userErr, userRes) {
      if (userErr) {
        console.log("aaa");
        return res.status(500).json(userErr);
      }
      const usernameMap = {};
      userRes.forEach((user) => {
        usernameMap[user.user_id] = user.username;
      });
      let enrichedResults = results.map((item) => ({
        ...item,
        username: usernameMap[item.user_id], // Associez le nom d'utilisateur à la publication
        userLikes: false,
        like: 0,
      }));

      model.countLike(function (err, pubLike) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        const likepub = pubLike;

        model.checkUserLike(id_user, function (err, userLikes) {
          if (err) {
            return res.status(500).json(err);
          }

          // Parcourir enrichedResults et vérifier si l'utilisateur a aimé chaque publication
          for (let i = 0; i < enrichedResults.length; i++) {
            const publication = enrichedResults[i];

            // Vérifier si la publication est aimée par l'utilisateur
            const likedPublication = userLikes.find((like) => like.id_publication === publication.id_publication);

            // Mettre à jour userLikes en fonction de la vérification
            publication.userLikes = !!likedPublication;

            for (let j = 0; j < likepub.length; j++) {
              const like = likepub[j];
              if (like.id_publication === publication.id_publication) {
                publication.like = like.likeCount;
              }
            }
          }

          res.status(200).json(enrichedResults);
        });
      });
    });
  });
};

// exports.checkUserLike = function (req, res) {
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.decode(token);
//   const user_id = decodedToken.id;
//   console.log("okok", user_id);

//   model.checkUserLike(user_id, function (err, results) {
//     if (err) {
//       return res.status(500).json(err);
//     }
//     console.log("the results", results);
//     res.status(200).json(results);
//   });
// };

exports.getUsername = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;
  console.log(user_id);

  model.getUsername(user_id, function (err, results) {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json(results);
  });
};

exports.deletePub = function (req, res) {
  const publicationId = req.params.publicationId;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const user_id = decodedToken.id;
  console.log(publicationId, user_id);

  model.deletePub(publicationId, user_id, function (err, results) {
    if (err) {
      console.log("aaa");
      return res.status(500).json(err);
    }
    if (results.affectedRows === 0) {
      console.log("ccc");
      return res.status(404).json({ message: "Publication not found or unauthorized" });
    }
    res.status(200).json(results);
  });
};

exports.like = function (req, res) {
  const id_publication = req.params.publicationId;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.decode(token);
  const id_user = decodedToken.id;
  const data = { id_publication, id_user, jaime: 1 };

  // Vérifiez d'abord si l'utilisateur est le créateur de la publication
  model.checkCreator(id_publication, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    }
    if (results && results.length > 0) {
      if (results[0].user_id === id_user) {
        res.status(403).json({ message: "Vous ne pouvez pas aimer votre propre publication" });
      } else {
        // Vérifiez si l'utilisateur a déjà aimé cette publication
        model.alreadyLike(id_user, id_publication, function (likeErr, likeResults) {
          if (likeErr) {
            console.log(likeErr);
            return res.status(500).json(likeErr);
          }

          // Si l'utilisateur a déjà aimé la publication, effectuez un "unlike"
          if (likeResults && likeResults.length > 0) {
            // Utilisez la fonction unlike de votre modèle
            model.unlike(id_user, id_publication, function (unlikeErr, unlikeResults) {
              if (unlikeErr) {
                console.log(unlikeErr);
                return res.status(500).json(unlikeErr);
              }
              res.status(200).json({ message: "Publication unliked" });
            });
          } else {
            // Sinon, ajoutez le "j'aime"
            model.like(data, function (likeAddErr, likeAddResults) {
              if (likeAddErr) {
                console.log(likeAddErr);
                return res.status(500).json(likeAddErr);
              }
              res.status(200).json({ message: "Publication liked" });
            });
          }
        });
      }
    }
  });
};
