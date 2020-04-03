import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const {btnLink, btnText } = props
    const cartItem = props.cartItem
    // console.log(cartItem)
    const totalPrice = cartItem.reduce(((total, product)=>total+product.price), 0)
    let shipping = 0; 
    const tax = (totalPrice/100)*2
    

    const precise = num => {
        const newNum = num.toFixed(2)
        return Number(newNum)
    }

    if(totalPrice>=1 && totalPrice<=14){
        shipping = 15;
    }
    else if(totalPrice>=15 && totalPrice<=34){
        shipping = 12;
    }
    else if((totalPrice>=35)){
        shipping = 10;
    }
    else{
        shipping = 0
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <h3>Order Summary</h3>
                <h5>Items order: {cartItem.length}</h5>
            </div>
            <p>Items: {precise(totalPrice)} </p>
            <p>Shipping & Handling: {shipping} </p>
            <p>Total before tax: {precise(tax)} </p>
            <p>Order Total: {precise(totalPrice+shipping+tax)}</p>
            <Link to={"/"+btnLink}> <button className="add-cart-btn">{btnText}</button> </Link>
        </div>
    );
};

export default Cart;