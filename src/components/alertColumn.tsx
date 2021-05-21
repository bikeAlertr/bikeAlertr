import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Alerts = () => {
  const classes = useStyles();

  // Favorite stations live in user object
  const { user, setUser } = useContext(AuthContext);
  const [ alerts, setAlerts ] = useState([]);
  // const [test, setTest] = useState([]);

  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  useEffect(() => {
    // let usersAlerts = user.alerts
    // setAlerts(user.alerts);
    getAlerts();
  }, [alerts]);

  // useEffect(() => {
  //   console.log('The alerts in useEffect after getAlerts are: ',alerts);
  // }, [])

  const getAlerts = () => {
    // Iterate through the JSON object from the DB
    // Retrieve the required data
    fetch(`/api/getAlerts`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update local favorites state with data from server
        setAlerts(data);
        // Update context with favorites to share with alerts component
        // setUser(...user, data);
        // console.log('The alerts in useEffect after getAlerts are: ',alerts)
      });

    // lastUpdated(); // to store the time of this fetch req
    // favRowCreator();
  };


  // Iterate over that data
  const alertArray = [];
  const createAlert = (alerts) => {
    if (alerts) {
      // console.log('this is our alerts in createAlert:', alerts)
      for (const stations of alerts) {
        // Do some math, total docking ports / total bikes available
        let percentAvailable = (((stations.num_available_ebikes + stations.num_available_bikes) / stations.capacity) * 100)
        // let percentAvailable = 10;
        // if 25% or below, render an ALERT in return statment
        if (percentAvailable <= 25) {
          alertArray.push(
            <TableRow key={stations.station_id}>
              <TableCell>
                Station {stations.station_id} is running low on Bikes as of {lastUpdated()}
              </TableCell>
            </TableRow>
          );
        }
      }
      return alertArray;
    }
  };

  // () => {console.log(alerts)};
  createAlert(alerts);
  // console.log(alertArray);
  
  return (
    <TableContainer component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Alert Column</TableCell>
        </TableRow>
      </TableHead>
      {/* <h1>Alert Column</h1> */}
      <TableBody>
        {alertArray}
      </TableBody>
    </TableContainer>
  );
};

export default Alerts;
