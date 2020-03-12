import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    const {name, img, seller, price, stock} = props.product;

    return (
        <div className="product-section">
            <div>
                <img className="product-img" src={img}></img>
            </div>
            <div className="product-details">
                <h3>{name}</h3>
                <p><small>by: {seller} </small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>

                <button className="add-cart-btn" onClick={() => {props.handelAddCart(props.product)}}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>

            </div>
        </div>
    );
};

export default Product;