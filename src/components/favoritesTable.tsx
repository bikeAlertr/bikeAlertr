import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 

const FavoritesTable = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ data: [] });

  // Write useEffect to call getFavorites on page load
  useEffect( () => {
    getFavorites();
  });

  // Function that creates a timestamp when called
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


  const deleteFav = (e) => {
    // Remove the HTML table row from the DOM
    document.getElementById(e.target.value).remove();

    // Send a delete request to server to delete the specified favorite from the User's fav table in DB
    fetch(`/user/${e.target.value}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
  }

  const trFromDB = []; // necessary to keep in global scope
  const favRowCreator = () => {

    for (const favStations of favorites.data) {
      const tr = (
        <tr id={favStations.name}>
          <td>{favStations.station_status}</td>
          <td>{favStations.name}</td>
          <td>{favStations.num_available_bikes}</td>
          <td>{favStations.num_available_ebikes}</td>
          <td>{favStations.stationName}</td>
          <td>{lastUpdated}</td>
          <td><button id={favStations.name} onClick={deleteFav}>Delete</button></td>
        </tr>
        // Need to add a delete button to each Table Row (use onClick to invoke a delete func that will send a delete req to server)
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
          <th>Delete Favorite</th>
        </tr>
        {trFromDB}
      </table>
    </div>
  );
};

export default FavoritesTable;
