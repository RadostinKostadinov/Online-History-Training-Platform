const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require('dotenv/config');
//------------------------------------
const app = express();



//Middleware, authentication
app.use(express.json());
app.use(cors());

//Import Routes
const postsRoute = require('./routes/posts.js');
const avatarsRoute = require('./routes/avatars.js');
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');


//Use Routes
app.use('/avatars', avatarsRoute);
app.use('/auth', authRoute);
app.use('/users', usersRoute);


app.get("/", (req, res) => {
    res.send("We are on home");
});




//Connections
app.listen(3000, () => {
    console.log("SUCCESS: Server started.")
});

mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("SUCCESS: Connected to database.");
});
