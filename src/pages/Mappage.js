import * as React from 'react';
import Map, { FullscreenControl, Marker } from 'react-map-gl';
import NavBar from "../components/Navbar";


function Mappage() {



    return (
      <>
        <NavBar />
        <div className="map">
            <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          initialViewState={{
            longitude: -73.997402,
            latitude: 40.713206,
            zoom: 13
          }}
          style={{width: "86vw", height: "97vh"}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <FullscreenControl />
            <Marker longitude={-73.997402} latitude={40.713206} anchor="top" offsetLeft={40} offsetTop={40} >
                  <img id="pin" src="https://i.imgur.com/itE68xa.png" alt='pin' />
            </Marker>


          </Map>
    </div>
      </>
    );
  }
  
  export default Mappage;