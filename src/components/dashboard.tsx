import React, { useState, useContext, useEffect } from "react";
import Alerts from "./alertColumn";
import { AuthContext } from "./context/Auth.context";
import FavoritesTable from "./favoritesTable";
import StationsTable from "./stationsTable";
import EasyGoogleMap from "./googleMap";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ data: [] });

  let date = new Date();
  useEffect(() => {
    
    console.log('this is session storage data', data)
  })
  
  let data = JSON.parse(sessionStorage.getItem('user'));

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{`Welcome ${data.firstname}`}</h3>
      <h5>{`The date is ${date.toDateString()}`}</h5>
      <h5>{`The time is ${date.toTimeString()}`}</h5>

      <EasyGoogleMap setFavorites={setFavorites} favorites={favorites} />
      
      FAVORITES TABLE
      <FavoritesTable setFavorites={setFavorites} favorites={favorites} /> 

      STATIONS TABLE
      <StationsTable setFavorites={setFavorites} favorites={favorites} />

      ALERT COLUMN
      <Alerts />
    </div>
  );
};

export default Dashboard;
