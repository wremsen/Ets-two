# Ets-two

[Link!](https://mysite-94ch.onrender.com/)

## Description

Welcome to Ets-two! Ets-two is an Etsy clone. Etsy is an e-commerce application where users can create stores and sell goods from them. On Ets-two users can view products, leave reviews, and browse different categories of goods.

## Technology
- Ruby on Rails, Javascript, React, HMTL, CSS
- Database: PostgreSQL
- Cloud Storage: AWS

## Features

### User Authentication

Users can securely signup, login, and logout with proper password encryption.

### Products and Display Pages

Both logged in and non-logged in users can view a list of products on the Ets-two homepage. By clicking on a specific product, they will be brought to a product page with information on price, description, and user reviews.

Below you can see Ets-two simply fetches the products from the backend and displays them for view on the home page:

```js
export default function ProductsIndex() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector(selectProductsArray);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);





    return(
        <div id="outerMostContainer">
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
```

![homepage](/assets/homepage.png)

The product page dynamically renders the review form for only users that are logged in. Non-logged-in users can still view reviews. (Note we the profile icon in the top right which means we are currently logged in and can see the review button)

```js
return(
        <>
        <div id="productShowContainer">
            <div className="productContainer" id="mainPictureContainer">
                <img className="productPhotoUrl" src={product?.photoUrl} />
            </div>
            <div className="productContainer" id="descriptionContainer">
                <p className="productPrice">${product.price}</p>
                <p className="productName">{product.name}</p>
                <p className="productDescription">{product.description}</p>
                <Link to="/">Home</Link>
            </div>
        </div>
        <div id="linksForUser">
            {userLinks}
        </div>
        <div id="reviewsContainer">
                {reviews.map(review => {
                    return <div className="reviewCard" key={review.id}>
                        <p className="reviewRating">{Array.from({ length: review.rating }, (_, index) => <span key={index}>★</span>)}</p>
                        <p className="reviewBody">{review.body}</p> 
                        {sessionUser?.id === review.userId ? <button id="deleteRevButton" onClick={() => dispatch(deleteReview(review.id))}>D</button> : null}
                        {sessionUser?.id === review.userId ? <button id="updateRevButton" data-review={JSON.stringify(review)} onClick={handleUpdateReview}>U</button> : null}
                    </div>
                })}
        </div>
        </>
)
```

![productpage](/assets/Screenshot%202024-01-26%20122018.png)

### Reviews

Users can view reviews on product pages. Logged-in users can create, update, and delete reviews for specific products. "Hanle Submit" on the rview form offers a lot of functionality: Dynamically closes the modal, auto-fills if updating a review, and of course persists review to DB so we can see the page update with new info.

```js
const handleSubmit = (e) => {
        e.preventDefault();

        setErrors([]);

        let reviewBackgroundClose = document.getElementById("createReviewBacgkround");
        let reviewClose = document.getElementById("createReviewContainer");

        reviewBackgroundClose.style.display = "none";
        reviewClose.style.display = "none";

        if (review) {
            return dispatch(reviewActions.updateReview(theReview))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data])
                    else setErrors([res.statusText]);
                })
            
        } else {
            return dispatch(reviewActions.createReview(theReview))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data])
                    else setErrors([res.statusText]);
                })
        }
    }
```

![reviewModal](/assets/reviewmodal.png)

## Planned Features

### Shopping Cart:
- Logged in users can add items to their cart. They will be able to modify and "Checkout" their cart.

### Navigation / Search:
- Homepage currently has place holder navigation buttons and search bar that do not function. Users will be able to search for items in the search bar, or look at specific categories through nav buttons on the home page.

### Styling tweaks and updates:
- Product page and reviews can be tweaked slightly to ensure a more cohesive user experience.
