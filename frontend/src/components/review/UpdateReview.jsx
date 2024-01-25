import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from '../../store/reviews';
import "./ReviewCreate.css";
import { useParams } from "react-router";


function ReviewUpdateForm() {
    const dispatch = useDispatch();
    const [body, setBody] = useState();
    const [rating, setRating] = useState();
    const [errors, setErrors] = useState([]);


    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id
    const {productId} = useParams();
    const actualProductId = parseInt(productId);


    let theReview = {body: body, rating: rating, product_id: actualProductId, user_id: userId}

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        let reviewBackgroundClose = document.getElementById("updateReviewBackground");
        let reviewClose = document.getElementById("updateReviewContainer");

        reviewBackgroundClose.style.display = "none";
        reviewClose.style.display = "none";
        
        return dispatch(reviewActions.updateReview(theReview))
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

    const handleClose = (e) => {
        e.preventDefault();

        let reviewBackgroundClose = document.getElementById("updateReviewBackground");
        let reviewClose = document.getElementById("updateReviewContainer");

        reviewBackgroundClose.style.display = "none";
        reviewClose.style.display = "none";
    }
    const keepModal = (e) => {
        e.stopPropagation();
    }


    return(
        <>
        <div id="updateReviewBackground" onClick={handleClose}>
        <div id="updateReviewContainer" onClick={keepModal}>
        <div id="createReviewForm">
            <h1>Update your review</h1>
            <form onSubmit={handleSubmit}>
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>

                <label>Change your rating
                    <input id="ratingInput" type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
                </label>
                <label>Change your review
                    <input id="updateReview" type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
               
                <button id="updateReviewSubmit" type="submit">Submit</button>
                
            </form>

        </div>
        </div>
        </div>
        </>
    )
}

export default ReviewUpdateForm;