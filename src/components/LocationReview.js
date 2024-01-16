import { useParams } from "react-router";


function LocationReview({review}) {



    return(
        <div className="review-box">
        
        <h4>Title: {review.title}</h4>
        {/* <h4>Location: {review.location.name}</h4> */}
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
}

export default LocationReview;