const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
//------------------------------------
const app = express();

// Middleware, authentication
app.use(express.json());
app.use(cors());
app.use('/static', express.static('./static'));

// Import Routes
const avatarsRoute = require('./routes/avatars.js');
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const erasRoute = require('./routes/eras.js');
const lessonsRoute = require('./routes/lessons.js');
const lessonItemsRoute = require('./routes/lessonItems.js');
const uploadsRoute = require('./routes/upload.js');
const questionsRoute = require('./routes/questions.js');
const practicesRoute = require('./routes/practices.js');

// Use Routes
app.use('/avatars', avatarsRoute);
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/eras', erasRoute);
app.use('/lessons', lessonsRoute);
app.use('/lessonItems', lessonItemsRoute);
app.use('/upload', uploadsRoute);
app.use('/questions', questionsRoute);
app.use('/practices', practicesRoute);

app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connections
app.listen(3000, () => {
  console.log('SUCCESS: Server started.');
});

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log('SUCCESS: Connected to database.');
});
