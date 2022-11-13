const express = require('express');
const router = express.Router();

// ROUTES FILES CONNECTIONS
const authRoute = require('./auth.routes');
const spotifyAuthRoute = require('./spotify.auth.routes');
const userRoute = require('./user.routes');
const songRoute = require('./song.routes');
const playlistRoute = require('./playlist.routes');
const adminRoute = require('./admin.routes');

const routesIndex = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/spotifyAuth',
    route: spotifyAuthRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/songs',
    route: songRoute,
  },
  {
    path: '/playlists',
    route: playlistRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
