import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProductsArray, fetchProducts } from "../../store/products";
import "./ProductsIndex.css";
import { Link } from "react-router-dom";

export default function ProductsIndex() {
    const dispatch = useDispatch();

    const products = useSelector(selectProductsArray);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    console.log(products);



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
                    return <div className="productCard" key={product.id}>
                        <p className="productName">{product.name}</p> 
                        <p className="productDescription">{product.description}</p>
                        <p className="productPrice">{product.price}</p>
                        <p>{product.id}</p>
                        <Link to={`products/${product.id}`}>link</Link>
                    </div>
                })}
            </div>
        </div>
    )
}
