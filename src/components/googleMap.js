import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.797873,
  lng: -73.919965
};

function EasyGoogleMap() {
  const [stations, setStations] = useState({});
  
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
          genMarkers.push(<Marker key={el.station_id} position={location} />)
        }
      }
    }

    makeMarkers(stations);

  return (
    <LoadScript
      googleMapsApiKey='AIzaSyD2ZffsCApDOBPuCAPAEpHmoJUClvr74Gg'
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        {genMarkers}
        
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(EasyGoogleMap);
