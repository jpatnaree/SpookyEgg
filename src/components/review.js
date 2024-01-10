
function Review({review}) {

    return(
        <div className='review-box'>
            <div className='user-review'>
                <img id='avatar_home' src={review.user.image} alt={review.user.id} />
                <h4>{review.user.first_name} {review.user.last_name}</h4>
            </div>
            <div className='review content'>
                <h3>{review.title}</h3>
                <h4>Location: {review.location.name}</h4>
                <h4>Spooky Score:{review.spooky_score}</h4>
                {review.image? <img src={review.image} alt={review.id} /> : null}
                <h4>{review.spooky_review}</h4>
                <h5>Posted on:{review.date}</h5>
            </div>
        </div>
    )
}
export default Review;