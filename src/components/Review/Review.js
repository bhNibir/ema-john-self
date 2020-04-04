import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';

const Review = () => {
    const [cart, setCart] = useState([])    
    const [cartItem] = useState([])


    useEffect(()=>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        
        fetch('https://infinite-badlands-59460.herokuapp.com/productReviewByKey',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
          })
          .then(res => res.json())
          .then(data => {
              const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key)
                product.quantity = saveCart[key]
                return product
              
          })
          setCart(cartProducts)
        })
        
    },[])

    const handelRemoveProduct = (key) => {
        removeFromDatabaseCart(key)
    }
     
    return (
        <div className="shop-container">
        <div className="products-section">
        {
        cart.map(product => 
            <ReviewItem product = {product} key = {product.key} handelRemoveProduct={handelRemoveProduct} ></ReviewItem>
            )
         }
        </div>
            <div className="cart-section">
            <Cart cartItem= {cartItem} btnLink={'shipment'} btnText= {'Order Place'}></Cart>
            </div>
        </div>
               
    );
};

export default Review;