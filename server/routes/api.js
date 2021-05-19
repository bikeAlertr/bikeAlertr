const express = require('express');
// const { stat } = require('fs');
// const { nextTick } = require('process');

const stationController = require('../controllers/stationController');
const userController = require('../controllers/userController');
const favoritesController = require('../controllers/favoritesController');
const alertsController = require('../controllers/alertsController')

const router = express.Router();

// ----------------- STATION CONTROLLER ----------------------------------------------------------

// INITIAL ADD ALL STATIONS TO DATABASE
// router.get('/addStationInfo', 
//   stationController.addStationInfo, (err, res, req) => {
//     res.status(200).json('Successfully got the station info!');
//   }
// );

// router.get('/test',
//   (err, res, req) => {
//     console.log('asyncronous!');
//     res.status(200).json('Successfully got the asyncronous call!');
//   }
// );

// DYNAMICALLY UPDATE THE STATIONS TABLE EVERY MINUTE
router.get('/updateStation', 
  stationController.updateStations, 
  (err, res, req) => {
    res.status(200).json('Successfully updated the SQL Table!')
  }
);

// REFRESH DATA IN THE DATABASE
router.get('/refreshStation', 
  stationController.updateStations, 
  (err, res, req) => {
    res.status(200).json('Successfully refreshed the SQL Table!')
  }
);

// -----------------------------------------------------------------------------------------------

// ----------------------------------- USER CONTROLLER -------------------------------------------

// SIGNUP NEW USER TO DATABASE 
router.post('/signup', 
  userController.signUp,
  userController.setSSIDCookie,
  (err, res, req) => {
    res.status(200).send(res.locals);
  }
);

// VERIFY USER INFO FROM DB TO LOGIN
router.post('/login', 
  userController.login,
  userController.setSSIDCookie,
  (err, res, req) => {
    res.status(200).send(res.locals);
  }
);

// VERIFY IF USER IS LOGGED IN
router.get('/isLoggedIn', 
  userController.isLoggedIn, 
  (err, res, req) => {
    res.status(200).json(res.locals);
});

// DELETE COOKIES WHEN USER SIGNOUT
router.get('/signout', 
  (err, req, res) => {
    res.clearCookie('ssid');
    res.send('cookie ssid cleared');
})

// -----------------------------------------------------------------------------------------------

// ----------------------------------- ALERTS CONTROLLER -----------------------------------------

// CREATE NEW ALERTS 
router.post('/addAlert', 
  alertsController.addAlert, 
  (err, res, req) => {
    res.status(200).send(res.locals);
});

// READ (GET) ALERTS INFO
router.get('/getAlerts',
  alertsController.getAlerts,
  (err, res, req) => {
    res.status(200).send(res.locals);
});

// DELETE ALERTS FROM USERS DB
router.delete('/deleteAlert',
  alertsController.deleteAlert,
  (err, res, req) => {
    res.status(200).send(res.locals);
});

// user's alerts: Array<string>
// alert = "STATION #72 IS LOW CAPACITY (<25%)" - target MVP
// alert = "STATION #86 IS OUT OF EBIKES (0/4)"
// alert = "STATION #23 HAS LOW DOCK CAPACITY (<25%)"
// alert = "STATION #62 IS OUT OF SERVICE"

// -----------------------------------------------------------------------------------------------

// ---------------------------- FAVORITE STATIONS CONTROLLER -------------------------------------

// CREATE NEW FAVORITE STATIONS 
router.post('/addFavStation', 
  favoritesController.addFavStation, 
  (err, res, req) => {
    res.status(200).send(res.locals);
  }
);

// READ (GET) FAVORITE STATIONS INFO
router.get('/getFavStations', 
  favoritesController.getFavStations, 
  (err, res, req) => {
  res.status(200).send(res.locals);
  }
);

// DELETE FAVORITE STATIONS FROM USERS DB
router.delete('/deleteFavStations', 
  favoritesController.deleteFavStations, 
  (err, res, req) => {
  res.status(200).send(res.locals);
  }
);

// -----------------------------------------------------------------------------------------------


module.exports = router;