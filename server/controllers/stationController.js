const axios = require('axios');

const db = require('../models/stationModels');

const stationController = {};


stationController.addStationInfo = async (req, res, next) => {
  try {
    const stationData = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
    const statusData = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_status.json');
    // const { name, capacity, station_id, lat, lon } = stationData.data.data.stations[0];
    // console.log(statusData.data.data.stations.length);

    for (let i = 0; i < stationData.data.data.stations.length; i++) {
      const { 
        station_id,
        capacity, 
        lon,
        lat
      } = stationData.data.data.stations[i];
      let { name } = stationData.data.data.stations[i];
      name = name.replace("'", "''");

      for (let j = 0; j < statusData.data.data.stations.length; j++) {
        if (statusData.data.data.stations[j].station_id === stationData.data.data.stations[i].station_id) {
          // console.log(statusElement.station_id);
          const { 
            num_ebikes_available,
            num_bikes_available,  
            num_docks_available,
            num_bikes_disabled,
            is_renting, 
            station_status, 
          } = statusData.data.data.stations[j];
          
          let addStationQuery = `INSERT INTO "public"."stations" (station_id, name, capacity, num_available_ebikes, num_available_bikes, num_docks_available, num_bikes_disabled, longitude, latitude, is_renting, station_status) 
          VALUES ('${station_id}', '${name}', '${capacity}', '${num_ebikes_available}', '${num_bikes_available}', '${num_docks_available}', '${num_bikes_disabled}', '${lon}', '${lat}', '${is_renting}', '${station_status}');`;
          
          res.locals = await db.query(addStationQuery);
        }
      }
    }

    console.log('done!')
    next();
  } catch (err) {
    next(err)
  }
  // console.log('inside of stationController');
  // next();
};

stationController.updateStations = async (req, res, next) => {
  try {
    const stationData = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_information.json');
    const statusData = await axios.get('https://gbfs.citibikenyc.com/gbfs/en/station_status.json');

    for (let i = 0; i < stationData.data.data.stations.length; i++) {
      const { 
        station_id,
        capacity, 
        lon,
        lat
      } = stationData.data.data.stations[i];
      let { name } = stationData.data.data.stations[i];
      name = name.replace("'", "''");

      for (let j = 0; j < statusData.data.data.stations.length; j++) {
        if (statusData.data.data.stations[j].station_id === stationData.data.data.stations[i].station_id) {
          // console.log(statusElement.station_id);
          const { 
            num_ebikes_available,
            num_bikes_available,  
            num_docks_available,
            num_bikes_disabled,
            is_renting, 
            station_status, 
          } = statusData.data.data.stations[j];
          
          let updateStationsQuery = `UPDATE "public"."stations"
          SET name = '${name}', capacity = '${capacity}', num_available_ebikes = '${num_available_ebikes}', 
          WHERE station_id = '${station_id}'`
          
          res.locals = await db.query(addStationQuery);
        }
      }
    }

    console.log('done!')
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = stationController;