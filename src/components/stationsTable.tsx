import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 


const StationsTable = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [stations, setStations] = useState({});

  // Write useEffect to call getFavorites on page load
  // useEffect( () => {
    
  //   let data: any = stations;
  //   console.log("data.data in the useEffecthook is: ", data.data);
  //   stationRowCreator(data);

  //   // stationsTable();
  // }, []);
  
  useEffect( () => {
    // console.log('this is user in stationstable.tsx', user);
    // console.log('stations in useeffect', stations)
    getStations()
  }, []);

  // Function that creates a timestamp when called
  const lastUpdated = () => {
    let time = new Date();
    return time.toTimeString();
  };

  const getStations = () => {
    // Retrieve the required data
    fetch(`/api/stations`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('res.locals after getstations is', data );
        setStations({...stations, data})
        // console.log("stations", stations);
      });

    // to store the time of this fetch req  
    lastUpdated(); 
  };


  const favStation = (e) => {
    // Send a PUT req to server to add specified Station to Favorites Table
    fetch(`/api/addFavStation`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        'station_id': e.target.value,
      })
    }).then( data => {
      props.setFavorites(data);
    })
  }

  const trFromDB = []; // necessary to keep in global scope
  const stationRowCreator = async (stations) => {
    // console.log('this is stations in row creator', stations.data)
    if (Array.isArray(stations.data)) {
      // console.log(stations.data.length)
      for (let i = 0; i < stations.data.length; i++) {
        trFromDB.push(
          <tr id={stations.data[i].station_id}>
            <td>{stations.data[i].station_status}</td>
            <td>{stations.data[i].name}</td>
            <td>{stations.data[i].num_available_bikes}</td>
            <td>{stations.data[i].num_available_ebikes}</td>
            <td>{lastUpdated()}</td>
            <td><button id={stations.data[i].station_id} value={stations.data[i].station_id} onClick={favStation}>Favorite</button></td>
          </tr>
        );
        // trFromDB.push(tr);
       
      }
      // console.log('this is tr from db', trFromDB);
      return trFromDB;      
    }
  };

  stationRowCreator(stations);

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
