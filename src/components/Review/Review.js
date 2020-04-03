import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect(()=>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        console.log(productKeys)
        fetch('http://localhost:4200/productReviewByKey',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
          })
          .then(res => res.json())
          .then(data => {
              console.log("Post Successful", data);
              const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key)
                product.quantity = saveCart[key]
                return product
              
          })
          setCart(cartProducts)
        })
        
    },[])

    
     
    return (
        <div className="shop-container">
        <div className="products-section">
        {
        cart.map(product => 
            <ReviewItem product = {product} key = {product.key}></ReviewItem>
            )
         }
        </div>
            <div className="cart-section">
                {/* <Cart cartItem= {cartItem}></Cart> */}
            </div>
        </div>
               
    );
};

export default Review;