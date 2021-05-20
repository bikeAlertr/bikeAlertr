import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 

const StationsTable = () => {
  // const { user, setUser } = useContext(AuthContext);
  const [stations, setStations] = useState({});
  const [test, setTest] = useState(0)
  // Write useEffect to call getFavorites on page load
  useEffect( () => {
    // console.log('this is user in stationstable.tsx', user);
    console.log('stations in useeffect', stations)
    stationRowCreator(stations);
  }, [stations]);


  useEffect( () => {
    // console.log('this is user in stationstable.tsx', user);
    console.log('stations in useeffect', stations)
    getStations()
  }, []);
  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  const getStations = () => {
    // Iterate through the JSON object from the DB
    // Retrieve the required data
    fetch(`/api/stations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('res.locals after getstations is', data );
        setStations({...stations, data})
        console.log("stations", stations);
      });

    lastUpdated(); // to store the time of this fetch req
    
  };


  const favStation = (e) => {
    // Send a PUT req to server to add specified Station to Favorites Table
    fetch(`/user/addFav`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e.target.value)
    })
  }

  const trFromDB = []; // necessary to keep in global scope
  const stationRowCreator = async (stations) => {
    console.log('this is stations in row creator', stations.data)
    if (Array.isArray(stations.data)) {
      console.log(stations.data.length)
      for (let i = 0; i < stations.data.length; i++) {
        trFromDB.push(
          <tr id={stations.data[i].station_id}>
            <td>{stations.data[i].station_status}</td>
            <td>{stations.data[i].name}</td>
            <td>{stations.data[i].num_available_bikes}</td>
            <td>{stations.data[i].num_available_ebikes}</td>
            <td>{stations.data[i].stationName}</td>
            <td>{lastUpdated()}</td>
            <td><button id={stations.data[i].station_id} onClick={favStation}>Favorite</button></td>
          </tr>
        );
        // trFromDB.push(tr);
       
      }
      console.log('this is tr from db', trFromDB);
      return trFromDB;      
    }
  };

  useEffect( () => {
    // console.log('this is user in stationstable.tsx', user);
    console.log('RENDERED AGAIN')
  }, [stationRowCreator]);

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
        {console.log('in return', trFromDB)}
        {trFromDB}
      </table>
    </div>
  );
};

export default StationsTable;
