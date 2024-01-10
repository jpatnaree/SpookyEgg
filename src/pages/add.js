import NavBar from "../components/navbar";

function Add() {
    return (
      <>
      <NavBar />
      <div>
        <form className='add-box'>
        <h1>Share your story</h1>
        <input type="text" name="location" placeholder="*Location" /><br/>
        <input type="text" name="title" placeholder="Title" /><br/>
        <input type="number" name='s_score' min="1" max="5" placeholder="* Spooky Score - enter number between 1 - 5"/><br/>
        <textarea id='review-box' type="text" name="s_review" placeholder="Spooky Review" /><br/>
        <input type="number" name='h_socre' min="1" max="5" placeholder="Hospitality Score - enter number between 1 - 5"/><br/>
        <textarea id='review-box' type="text" name="h_review" placeholder='Hospitality Review' /><br/>
        <input type="text" name="image" placeholder="Image Url" /><br/>
        <label id='upload'>Or:</label>
        <input id='upload-input' type="file" name="avatar" placeholder="Display image or image url" /> <br/>
        <button type="submit">Add</button>
        </form>

      </div>

      </>
    );
  }
  
  export default Add;