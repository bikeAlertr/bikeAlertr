import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 

const StationsTable = () => {
  const { user, setUser } = useContext(AuthContext);
  const [stations, setStations] = useState({ data: [] });

  // Write useEffect to call getFavorites on page load
  useEffect( () => {
    getStations();
  });

  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  const getStations = () => {
    // Iterate through the JSON object from the DB
    // Retrieve the required data
    fetch(`/stations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("stations", stations);
        setStations(data);
      });

    lastUpdated(); // to store the time of this fetch req
    stationRowCreator();
  };


  const favStation = (e) => {
    // Send a PUT req to server to add specified Station to Favorites Table
    fetch(`/user/addFav}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e.target.value)
    })
  }

  const trFromDB = []; // necessary to keep in global scope
  const stationRowCreator = () => {

    for (const station of stations.data) {
      const tr = (
        <tr id={station.name}>
          <td>{station.station_status}</td>
          <td>{station.name}</td>
          <td>{station.num_available_bikes}</td>
          <td>{station.num_available_ebikes}</td>
          <td>{station.stationName}</td>
          <td>{lastUpdated}</td>
          <td><button id={station.name} onClick={favStation}>Favorite</button></td>
        </tr>
      );
      trFromDB.push(tr);
    }
    return trFromDB;
  };

  return (
    <div>
      <table>
        <tr>
          <th>Status</th>
          <th>Station Location</th>
          <th>Bikes Available</th>
          <th>eBikes Available</th>
          <th>Last Updated</th>
          <th>Add Favorite</th>
        </tr>
        {trFromDB}
      </table>
    </div>
  );
};

export default StationsTable;
