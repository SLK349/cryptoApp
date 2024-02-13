const express = require("express");
require("dotenv").config();
const app = express();
const port = 8080;
const http = require("http");
const server = http.createServer(app);
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {Server} = require("socket.io");
const multer = require("multer");
const path = require("path");
const solde = require("./controllers/Transaction");
const {authJwt} = require("./middleware/authJwt");

app.use(cors());
app.use(express.json({limit: "10mb"}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const finalFilename = Date.now() + randomString + path.extname(file.originalname);
        cb(null, finalFilename);
    },
});

const upload = multer({storage});

app.post("/upload", upload.single("file"), (req, res) => {
    const pathName = req.file.filename;
    console.log(pathName);
    res.json({imagePath: pathName});
});

app.use(express.static("images"));

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let myInterval;

io.on("connection", (socket) => {
    console.log(`user connected : ${socket.id}`);

    try {
        solde.notification(socket);
        myInterval = setInterval(() => {
            solde.notification(socket);
        }, 300000);
    } catch (error) {
        console.log("error notif", error);
        console.error("Error while retrieving data:", error);
    }

    socket.on("disconnect", () => {
        clearInterval(myInterval);
        console.log(`user disconnected : ${socket.id}`);
    });
});

app.use(
    express.urlencoded({
        extended: true,
    })
);

const transactionRouter = require("./router/Transaction");
app.use("/transaction", authJwt, transactionRouter);

const tradeRouter = require("./router/Trade");
app.use("/trade", authJwt, tradeRouter);

const registerRouter = require("./router/Register");
app.use("/register", registerRouter);

const loginRouter = require("./router/Login");
app.use("/login", loginRouter);

const userRouter = require("./router/User");
app.use("/user", authJwt, userRouter);

const PublicationRouter = require("./router/Publication");
app.use("/publication", authJwt, PublicationRouter);

const authRouter = require("./router/Auth");
app.use("/auth", authRouter);

const mailRouter = require("./router/Mail");
app.use("/mail", authJwt, mailRouter);

const abonnementRouter = require("./router/Abonnement");
app.use("/abo", abonnementRouter);

const {log} = require("console");
const CronJob = require("cron").CronJob;

const job = new CronJob(
    "0 13 * * *",
    function () {
        solde.solde();
    },
    null,
    true,
    "Europe/Paris"
);

server.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
});

module.exports = app;
