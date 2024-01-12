import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import NavBar from "../components/Navbar";
import {useState} from 'react';


function Mappage() {



    return (
      <>
        <NavBar />
        <div className="map">
            <Map
          mapboxAccessToken="pk.eyJ1IjoicGF0bmFyZWUyMDA0IiwiYSI6ImNscjhvZ2RieDBtODEyanBjdWw3azF1amMifQ.bbXhmQ5av8Xj9Io8y9NnlQ"
          initialViewState={{
            longitude: -73.997402,
            latitude: 40.713206,
            zoom: 13
          }}
          style={{width: "86vw", height: "97vh"}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            
            <Marker longitude={-73.997402} latitude={40.713206} anchor="top" >
                  <img id="pin" src="https://i.imgur.com/itE68xa.png" alt='pin' />
            </Marker>


          </Map>
    </div>
      </>
    );
  }
  
  export default Mappage;