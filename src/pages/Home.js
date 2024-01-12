import { Link, useNavigate } from "react-router-dom";
import NavBar from '../components/Navbar';
import Review from '../components/Review';
// import Comment from "./Comment";



function Home({allReviews, setAllReviews, currentUser, allComments, setAllComments}) {

  const navigate = useNavigate()

  
  
  const display_reviews = allReviews.map(review => {
    return <Review key={review.id} review={review} currentUser={currentUser} allComments={allComments} setAllComments={setAllComments} />
  })

  // sorting by date
  const sorting = allReviews.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date);
  });

  const reviewId = allReviews.map( review => review.id)

  console.log(reviewId);

//   const commentList = allReviews.comment.map(comment => {
//     if (comment.review_id === .id) {
//         return <Comment key={comment.id} comment={comment} />
//     }
// })

  
    return (
      <>
      <NavBar />
      <button id='add'><Link to={`/add`}><img src='https://i.imgur.com/5HKEIz0.png' alt='add'/></Link></button>
      {currentUser? display_reviews: navigate('/')}
      </>
    );
  }
  
  export default Home;