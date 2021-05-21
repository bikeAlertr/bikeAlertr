import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "./context/Auth.context"; 

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StationsTable = (props) => {
  const classes = useStyles();

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
          <TableRow key={stations.data[i].station_id} id={stations.data[i].station_id}>
            <TableCell>{stations.data[i].station_status}</TableCell>
            <TableCell>{stations.data[i].name}</TableCell>
            <TableCell>{stations.data[i].num_available_bikes}</TableCell>
            <TableCell>{stations.data[i].num_available_ebikes}</TableCell>
            <TableCell>{lastUpdated()}</TableCell>
            <TableCell>
              <Button variant="contained" color="primary" id={stations.data[i].station_id} value={stations.data[i].station_id} onClick={favStation}>
                Favorite
              </Button>
            </TableCell>
          </TableRow>
        );
        // trFromDB.push(tr);
       
      }
      // console.log('this is tr from db', trFromDB);
      return trFromDB;      
    }
  };

  stationRowCreator(stations);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="stations table">
      <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Station Location</TableCell>
            <TableCell align="center">Bikes Available</TableCell>
            <TableCell align="center">eBikes Available</TableCell>
            <TableCell align="center">Last Updated</TableCell>
            <TableCell align="center">Delete Favorite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trFromDB}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StationsTable;
