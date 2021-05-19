const express = require('express');

const stationController = require('../controllers/stationController.js')

const router = express.Router();


router.get('/addStationInfo', 
 stationController.addStationInfo, (err, res, req) => {
  res.status(200).json('Successfully got the station info!');
}
);

router.get('/test',
  (err, res, req) => {
    console.log('asyncronous!');
    res.status(200).json('Successfully got the asyncronous call!');
  }
);

router.get('/updateStation', () => {setInterval(()=>{stationController.updateStations}, 10000)}, 
(err, res, req) => {
  res.status(200).json('Successfully updated the SQL Table!')
}
)

module.exports = router;