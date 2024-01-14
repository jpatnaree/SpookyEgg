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
            longitude: -74.014053,
            latitude: 40.705311,
            zoom: 13
          }}
          style={{width: "86vw", height: "97vh"}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker longitude={-74.014053} latitude={40.705311} anchor="top" offsetLeft={40} offsetTop={40} >
                  <img id="pin" src="https://i.imgur.com/itE68xa.png" alt='pin' />
            </Marker>
            <FullscreenControl />


          </Map>
    </div>
      </>
    );
  }
  
  export default Mappage;