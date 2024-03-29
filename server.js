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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARES - Parsing & Sanitize

app.use(
   cors({
      credentials: true,
      origin: [
         'http://localhost:3000',
         'https://music-streaming-app.netlify.app/',
         'https://music-streaming-app.netlify.app/login',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
   })
);

/* app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.header('Access-Control-Allow-Headers');
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, OPTIONS, DELETE'
   );
   console.log('Request received', req.headers.host, req.url, req.method);
   next();
}); */

app.use(mongoSanitize());

// ROUTES
app.use('/api', routes);

// PORT
const port = process.env.DB_PORT;
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
