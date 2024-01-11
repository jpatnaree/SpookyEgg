
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import Add from './pages/Add';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Map from './pages/Map';
import SignUp from './pages/Signup';
import SingleUser from './pages/Single_user';
import UserInfo from './pages/User_info';


function App() {

  const [allReviews, setAllReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const POST_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  
  useEffect(() => {
    fetch(`/api/check_session`)
    .then(response => {
      if (response.ok) {
        response.json()
        .then(userData => {setCurrentUser(userData)})
      } 
    })
    
  },[])
  // console.log(currentUser)

  useEffect(()=> {
    fetch(`/api/reviews`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      setAllReviews(data)
    })
  },[])

    // SIGNUP //
    async function attemptSignup(userInfo) {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: POST_HEADERS,
        body: JSON.stringify(userInfo)
      })
      if (res.ok) {
        const data = await res.json()
        setCurrentUser(data)
      } else {
        alert('Invalid sign up')
      }
    }
  
    // LOGIN //
    async function attemptLogin(userInfo) {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: POST_HEADERS,
        body: JSON.stringify(userInfo)
      })
      if (res.ok) {
        const data = await res.json()
        setCurrentUser(data)
      } else {
        alert('Email or password is incorrect')
      }
    }
  
    // LOGOUT //
    function logout() {
      console.log("Attempting null value setter call.")
      setCurrentUser(null)
      console.log("Setter for current user successfully called with null value set.")
      console.log("Attempting fetch to backend logout route with DELETE method.")
      fetch('/api/logout', { method: "DELETE" })
      console.log("Fetch (DELETE) for logout successfully called.")
    }




  const routes = [
    {
      path: "/",
      element: <Login attemptLogin={attemptLogin} currentUser={currentUser} />
    },
    {
      path: "/signup",
      element: <SignUp attemptSignup={attemptSignup} currentUser={currentUser}/>
    },
    {
      path: "/logout",
      element: <Logout logout={logout} currentUser={currentUser} />
    },
    {
      path: "/home",
      element: <Home allReviews={allReviews} setAllReviews={setAllReviews} currentUser={currentUser} />
    },
    {
      path: "/add",
      element: <Add currentUser={currentUser} allReviews={allReviews} setAllReviews={setAllReviews} />
    },
    {
      path: "/map",
      element: <Map currentUser={currentUser} />
    },
    {
      path: "/user_info",
      element: <UserInfo currentUser={currentUser} />
    },
    {
      path: "/user_info/:id",
      element: <SingleUser allReviews={allReviews} currentUser={currentUser} />,
    }

  ]

  const router = createBrowserRouter(routes)

  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
