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

const FavoritesTable = (props) => {
  const classes = useStyles();

  const { user, setUser } = useContext(AuthContext);
  // const [favorites, setFavorites] = useState({ data: [] });
  // const [test, setTest] = useState(props.favorites)

  // Write useEffect to call getFavorites on page load
  useEffect( () => {
    // getFavorites();
    // console.log('the user in favoritestable is: ', user);

    // getFavorites();
    // console.log('the favorites useState is: ', favorites);

    lastUpdated(); // to store the time of this fetch req
    // favRowCreator();
    getFavorites();
    
  }, [props.favorites]);

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
        props.setFavorites(data);
        // Update context with favorites to share with alerts component
        setUser(...user, props.favorites);
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
    // document.getElementById(e.target.value).remove();
  }

  const addAlert = (e) => {
    // Send a PUT req to server to add specified Station to Favorites Table
    fetch(`/api/addAlert`, {
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
  const favRowCreator = (favorites) => {
    if (Array.isArray(favorites)) {
      for (const favStations of favorites) {
        const tr = (
          
          <TableRow key={favStations.station_id} id={favStations.station_id}>
            <TableCell>{favStations.station_status}</TableCell>
            <TableCell >{favStations.name}</TableCell>
            <TableCell >{favStations.num_available_bikes}</TableCell>
            <TableCell >{favStations.num_available_ebikes}</TableCell>
            <TableCell >{lastUpdated()}</TableCell>
            <TableCell >
              <Button variant="contained" color="primary" id={favStations.station_id} value={favStations.station_id} onClick={deleteFav}>
                Delete
              </Button>
            </TableCell >
            <TableCell >
              <Button variant="contained" color="primary" id={favStations.station_id} value={favStations.station_id} onClick={addAlert}>
                Add Alert
              </Button>
            </TableCell >
          </TableRow>
          // Need to add a delete button to each Table Row (use onClick to invoke a delete func that will send a delete req to server)
        );
        trFromDB.push(tr);
      }
      return trFromDB;
    }
  };

  favRowCreator(props.favorites);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="favorites table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Station Location</TableCell>
            <TableCell align="center">Bikes Available</TableCell>
            <TableCell align="center">eBikes Available</TableCell>
            <TableCell align="center">Last Updated</TableCell>
            <TableCell align="center">Delete Favorite</TableCell>
            <TableCell align="center">Add Alert</TableCell>
          </TableRow>
        </TableHead>
        {/* <tr>
          <th>Status</th>
          <th>Station Location</th>
          <th>Bikes Available</th>
          <th>eBikes Available</th>
          <th>Last Updated</th>
          <th>Delete Favorite</th>
          <th>Add Alert</th>
        </tr> */}
        <TableBody>
          {trFromDB}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FavoritesTable;
