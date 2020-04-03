import React from 'react';

const ReviewItem = (props) => {
    const {handelRemoveProduct} = props
    const {name, price, quantity, key} = props.product
    return (
        <div className="product-details">
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{quantity}</p>
            <button className="add-cart-btn" onClick={() => handelRemoveProduct(key)} >Remove Item</button>
        </div>
    );
};

export default ReviewItem;