import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name, quantity, key } = props.cart
    return (
        <div className="review-product">
            <h2>{name}</h2>
            <h4>Quantity: {quantity}</h4>
            <button onClick={() => props.removeProduct(key)} className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;