const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  // Enregistrez le chemin d'accès à l'image dans la base de données
  const imagePath = "uploads/" + req.file.filename;
  // Enregistrez imagePath dans la base de données
  res.json({ imagePath });
});

module.exports = router;
