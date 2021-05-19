import React, { useState, useContext } from "react";
import { AuthContext } from "./context/Auth.context";

const FavoritesTable = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ data: [] });
  // Write a function that makes table rows with data from PostgreSQL DB

  // Create a function to store the time everytime fetch is called

  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  const getFavorites = () => {
    // Iterate through the JSON object from the DB
    // Retrieve the required data
    fetch(`/user/favorites`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("favorites", favorites);
        setFavorites(data);
      });

    lastUpdated(); // to store the time of this fetch req
    favRowCreator();
  };

  const trFromDB = []; // necessary to keep in global scope
  const favRowCreator = () => {
    for (const favStations of favorites.data) {
      const tr = (
        <tr>
          <td>{favStations.station_status}</td>
          <td>{favStations.name}</td>
          <td>{favStations.num_available_bikes}</td>
          <td>{favStations.num_available_ebikes}</td>
          <td>{favStations.stationName}</td>
          <td>{lastUpdated}</td>
        </tr>
      );
      trFromDB.push(tr);
    }
    return trFromDB;
  };

  const stationsRowCreator = () => {};

  return (
    <div>
      <table>
        <tr>
          <th>Status</th>
          <th>Station Location</th>
          <th>Bikes Available</th>
          <th>eBikes Available</th>
          <th>Last Updated</th>
        </tr>
        {trFromDB}
      </table>
    </div>
  );
};

export default FavoritesTable;
