import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/products";
import "./ProductShow.css";
import { selectReviewsArray, fetchReviews, deleteReview } from "../../store/reviews";
import ReviewCreateForm from "../review/ReviewCreate";

export default function ProductShow() {
    const {productId} = useParams();

    const dispatch = useDispatch();

    const product = useSelector(selectProduct(productId));
    
    const allReviews = useSelector(selectReviewsArray);
    const reviews = allReviews.filter(review => review.productId === product.id);

    const [review, setReview] = useState(null);
    
    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch])

    console.log(reviews);


    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId])

    if (!product) {
        return null;
    }

    const handleReviewOpen = (e) => {
        setReview(null);
        e.preventDefault();

        let reviewModalBG = document.getElementById("createReviewBacgkround");
        let reviewModal = document.getElementById("createReviewContainer");

        reviewModalBG.style.display = "block";
        reviewModal.style.display = "block";
    }

    const sessionUser = useSelector(state => state.session.user);

    const handleUpdateReview = (e) => {
        e.preventDefault();
        const review = e.target.dataset.review;

        console.log(review)
        setReview(JSON.parse(review))
        let reviewModalBG = document.getElementById("createReviewBacgkround");
        let reviewModal = document.getElementById("createReviewContainer");

        reviewModalBG.style.display = "block";
        reviewModal.style.display = "block";
    }


    let userLinks;
  if (sessionUser) {
    userLinks = (
        <div id="reviewForm">
            <ReviewCreateForm review={review} />
            <button id="reviewButton" onClick={handleReviewOpen}></button>
        </div>
    );
  } else {
    userLinks = (
      <>

      </>
    );
  }

return(
        <>
        <div id="productShowContainer">
            <div className="productContainer" id="sidePictureContainer">
                many pictures here
            </div>
            <div className="productContainer" id="mainPictureContainer">
                <p>picture here</p>
            </div>
            <div className="productContainer" id="descriptionContainer">
                <p className="productPrice">${product.price}</p>
                <p className="productName">{product.name}</p>
                <p className="productDescription">{product.description}</p>
                <Link to="/">Home</Link>
            </div>
        </div>

        {/* <div id="leaveAReviewButton">
            <button onClick={handleReviewOpen}></button>
        </div> */}
        <div id="linksForUser">
            {userLinks}
        </div>
        <div id="reviewsContainer">
                {/* <div id="reviewForm">
                    <ReviewCreateForm />
                </div> */}
                {reviews.map(review => {
                    return <div className="reviewCard" key={review.id}>
                        <p className="reviewRating">{Array.from({ length: review.rating }, (_, index) => <span key={index}>★</span>)}</p>
                        <p className="reviewBody">{review.body}</p> 
                        {sessionUser?.id === review.userId ? <button onClick={() => dispatch(deleteReview(review.id))}>Delete Review</button> : null}
                        {sessionUser?.id === review.userId ? <button data-review={JSON.stringify(review)} onClick={handleUpdateReview}>Edit Review</button> : null}
                    </div>
                })}
        </div>
        </>
)
}