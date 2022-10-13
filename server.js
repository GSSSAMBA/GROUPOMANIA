const express = require("express");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

//cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
};
app.use(cors(corsOptions));

// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});

//pour parser la requete (la mettre au bon format), ça remplace bodyparser qui est inclus dans express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./routes/user.routes');
// const postRoutes = require('./routes/post.routes');

// // const { requireAuth } = require('./middleware/auth.middleware');
// require('dotenv').config({ path: './config/.env' })
// require('./config/db');
// const { checkUser, requireAuth } = require('./middleware/auth.middleware');
// const cors = require('cors');

// const app = express();

// // app.get('/cors', (req, res) => {
// //     res.set('Access-Control-Allow-Origin', '*');
// //     res.send({ "msg": "This has CORS enabled 🎈" })
// // })


// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//     // credentials: true,
//     allowedHeaders: ["sessionId", "Content-Type"],
//     exposedHeaders: ["sessionId"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
// };
// // const corsOptions = {
// //     origin: process.env.CLIENT_URL,
// //     credentials: true,
// //     'allowedHeaders': ['sessionId', 'Content-Type'],
// //     'exposededHeaders': ['sessionId'],
// //     'methods': 'GET, HEAD, PATCH, POST, DELETE',
// //     'preflightContinue': false
// // }
// app.use(cors({ corsOptions }));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());



// // jwt
// app.get('/*', checkUser);
// app.get('/jwtid', requireAuth, (req, res) => {
//     res.status(200).send(res.locals.user._id)
// });

// //routes
// app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);

// // server
// app.listen(process.env.PORT, () => {
//     console.log(`listening on port ${process.env.PORT}`);
// })