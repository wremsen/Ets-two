import { csrfFetch } from "./csrf";


export const RECEIVE_PRODUCTS = "products/RECEIVE_PRODUCTS"
export const RECEIVE_PRODUCT = "products/RECEIVE_PRODUCT"

export const selectProduct = (productId) => (state) => state.products[productId] || null

export const selectProductsArray = (state) => Object.values(state.products);


export const receiveProducts = (products) => {
    return {
        type: RECEIVE_PRODUCTS,
        products: products
    }
}

export const receiveProduct = (product) => {
    return {
        type: RECEIVE_PRODUCT,
        product: product
    }
}

export const fetchProducts = () => async dispatch => {
    const res = await csrfFetch('/api/products');

    if (res.ok) {
        const products = await res.json();
        dispatch(receiveProducts(products));
    }
}

export const fetchProduct = (productId) => async dispatch => {
    const res = await csrfFetch(`/api/products/${productId}`);

    if (res.ok) {
        const product = await res.json();

        dispatch(receiveProduct(product));
    }
}

function productsReducer(state = {}, action) {
    let newState = {...state};
    
    switch (action.type) {

        case RECEIVE_PRODUCTS:
            newState = {...action.products}
            return newState
        
        case RECEIVE_PRODUCT:
            newState[action.product.product.id] = action.product.product
            return newState

        default:
            return state;
    }
}

export default productsReducer;