import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/products";
import "./ProductShow.css";
import { selectReviewsArray, fetchReviews } from "../../store/reviews";
import ReviewCreateForm from "../review/ReviewCreate";

export default function ProductShow() {
    const {productId} = useParams();

    const dispatch = useDispatch();

    const product = useSelector(selectProduct(productId));
    
    const allReviews = useSelector(selectReviewsArray);
    const reviews = allReviews.filter(review => review.productId === product.id);
    
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

        <div id="reviewsContainer">
                <div id="reviewForm">
                    <ReviewCreateForm />
                </div>
                {reviews.map(review => {
                    return <div className="reviewCard" key={review.id}>
                        <p className="reviewBody">{review.body}</p> 
                        <p className="reviewRating">{review.rating}</p>
                    </div>
                })}
        </div>
        </>
)
}