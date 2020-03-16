import React from 'react';

const ReviewItem = (props) => {
    const {name, price, quantity} = props.product
    return (
        <div className="product-details">
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{quantity}</p>
        </div>
    );
};

export default ReviewItem;