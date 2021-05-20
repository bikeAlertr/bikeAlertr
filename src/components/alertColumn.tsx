import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context";

const Alerts = () => {
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
            <div>
              Station {stations.station_id} is running low on Bikes as of {lastUpdated()}
            </div>
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
    <div>
      <h1>Alert Column</h1>
      {alertArray}
    </div>
  );
};

export default Alerts;
