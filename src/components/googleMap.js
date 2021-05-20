import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
=======
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
>>>>>>> 84d0cb6ecbbce71bb1076cd31292cb85344f033d

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.797873,
  lng: -73.919965
};

function EasyGoogleMap(props) {

  const [stations, setStations] = useState({});
  const [selected, setSelected] = useState({});

  useEffect( () => {
    getStations()
  }, []);

  const getStations = () => {
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
    };

    const markerClick = (dock) => {
      console.log('this is marker dock', dock)
      setSelected(dock);
      // const test = selected;
      // console.log('this is selected in gm', test)
    }

    const genMarkers = []
    const makeMarkers = (stations) => {
      console.log('in makemarkers stations', stations.data)
      if (Array.isArray(stations.data)) {
        for (let el of stations.data) {
          const location = {
            lat: +el.latitude,
            lng: +el.longitude
          };
          console.log('this is latittuuuude', location)
          genMarkers.push(<Marker key={el.station_id} position={location} onClick={()=>markerClick(el)}/>)
        }
      }
    }

    makeMarkers(stations);


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

  return (
    <LoadScript
<<<<<<< HEAD
      googleMapsApiKey='AIzaSyD2ZffsCApDOBPuCAPAEpHmoJUClvr74Gg'
=======
      googleMapsApiKey='API KEY'
>>>>>>> 84d0cb6ecbbce71bb1076cd31292cb85344f033d
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {genMarkers}
<<<<<<< HEAD
        
=======
        {
          selected.station_id && 
          (
            <InfoWindow
            position={{
              lat: +selected.latitude,
              lng: +selected.longitude
            }}
            clickable={true}
            onCloseClick={() => setSelected({})}
          >
            <div>
              <p>Station: {selected.name}</p>
              <p>Station Status: {selected.station_status}</p>
              <p>Capacity: {selected.capacity}</p>
              <p>Available Bikes: {selected.num_available_bikes}</p>
              <p>Available E-Bikes: {selected.num_available_ebikes}</p>
              <button value={selected.station_id} onClick={(e)=>{favStation(e)}}>Add Favorite</button> 
            </div>
            
          </InfoWindow>
          )
         }
>>>>>>> 84d0cb6ecbbce71bb1076cd31292cb85344f033d
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(EasyGoogleMap);
