import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/products";
import "./ProductShow.css";

export default function ProductShow() {
    const {productId} = useParams();

    const dispatch = useDispatch();

    const product = useSelector(selectProduct(productId));
    console.log(product);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId])

    if (!product) {
        return null;
    }

return(
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
)
}