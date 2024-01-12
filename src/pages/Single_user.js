
import { useParams } from "react-router";
import UserReview from "../components/User_review";
import NavBar from "../components/Navbar";

function SingleUser({allReviews}) {

    const {id} = useParams()

    const allReview = allReviews.find(a => {
        return a.user_id === Number(id)
    })

    console.log(allReview)

    const target = allReview.user

    const filtered = allReviews.map(review => {
        if(Number(review.user_id) === Number(id)) {
            return <UserReview key={review.id} review={review} />
        }
    })

    console.log(filtered)

        
      return (
          <>
          <NavBar />
          <div className="add-box">
                {target.image? <img src={target.image} id='user-avatar' alt='user avatar'/>: null}
                <h2>{target.first_name} {target.last_name}</h2>
                <h3>Post history: </h3>

        </div>

            {filtered? filtered: null}
          </>
        );
      }


export default SingleUser;