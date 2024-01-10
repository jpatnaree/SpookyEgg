
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/home';
import Map from './pages/map';
import Add from './pages/add';
import Logout from './pages/logout';
import UserInfo from './pages/user_info';
import { useEffect, useState } from 'react';


function App() {

  const [allReviews, setAllReviews] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const POST_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  


  useEffect(()=> {
    fetch(`http://127.0.0.1:5555/api/reviews`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setAllReviews(data)
    })
  },[])

    // SIGNUP //
    async function attemptSignup(userInfo) {
      const res = await fetch('http://127.0.0.1:5555/api/users', {
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
      const res = await fetch('http://127.0.0.1:5555/api/login', {
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
      setCurrentUser(null)
      fetch('http://127.0.0.1:5555/api/logout', { method: "DELETE" })
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
      element: <Home allReviews={allReviews} currentUser={currentUser} />
    },
    {
      path: "/add",
      element: <Add currentUser={currentUser} />
    },
    {
      path: "/map",
      element: <Map currentUser={currentUser} />
    },
    {
      path: "/user_info",
      element: <UserInfo currentUser={currentUser} />
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
