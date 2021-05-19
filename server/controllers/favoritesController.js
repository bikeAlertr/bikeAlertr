const axios = require('axios');

const db = require('../models/bikersdbModels');

const favoritesController = {};

// CREATE NEW FAVORITE STATIONS 
favoritesController.addFavStation = async (req, res, next) => {
  try {
    // deconstruct station_id from request body
    const {station_id} = req.body;
    //create query to push new favorite station into users table
    let favQuery = `UPDATE "public"."users" SET favorite_station = favorite_station || '{${station_id}}' WHERE user_id='${req.cookies.ssid}';`
    res.locals = await db.query(favQuery);
    // console.log('successfully added to favstations!');
    next();
  } catch {
    // console.log('an error occurred adding to favstations');
    next();
  }
};

// READ (GET) FAVORITE STATIONS INFO
favoritesController.getFavStations = async (req, res, next) => {
  try {
    // create query to get the favorite_station array and assign to a const
    let favStationsQuery = `SELECT favorite_station FROM "public"."users" WHERE user_id='${req.cookies.ssid}';`;
    const favStations = await db.query(favStationsQuery);
    // console.log(favStations.rows[0].favorite_station);

    const favoriteStations = await favStations.rows[0].favorite_station;
    // console.log('User_id=10s favoriteStations is: ', favoriteStations);

    // initialize an stationdata array to return to the frontend
    const stationDataArray = [];

    // iterate through favStation array to retrieve relevant data from stations table
    for (let i = 0; i < favoriteStations.length; i++) {
      let favStationQuery = `SELECT * FROM "public"."stations" WHERE station_id='${favoriteStations[i]}'`;
      let stationElement = await db.query(favStationQuery);
      // console.log('the stationElement is: ', stationElement)
      stationDataArray.push(stationElement.rows[0]);
    }

    console.log('stationDataArray is: ', stationDataArray);

    res.locals = stationDataArray;
    next();
  } catch {
    next();
  }
};

// DELETE FAVORITE STATIONS FROM USERS DB
favoritesController.deleteFavStations = async (req, res, next) => {
  try {
    // deconstruct station_id from request body
    const {station_id} = req.body;
    // create query to delete station from favorite_station array
    let delFavStationQuery = `UPDATE "public"."users" SET favorite_station = array_remove(favorite_station, '${station_id}') WHERE user_id='${req.cookies.ssid}'`;
    res.locals = await db.query(delFavStationQuery);
    next();
  } catch {
    next();
  }
};


module.exports = favoritesController;