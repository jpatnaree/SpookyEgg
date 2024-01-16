import 'mapbox-gl/dist/mapbox-gl.css';
import * as React from 'react';
import Map, { FullscreenControl, Marker, Popup } from 'react-map-gl';
import NavBar from "../components/Navbar";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Mappage({allLocations, allReviews, currentUser}) {

  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(false)
  const [clickedLocation, setClickedLocation] = useState(null)

  function handleIsClicked(id) {
    setIsClicked(() => !isClicked);
    setClickedLocation(id)
  }

  console.log(clickedLocation)



    const allPointers = allLocations.map(location => {
      return <Marker longitude={location.longtitude} latitude={location.latitude} anchor="bottom" 
      onClick={() => handleIsClicked(location.id)} >
        <img id='pin' src="https://i.imgur.com/Ah0UqEO.png" alt='pin'/>
    </Marker>
    })



    const locationPopup = allLocations.map(location => {
      return <Popup longitude={location.longtitude} latitude={location.latitude}
      anchor="top"
      >
      <button id='add'><Link to={`/add`}><img src='https://i.imgur.com/5HKEIz0.png' alt='add'/></Link></button>
      <label id='mapname'>{location.name}</label> <br/>

    </Popup>
    })


    const reviewedPopups = allReviews.map((review) =>{

      return <>
            <Popup longitude={review.location.longtitude} latitude={review.location.latitude}
            anchor="top"
            >
              {/* {review.location? locationPopup: null } */}
            {/* <label>{review.location.name}</label><br/> */}
            <label>Spookiness👻: {review.spooky_score}</label><br/>
            <label>Story {review.spooky_review}</label><br/>
            <label>Written by: {review.user.first_name} {review.user.last_name}</label><br/>
            <label>{review.date}</label>
          </Popup>
      </>
    })

    const displayMappage = <>
        <NavBar />

        <div className="map">
            <Map
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          initialViewState={{
            latitude: 40.748817,
            longitude: -73.985428,
            zoom: 14
          }}
          style={{width: "100svw", height: "100svh"}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {allPointers}
            {isClicked? locationPopup: reviewedPopups}
            {/* {locationPopup} */}
            <FullscreenControl />

          </Map>
    </div>
      </>



    return (
      <>
        {currentUser? displayMappage: navigate('/')}
      </>
    );
  }
  
  export default Mappage;