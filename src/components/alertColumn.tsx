import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context";

const Alerts = () => {
  // Favorite stations live in user object
  const { user, setUser } = useContext(AuthContext);

  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  useEffect(() => {
    createAlert();
  }, [user.favorites]);

  // Iterate over that data
  const alertArray = [];
  const createAlert = () => {
    if (user.favorites) {
      for (const favStation of user.favorites) {
        // Do some math, total docking ports / total bikes available
        // let percentAvailable = ((favStation.capacity / (favStation.num_available_ebikes + favStation.num_available_bikes)) * 100)
        let percentAvailable = 10;
        // if 25% or below, render an ALERT in return statment
        if (percentAvailable <= 25) {
          alertArray.push(
            <div>
              {favStation.name} is running low on Bikes as of {lastUpdated}
            </div>
          );
        }
      }
    }
  };

  return (
    <div>
      <h1>Alert Column</h1>
      {alertArray}
    </div>
  );
};

export default Alerts;
