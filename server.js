require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');

// DB connection
const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongo_URI, {
   dbName: 'u09-music-streaming-app',
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARES - Parsing & Sanitize
/* const corsOptions = {
   origin: (origin, callback) => {
      callback(null, true);
   },
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
   allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
   ],
   credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions)); */
app.use(
   cors({
      credentials: true,
      origin: [
         'http://localhost:3000',
         'https://63c2c8e4df14f613ce7d2a69--music-streaming-app.netlify.app/' ||
            '*',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   })
);
/* app.use(
   cors({
      origin: '*',
   })
);
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); */
app.use(mongoSanitize());

// ROUTES
app.use('/api', routes);

// PORT
const port = process.env.DB_PORT || 8001;
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
