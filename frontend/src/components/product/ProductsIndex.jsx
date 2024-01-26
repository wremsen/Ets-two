import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsArray, fetchProducts } from "../../store/products";
import "./ProductsIndex.css";
import { useNavigate } from 'react-router-dom';


export default function ProductsIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(selectProductsArray);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);





    return(
        <div id="outerMostContainer">
            <div id="secondaryNav">
                <h2 id="splashMessage">Handpicked finds with shipping included!</h2>
                <div className="splashButtonContainer">
                <button className="splashButton">
                    <p className="splashButtonText">V-Day Gifts</p>
                </button>
                <button className="splashButton">
                    <p className="splashButtonText">Braclets</p>
                </button>
                <button className="splashButton">
                    <p className="splashButtonText">Home Decor</p>
                </button>
                <button className="splashButton">
                    <p className="splashButtonText">Tees and Sweaters</p>
                </button>
                <button className="splashButton">
                    <p className="splashButtonText">Printables</p>
                </button>
                <button className="splashButton">
                    <p className="splashButtonText">Up to 40% Off!</p>
                </button>
                </div>
            </div>
            <div id="productsContainer">
                {products.map(product => {
                    return <div className="productCard" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                        <img className="productPhotoUrl" src={product?.photoUrl} />
                    </div>
                })}
            </div>
        </div>
    )
}
