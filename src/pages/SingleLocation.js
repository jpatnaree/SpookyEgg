import { useParams } from "react-router";
import LocationReview from "../components/LocationReview";
import NavBar from "../components/Navbar";


function SingleLocation({allReviews}) {

    const {id} = useParams()

    const allLocation = allReviews.find(a => {
        return a.location_id === Number(id)
    })
    console.log(allLocation)
    // const target = allLocation.location const target = allLocation.location

    const filtered = allReviews.map(review => {
        if(Number(review.location_id) === Number(id)) {
            return (<>
            <h3 id='location-name'>Location: {review.location.name}</h3>
            <LocationReview key={review.id} review={review} /></>)
        }
    })

    return(
        <>
            <NavBar />
            {/* <h3>Location: {allLocation.location.name}</h3> */}
            {filtered}
        </>
    )
}

export default SingleLocation;