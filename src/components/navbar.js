import {NavLink} from "react-router-dom"
import Header from "./header";
function NavBar() {
    return (
      <>
      {/* <Header /> */}
      <div className="navbar">
        <img src="https://i.imgur.com/YEeLS17.png" alt='logo' />
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/map">Map View</NavLink>
        <NavLink to="/add">Share Your Experience</NavLink>
        <NavLink to="/user_info">User Info</NavLink>
        <NavLink to="/logout">Log out</NavLink>
      </div>
      </>
    );
  }
  
  export default NavBar;