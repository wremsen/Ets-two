import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/products";
import "./ProductShow.css";
import { selectReviewsArray, fetchReviews, deleteReview } from "../../store/reviews";
import ReviewCreateForm from "../review/ReviewCreate";

export default function ProductShow() {
    const {productId} = useParams();

    const dispatch = useDispatch();
    const [review, setReview] = useState(null);
    const [futureDate, setfutureDate] = useState(null);

    const product = useSelector(selectProduct(productId));
    const sessionUser = useSelector(state => state.session.user);
    const allReviews = useSelector(selectReviewsArray);
    const reviews = allReviews.filter(review => review.productId === product.id);

    
    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch])

    useEffect(() => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        const formattedDate = futureDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
    
        setfutureDate(formattedDate);
      }, []);




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

    const handleUpdateReview = (e) => {
        e.preventDefault();
        const review = e.target.dataset.review;

        console.log('My Review: ', review)

        if (review) {
            setReview((prevReview) => {
              const updatedReview = JSON.parse(review);
              return { ...prevReview, ...updatedReview };
            });
        }
        
        let reviewModalBG = document.getElementById("createReviewBacgkround");
        let reviewModal = document.getElementById("createReviewContainer");

        reviewModalBG.style.display = "block";
        reviewModal.style.display = "block";
    }

    
    






    const authorNotes = [
        'A new customer',
        'An avid purchaser',
        'A returning customer',
        'First time buyer',
        'Long time customer',
        'A frequent purchaser',
        'One customer',
        'A new user'
    ]


    let userLinks;
  if (sessionUser) {
    userLinks = (
        <div id="reviewForm">
            <ReviewCreateForm review={review} />
            <button id="reviewButton" onClick={handleReviewOpen}>Leave a review!</button>
        </div>
    );
  } else {
    userLinks = (
      <>

      </>
    );
  }

  const handleNavPersonal = (website) => {
    if (website === 'echo') {
        window.location.href = 'https://echo-p48f.onrender.com/'
    } else if (website === 'cosmic') {
        window.location.href = 'https://wremsen.github.io/CosmicClasses/'
    } else if (website === 'person') {
        window.location.href = 'https://github.com/wremsen'
    } else if (website === 'linkedin') {
        window.location.href = 'https://www.linkedin.com/in/billy-remsen-b0969a120/'
    } else {
        window.location.href = 'https://github.com/wremsen'
    }
}

return(
        <>
        <div id="allProductPageWrapper">
        <div id="productShowContainer">
            <div className="productContainer" id="mainPictureContainer">
                <img className="productPhotoUrl" src={product?.photoUrl} />
            </div>
            <div className="productContainer" id="descriptionContainer">
                <div className="primDescWrapper"><h1 className="productPrice">${parseFloat(product.price).toFixed(2)}</h1></div>
                <div className="primDescWrapper"><p className="productName">{product.name}</p></div>
                <div className="descWrapper"><p className="productDescription">{product.description}</p></div>
            </div>
        </div>
        <div id="reviewWrapper">
            <div id="linksForUser">
                <h1>{reviews.length} Reviews</h1>
                {userLinks}
            </div>
            <div id="reviewsContainer">
                <div id="reviewCardsWrapper">
                    {reviews.map(review => {
                        return <div className="reviewCard" key={review.id}>

                            <div id="ratingWrapper">
                                {/* <p className="reviewRating">{Array.from({ length: review.rating }, (_, index) => <span key={index}>★</span>)}</p> */}
                                    <p className="reviewRating">
                                        {[...Array(5)].map((_, index) => (
                                            <i key={index} className={index < review.rating ? "fas fa-star" : "far fa-star"}></i>
                                        ))}
                                    </p>
                            </div>

                            <div id="authorWrapper">
                                {sessionUser?.id === review.userId? <p>You wrote:</p> : <p>{authorNotes[Math.floor(Math.random() * authorNotes.length)]} writes:</p>}
                            </div>

                            <div id="bodyWrapper">
                                <p className="reviewBody">{review.body}</p>
                            </div>
                            <div id="updateDeleteWrapper"> 
                            {/* {sessionUser?.id === review?.userId ? <button id="updateRevButton" data-review={JSON.stringify(review)} onClick={handleUpdateReview}><i className="fa-solid fa-pen-to-square"></i></button> : null} */}      
                            
                            {sessionUser?.id === review?.userId && review ? (
                            <button id="updateRevButton" data-review={JSON.stringify(review)} onClick={handleUpdateReview}>
                            <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            ) : null}
                            
                            {sessionUser?.id === review.userId ? <button id="deleteRevButton" onClick={() => dispatch(deleteReview(review.id))}><i className="fa-solid fa-trash"></i></button> : null}
                            </div>
                        </div>
                    })}
                </div>
                <div id="reviewOtherLinks">
                    <div className="orderDetails">
                        <h1>Shipping & Return Policies:</h1>
                    </div>
                    <div className="orderDetails">
                        <i className="fa-regular fa-calendar"></i>
                        <p>Order now to get by...{futureDate}</p>
                    </div>
                    <div className="orderDetails">
                        <i className="fa-solid fa-box"></i>
                        <p>Returns & exchanges accepted within 30 days</p>
                    </div>
                    <div className="orderDetails">
                        <i className="fa-solid fa-truck-fast"></i>
                        <p>Free shipping!</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div id="bottomShowLinks">
                <div id="logoConatiner">
                    <div id="etsTwoSquare">
                        <p>Ets-two</p>
                    </div>
                </div>

                <div id="linksContainer" className="bottomNavContainer">
                    <div className="h1Wrapper">
                        <h1>Links:</h1>
                    </div>
                    <div id="linksWrap" className="aboutCont">
                        <p className="linksToPages" onClick={() => handleNavPersonal('person')}>Portfolio</p>
                        <p className="linksToPages" onClick={() => handleNavPersonal('linkedin')}>LinkedIn</p>
                        <p className="linksToPages" onClick={() => handleNavPersonal('github')}>GitHub</p>
                        <p className="linksToPages" onClick={() => handleNavPersonal('github')}>Resume</p>
                    </div>
                </div>
        </div>
        </>
)
}