import { csrfFetch } from "./csrf";

export const RECEIVE_REVIEWS = "reviews/RECEIVE_REVIEWS"
export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW"
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW"

export const selectReviewsArray = (state) => Object.values(state.reviews);

export const selectReview = (reviewId) => (state) => state.reviews[reviewId] || null;

export const receiveReviews = (reviews) => {
    return {
        type: RECEIVE_REVIEWS,
        reviews: reviews
    }
}

export const receiveReview = (review) => {
    return {
        type: RECEIVE_REVIEW,
        review: review
    }
}

export const removeReview = (reviewId) => {
    return {
        type: REMOVE_REVIEW,
        reviewId: reviewId
    }
}

export const fetchReviews = () => async dispatch => {
    const res = await csrfFetch('/api/reviews')

    if (res.ok) {
        const reviews = await res.json();
        dispatch(receiveReviews(reviews))
    }
}

export const createReview = (review) => async dispatch => {
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const {review} = await res.json();
        dispatch(receiveReview(review))
    }
}

export const updateReview = (editReview) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${editReview.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editReview),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (res.ok) {
        const {review} = await res.json();
        dispatch(receiveReview(review))
    }
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeReview(reviewId))
    }
}

function reviewReducer(state = {}, action) {
    let newState = {...state}

    switch(action.type) {

        case RECEIVE_REVIEWS:
            newState = {...action.reviews}
            return newState
        
        case RECEIVE_REVIEW:
            newState[action.review.id] = action.review
            return newState

        case REMOVE_REVIEW:
            delete newState[action.reviewId]
            return newState
        
        default:
            return state
    }
}

export default reviewReducer;