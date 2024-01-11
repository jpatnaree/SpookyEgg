import { Link, useNavigate } from "react-router-dom";
import NavBar from '../components/Navbar';
import Review from '../components/Review';



function Home({allReviews, setAllReviews, currentUser}) {

  const navigate = useNavigate()

  
  
  const display_reviews = allReviews.map(review => {
    return <Review key={review.id} review={review} currentUser={currentUser} />
  })

  // sorting by date
  const sorting = allReviews.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });
  // console.log(sorting);
  
    return (
      <>
      <NavBar />
      <button id='add'><Link to={`/add`}><img src='https://i.imgur.com/5HKEIz0.png' alt='add'/></Link></button>
      {currentUser? display_reviews: navigate('/')}
      </>
    );
  }
  
  export default Home;