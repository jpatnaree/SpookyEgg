import NavBar from "../components/navbar";



function UserInfo({currentUser}) {

  
    
    return (
      <>
      <NavBar />
      <div className="add-box">
        <img src={currentUser.image} id='user-avatar' alt='user avatar'/>
        <h2>{currentUser.first_name} {currentUser.last_name}</h2>

        <div>Spooky List</div>
        <p>Location</p>
        <p>title</p>
        <p>spooky score</p>
        <p>spooky review</p>

      </div>
      </>
    );
  }
  
  export default UserInfo;