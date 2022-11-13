require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');

// DB connection
const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongo_URI, {
  dbName: 'u09-music-streaming-app',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MIDDLEWARES - Parsing & Sanitize
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(xss());
app.use(mongoSanitize());

// ROUTES
app.use('/api', routes);

// PORT
const port = process.env.DB_PORT || 4001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
