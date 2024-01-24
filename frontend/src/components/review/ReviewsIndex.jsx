import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectReviewsArray, fetchReviews } from "../../store/reviews";
import "./ReviewsIndex.css";

export default function ReviewsIndex(){
    const dispatch = useDispatch();

    const reviews = useSelector(selectReviewsArray);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch])




    return(
        <div id="reviewsContainer">
                {reviews.map(review => {
                    return <div className="reviewCard" key={review.id}>
                        <p className="reviewBody">{review.body}</p> 
                        <p className="reviewRating">{review.rating}</p>
                    </div>
                })}
        </div>
    )
}
