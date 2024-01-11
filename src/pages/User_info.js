import NavBar from "../components/Navbar";
import UserReview from "../components/User_review";



function UserInfo({currentUser}) {

  const display_reviews = currentUser.reviews.map(review => {
    return(
      <div className="review-box" key={review.id}>
        
      
      <h4>Title: {review.title}</h4>
      <h4>Location: {review.location.name}</h4>
          <h4 id='tabtab'>● Spookiness</h4>
          <h4 >rating: {review.spooky_score}</h4>
          {review.image ? <img src={review.image} alt={review.id} /> : null}
          <h4 >{review.spooky_review}</h4>
          <h4 id='tabtab'>● Hospitality</h4>
          <h4 >rating: {review.hospitality_score}</h4>
          <h4 >{review.hospitality_review}</h4>
          <h6>Posted: {review.date}</h6>
  </div>
    )
  })
  console.log(currentUser.reviews);
    
  return (
      <>
      <NavBar />
      {currentUser?
        <div>
          <div className="add-box">
            {currentUser.image? <img src={currentUser.image} id='user-avatar' alt='user avatar'/>: null}
            <h2>{currentUser.first_name} {currentUser.last_name}</h2>
            <h3>Your post history: </h3>
            </div>
        {display_reviews? display_reviews: null}
      </div> : null}
      </>
    );
  }
  
  export default UserInfo;