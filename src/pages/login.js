import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


function Login({attemptLogin, currentUser}) {

  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email:'',
      password: ''
  })

  function handleChange(e) {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
      e.preventDefault()
      console.log(userInfo)
      attemptLogin(userInfo)
      setClicked(true)
  }

  function handleclick(){
      navigate('/home')
  }

    return (

      <div className="login-box">
          <img id='login-logo' src='https://i.imgur.com/amwkB4H.png' alt='logo'/>
          {clicked && currentUser ? 
            (<>
            <h3>Welcome to Spooky Egg!</h3>
            <button id='yesbtn' onClick={handleclick}>Let's Go!</button>
            </>)
            :
            (<>
            <h3>Log in to continue</h3>
            <form 
            onSubmit={(e)=>{
              handleSubmit(e)
              setClicked(true)
          }}
            >
                <input onChange={handleChange} type="text" name="email" placeholder="Email Address" /><br/>
                <input onChange={handleChange} type="password" name="password" placeholder="Password" /><br/>
                <button type="submit">Log in</button>
            </form>
            <h4>Do not have an account? <Link to={`/signup`}>Sign up here!</Link> </h4>
          </>)
        }
        </div>
    );
  }
  
  export default Login;