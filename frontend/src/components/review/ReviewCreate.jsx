import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from '../../store/reviews';
import "./ReviewCreate.css";
import { useParams } from "react-router";


function ReviewCreateForm() {
    const dispatch = useDispatch();
    const [body, setBody] = useState("");
    const [rating, setRating] = useState("");
    const [errors, setErrors] = useState([]);


    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id
    const {productId} = useParams();
    const actualProductId = parseInt(productId);

    console.log(actualProductId);

    let theReview = {body: body, rating: rating, product_id: actualProductId, user_id: userId}

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);
        
        return dispatch(reviewActions.createReview(theReview))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data])
                    else setErrors([res.statusText]);
                })
    }


    return(
        <>
        <div id="createReviewContainer">
            <h1>Leave a review!</h1>
            <form onSubmit={handleSubmit}>
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>

                <label>Rating
                    <input id="ratingInput" type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                </label>
                <label>Review
                    <input id="signUpPassword" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
               
                <button id="signUpButton" type="submit">Submit</button>
                
            </form>

        </div>
        
        
        </>
    )
}

export default ReviewCreateForm;