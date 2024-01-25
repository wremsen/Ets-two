import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsArray, fetchProducts } from "../../store/products";
import "./ProductsIndex.css";
import { Link, useNavigate } from 'react-router-dom';


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
                <button className="splashButton"></button>
                <button className="splashButton"></button>
                <button className="splashButton"></button>
                <button className="splashButton"></button>
                <button className="splashButton"></button>
                <button className="splashButton"></button>
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
