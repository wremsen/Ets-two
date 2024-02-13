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
        <div id="outerMostContainer">
            <div id="secondaryNav">
                <h2 id="splashMessage">More from Billy Remsen...</h2>
                <div className="splashButtonContainer">
                <button className="splashButton" onClick={() => handleNavPersonal('echo')}>
                    <p className="splashButtonText">Echo</p>
                </button>
                <button className="splashButton" onClick={() => handleNavPersonal('cosmic')}>
                    <p className="splashButtonText">Cosmic Classes</p>
                </button>
                <button className="splashButton" onClick={() => handleNavPersonal('person')}>
                    <p className="splashButtonText">About Me</p>
                </button>
                <button className="splashButton" onClick={() => handleNavPersonal('linkedin')}>
                    <p className="splashButtonText">LinkedIn</p>
                </button>
                <button className="splashButton" onClick={() => handleNavPersonal('github')}>
                    <p className="splashButtonText">Github</p>
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
