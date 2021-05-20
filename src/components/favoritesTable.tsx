import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 

const FavoritesTable = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ data: [] });

  // Write useEffect to call getFavorites on page load
  useEffect( () => {
    // getFavorites();
    // console.log('the user in favoritestable is: ', user);

    // getFavorites();
    // console.log('the favorites useState is: ', favorites);

    lastUpdated(); // to store the time of this fetch req
    // favRowCreator();
    getFavorites();
    
  }, []);

  // useEffect(() => {
  //   // console.log("favorites", favorites);
  // })


  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  const getFavorites = () => {
    // Iterate through the JSON object from the DB
    // Retrieve the required data
    fetch(`/api/getFavStations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // Update local favorites state with data from server
        setFavorites(data);
        // Update context with favorites to share with alerts component
        setUser(...user, favorites);
      });

    lastUpdated(); // to store the time of this fetch req
    // favRowCreator();
  };


  const deleteFav = (e) => {
    // Send a delete request to server to delete the specified favorite from the User's fav table in DB
    fetch(`/api/deleteFavStations`, {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        'station_id': e.target.value,
      })
    });

    // Remove the HTML table row from the DOM
    document.getElementById(e.target.value).remove();
  }

  const trFromDB = []; // necessary to keep in global scope
  const favRowCreator = (favorites) => {

    for (const favStations of favorites) {
      const tr = (
        <tr id={favStations.station_id}>
          <td>{favStations.station_status}</td>
          <td>{favStations.name}</td>
          <td>{favStations.num_available_bikes}</td>
          <td>{favStations.num_available_ebikes}</td>
          <td>{lastUpdated()}</td>
          <td><button id={favStations.station_id} value={favStations.station_id} onClick={deleteFav}>Delete</button></td>
        </tr>
        // Need to add a delete button to each Table Row (use onClick to invoke a delete func that will send a delete req to server)
      );
      trFromDB.push(tr);
    }
    return trFromDB;
  };

  favRowCreator(favorites);

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
