import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";

function Logout({logout, currentUser}) {

    const navigate = useNavigate();

    const isLockedin = currentUser ? (<>
        <NavBar />
        <div className="logout-box">
            <img id='logo' src='https://i.imgur.com/amwkB4H.png' alt='logo'/>
            <h1>Come back anytime!</h1>

            <button type="submit"
            onClick={()=>{
                logout()
                navigate('/')
            }}
            >Log out</button>

        </div>
        </>): null

    return <>{isLockedin}</>;
    }

export default Logout;