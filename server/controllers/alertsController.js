const axios = require('axios');

const db = require('../models/bikersdbModels');

const alertsController = {};

// CREATE NEW ALERTS
alertsController.addAlert = async (req, res, next) => {
  try {
    // deconstruct station_id from request body
    const {station_id} = req.body;
    //create query to push new favorite station into users table
    let addAlertQuery = `UPDATE "public"."users" SET alerts = alerts || '{${station_id}}' WHERE user_id='${req.cookies.ssid}';`
    res.locals = await db.query(addAlertQuery);
    // console.log('successfully added to favstations!');
    next();
  } catch {
    // console.log('an error occurred adding to favstations');
    next();
  }
};

// READ (GET) ALERTS INFO
alertsController.getAlerts = async (req, res, next) => {
  try {
    // create query to get the favorite_station array and assign to a const
    let getAlertsQuery = `SELECT alerts FROM "public"."users" WHERE user_id='${req.cookies.ssid}';`;
    const alertStations = await db.query(getAlertsQuery);
    // console.log(favStations.rows[0].favorite_station);

    const usersAlerts = await alertStations.rows[0].alerts;
    // console.log('User_id=10s favoriteStations is: ', favoriteStations);

    // initialize an stationdata array to return to the frontend
    const userAlertArray = [];

    // iterate through favStation array to retrieve relevant data from stations table
    for (let i = 0; i < usersAlerts.length; i++) {
      let alertStationQuery = `SELECT * FROM "public"."stations" WHERE station_id='${usersAlerts[i]}'`;
      let alertElement = await db.query(alertStationQuery);
      // console.log('the stationElement is: ', stationElement)
      userAlertArray.push(alertElement.rows[0]);
    }

    // console.log('userAlertArray is: ', userAlertArray);

    res.locals = userAlertArray;
    next();
  } catch {
    next();
  }
};


// DELETE ALERTS FROM USERS DB
alertsController.deleteAlert = async (req, res, next) => {
  try {
    // deconstruct station_id from request body
    const {station_id} = req.body;
    // create query to delete station from favorite_station array
    let delFavStationQuery = `UPDATE "public"."users" SET alerts = array_remove(alerts, '${station_id}') WHERE user_id='${req.cookies.ssid}'`;
    res.locals = await db.query(delFavStationQuery);
    next();
  } catch {
    next();
  }
};



module.exports = alertsController;