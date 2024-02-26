import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from '../../store/reviews';
import "./ReviewCreate.css";
import { useParams } from "react-router";


function ReviewCreateForm({review}) {
    const dispatch = useDispatch();
    const [body, setBody] = useState(review ? review.body : "");
    const [rating, setRating] = useState(review ? review.rating : "");
    const [errors, setErrors] = useState([]);


    const currentUser = useSelector((state) => state.session.user);
    const userId = currentUser.id
    const {productId} = useParams();
    const actualProductId = parseInt(productId);

    useEffect(() => {
        setBody(review ? review.body : "");
        setRating(review ? review.rating : "");
    }, [review])


    let theReview = {id: review ? review.id : null, body: body, rating: rating, product_id: actualProductId, user_id: userId}


    const closeReviewModal = () => {
        let reviewBackgroundClose = document.getElementById("createReviewBacgkround");
        let reviewClose = document.getElementById("createReviewContainer");
    
        reviewBackgroundClose.style.display = "none";
        reviewClose.style.display = "none";
    }

    const handleErrorResponse = async (res) => {
        let data;
        try {
            data = await res.clone().json();
        } catch {
            data = await res.text();
        }
    
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     setErrors([]);


    //     if (review) {
    //         try {
    //             await dispatch(reviewActions.updateReview(theReview);
    //             closeReviewModal();
    //             } catch (async (res) => {
    //                 let data;
    //                 try {
    //                     data = await res.clone().json();
    //                 } catch {
    //                     data = await res.text();
    //                 }
    //                 if (data?.errors) setErrors(data.errors);
    //                 else if (data) setErrors([data])
    //                 else setErrors([res.statusText]);
    //             })
            
    //     } else {
    //         await dispatch(reviewActions.createReview(theReview))
    //             .catch(async (res) => {
    //                 let data;
    //                 try {
    //                     data = await res.clone().json();
    //                 } catch {
    //                     data = await res.text();
    //                 }
    //                 if (data?.errors) setErrors(data.errors);
    //                 else if (data) setErrors([data])
    //                 else setErrors([res.statusText]);
    //             })
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setErrors([]);
    
        // if (review) {
        //     try {
        //         await dispatch(reviewActions.updateReview(theReview));
        //         // Close the modal only if there are no errors
        //         closeReviewModal();
        //     } catch (res) {
        //         handleErrorResponse(res);
        //     }
        // } else {
        //     try {
        //         await dispatch(reviewActions.createReview(theReview));
        //         // Close the modal only if there are no errors
        //         closeReviewModal();
        //     } catch (res) {
        //         handleErrorResponse(res);
        //     }
        // }

        e.preventDefault();
        setErrors([]);
    
        try {
            if (review) {
                await dispatch(reviewActions.updateReview(theReview));
            } else {
                await dispatch(reviewActions.createReview(theReview));
            }
            closeReviewModal();
        } catch (res) {
            handleErrorResponse(res);
        }
    }

    const handleClose = (e) => {
        e.preventDefault();
        setErrors([]);
        setRating("");
        setBody("");

        let reviewBackgroundClose = document.getElementById("createReviewBacgkround");
        let reviewClose = document.getElementById("createReviewContainer");

        reviewBackgroundClose.style.display = "none";
        reviewClose.style.display = "none";
    }
    const keepModal = (e) => {
        e.stopPropagation();
    }


    return(
        <>
        <div id="createReviewBacgkround" onClick={handleClose}>
        <div id="createReviewContainer" onClick={keepModal}>
        <div id="createReviewForm">
            <h1 className="reviewH1">Leave a review!</h1>
            <form id="reviewFormForm" onSubmit={handleSubmit}>
                <ul>{errors.map(error => <li key={error}>{error}</li>)}</ul>

                <label>Overall Rating
                    <input id="ratingInput" type="number" value={rating} min={1} max={5} onChange={(e) => setRating(e.target.value)} />
                </label>
                <label>Add a written review
                    <textarea id="reviewInput" value={body} onChange={(e) => setBody(e.target.value)} />
                </label>
                <button id="reviewSubmitButton" type="submit">Submit</button>
            </form>
        </div>
        </div>
        </div>
        </>
    )
}

export default ReviewCreateForm;