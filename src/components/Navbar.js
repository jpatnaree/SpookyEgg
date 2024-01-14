import { NavLink } from "react-router-dom";
function NavBar() {
    return (
      <>
      {/* <Header /> */}
      <div className="navbar">
        <NavLink to="/home"><img id="nav-logo" src="https://i.imgur.com/YEeLS17.png" alt='logo' /></NavLink>
        {/* <NavLink to="/home">Home</NavLink> */}
        <NavLink to="/map">Map View</NavLink>
        <NavLink to="/add">Share Your Experience</NavLink>
        <NavLink to="/user_info">Post History</NavLink>
        <NavLink to="/logout">Log out</NavLink>
      </div>
      </>
    );
  }
  
  export default NavBar;