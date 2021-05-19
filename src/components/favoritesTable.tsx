import React, { useState, useContext } from "react";
import { AuthContext } from "./context/Auth.context";

const FavoritesTable = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ data: [] });
  // Write a function that makes table rows with data from PostgreSQL DB

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
    favRowCreator();
  };

  const trFromDB = [];  // necessary to keep in global scope
  const favRowCreator = () => {
    for (const favStations of favorites.data) {
      const tr = (
        <tr>
          <td>{favStations.stationName}</td>
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
          <th>Station Locations</th>
          <th>Bikes Available</th>
          <th>Last Updated</th>
        </tr>
        {trFromDB}
      </table>
    </div>
  );
};

export default FavoritesTable;
