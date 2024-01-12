import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

function Add({currentUser , setAllReviews , allReviews}) {

  const [submittedForm, setSubmittedForm] = useState(false)

  const [newReview, setNewReview] = useState({
    location_name: '',
    title: '',
    spooky_score: null,
    spooky_review: '',
    hospitality_socre: null,
    hospitality_review: '',
    image: null,
    user_id: currentUser.id
  })

  const navigate = useNavigate()

  if(submittedForm){
    navigate('/home')
  }

  function handleInput(e) {
    const {name, value} = e.target
    if (name === "spooky_score" || name === "hospitality_score" ) {
      setNewReview({...newReview, [name]: Number(value)})
    }else {
      setNewReview({...newReview, [name]: value})
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newReview)
    })
    .then(resp => resp.json())
    .then(newData => {
      console.log(setAllReviews([...allReviews, newData]))
      setAllReviews([...allReviews, newData])
      console.log(allReviews)
    })
  }


    return (
      
      <>
      <NavBar />
      {currentUser?       
      <div>
            <form className='add-box'
              onSubmit={(e)=>{
              handleSubmit(e)
              setSubmittedForm(true)}}
            >
                <h1>Share your story</h1>
                <input onChange={handleInput} type="text" name="location_name" placeholder="Location name *required" /><br/>
                <input onChange={handleInput} type="text" name="title" placeholder="Title" /><br/>
                <input onChange={handleInput} type="number" name='spooky_score' min="1" max="5" placeholder="Spooky Score - enter number between 1 - 5 *required"/><br/>
                <textarea onChange={handleInput} type="text" name="spooky_review" placeholder="Spooky Review *required" /><br/>
                <input onChange={handleInput} type="number" name='hospitality_score' min="1" max="5" placeholder="Hospitality Score - enter number between 1 - 5"/><br/>
                <textarea onChange={handleInput} type="text" name="hospitality_review" placeholder='Hospitality Review' /><br/>
                <input onChange={handleInput} type="text" name="image" placeholder="Image Url" /><br/>
                {/* <label id='upload'>Or:</label> */}
                {/* <input id='upload-input' type="file" name="image" placeholder="Display image or image url" /> <br/> */}
                <button type="submit">Add</button>
            </form>

      </div>: navigate('/')}

      </>
    );
  }
  
  export default Add;