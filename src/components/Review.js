import { useState } from "react";
import {  Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Review({review, currentUser, allComments, setAllComments, allReview}) {

    const checkUser = currentUser.id === review.user_id? `/user_info`: `/user_info/${review.user_id}`;
    const [submittedForm, setSubmittedForm] = useState(false);
    const [newReview, setNewReview] = useState({
        content: '',
        review_id: review.id,
        poster_id: currentUser.id
    })
    const navigate = useNavigate()

    if(submittedForm){
        navigate('/home')
    }

    function handleInput(e) {
        const {name, value} = e.target
        setNewReview({...newReview, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/api/comments`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(newReview)
        })
        .then(resp => resp.json())
        .then(newData => {
            setAllComments([...allComments, newData])
            console.log(allComments)
        })
        }


    return(
        <>
        <div className='review-box'>
            <div className='user-review'>
                <Link to={checkUser}><img id='avatar_home' src={review.user.image} alt={review.user.id} /></Link>
                <h4>{review.user.first_name} {review.user.last_name}</h4>
            </div>
            <div className='review-content'>
                <h2>{review.title}</h2>
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
            </div>
            <div className="reply-box">
                <form 
                    onSubmit={(e)=>{
                    handleSubmit(e)
                    setSubmittedForm(true)
                    }}
                >
                    <label>↪ Reply </label>
                    <input onChange={handleInput} type="text" name="content" />
                    <button type="submit">Send</button>
                </form>
            </div>
            </>
    )
}
export default Review;