import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/navbar';
import Review from '../components/review';



function Home({allReviews, currentUser}) {



    const display_reviews = allReviews.map(review => {
      return <Review key={review.id} review={review} />
    })
  
    return (
      <>
      <NavBar />
      <button id='add'><Link to={`/add`}><img src='https://i.imgur.com/5HKEIz0.png' alt='add'/></Link></button>
      {display_reviews}
      </>
    );
  }
  
  export default Home;