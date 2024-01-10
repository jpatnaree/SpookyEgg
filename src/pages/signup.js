import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';

function SignUp({ attemptSignup, currentUser }) {

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
    password: ''
});

const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
}

const handleSubmit = (e) => {
    e.preventDefault();
    attemptSignup(userInfo);
    navigate('/');
}

    return (
      <>
      <div className='signup-box'>
      <img id='logo' src='https://i.imgur.com/amwkB4H.png' alt='logo'/>
        <h3>Sign up for Spooky Egg</h3>
        <form
        onSubmit={(e)=>{
          handleSubmit(e)
          navigate('/login')
      }}
        >
        <input type="text" onChange={handleChange} name="first_name" placeholder="First name" /><br/>
        <input type="text" onChange={handleChange} name="last_name" placeholder="Last name" /><br/>
        <input type="text" onChange={handleChange} name="image" placeholder="Display Profile Picture Url" /><br/>
        <label id='upload'>Or: </label>
        <input id='upload-input' onChange={handleChange} type="file" name="image" placeholder="Display image or image url" /> <br/>
        <input type="text" onChange={handleChange} name="email" placeholder="Email" /><br/>
        <input type="password" onChange={handleChange} name="password" placeholder="Password" /><br/>
        
        <button type="submit">Create account</button>
        </form>
        <h4>Already have an account? <Link to={`/`}>Log in!</Link> </h4>

      </div>
      </>
    );
  }
  
  export default SignUp;