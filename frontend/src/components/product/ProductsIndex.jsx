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
                <div className="splashCard">
                    <div className="splashBut" onClick={() => handleNavPersonal('echo')} >
                        <i id="echoIcon" className="fa-solid fa-volume-high"></i>
                    </div>
                        <p className="navText">Echo</p>
                </div>
                <div className="splashCard">
                    <div className="splashBut" onClick={() => handleNavPersonal('cosmic')}>
                        <i id="echoIcon" className="fa-solid fa-sun"></i>
                    </div>
                        <p className="navText">Cosmic Classes</p>
                </div>
                <div className="splashCard">
                    <div className="splashBut" onClick={() => handleNavPersonal('person')}>
                        <i id="echoIcon" className="fa-solid fa-address-card"></i>
                    </div>
                        <p className="navText">About Me</p>
                </div>
                <div className="splashCard">
                    <div className="splashBut" onClick={() => handleNavPersonal('linkedin')}>
                        <i id="echoIcon" className="fa-brands fa-linkedin"></i>
                    </div>
                        <p className="navText">Linkedin</p>
                </div>
                <div className="splashCard">
                    <div className="splashBut" onClick={() => handleNavPersonal('github')}>
                        <i id="echoIcon" className="fa-brands fa-square-github"></i>
                    </div>
                        <p className="navText">Github</p>
                </div>
                </div>
            </div>
            <div id="productsContainer">
                {products.map(product => {
                    return <div className="productCard" key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                        <img className="productPhotoUrl" src={product?.photoUrl} />
                        <div className="priceContainer">
                            <p>${parseFloat(product.price).toFixed(2)}</p>
                        </div>
                    </div>
                })}
            </div>
            <div id="mainPageBottomNav">
                <div id="logoConatiner">
                    <div id="etsTwoSquare">
                        <p>Ets-two</p>
                    </div>
                </div>
                <div className="bottomNavContainer">
                    <div className="h1Wrapper">
                        <h1>About:</h1>
                    </div>
                    <div className="aboutCont">
                        <p>Ets-two is a single page application built using a React/Redux frontend with a Rails backend. Data is stored using PostgreSQL, and the application makes use of AWS S3 for media storage. Ets-two aims to mimic the UX from Etsy where users can browse products, leave reviews, and purchase items.</p>
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
        </div>
    )
}
