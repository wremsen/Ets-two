import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct, fetchProduct } from "../../store/products";

export default function ProductShow() {
    const {productId} = useParams();

    const dispatch = useDispatch();

    const product = useSelector(selectProduct(productId));
    console.log(product);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId])

return(
        <div id="productShowContainer">
            {/* <p>{product.name}</p> */}
            <p>{product.description}</p>
            <p>{product.price}</p>
            <Link to="/">Home</Link>
        </div>
)
}