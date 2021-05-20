import React, { useState, useContext, useEffect } from "react";
import Alerts from "./alertColumn";
import { AuthContext } from "./context/Auth.context";
import FavoritesTable from "./favoritesTable";
import StationsTable from "./stationsTable";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  let date = new Date();
  
  // useEffect to get userid from the cookie to set user



  return (
    <div>
      <h1>Dashboard</h1>
      <h3>{`Welcome ${user.firstname}`}</h3>
      <h5>{`The date is ${date.toDateString()}`}</h5>
      <h5>{`The time is ${date.toTimeString()}`}</h5>
      FAVORITES TABLE
      <FavoritesTable /> 

      STATIONS TABLE
      <StationsTable />

      ALERT COLUMN
      <Alerts />
    </div>
  );
};

export default Dashboard;
