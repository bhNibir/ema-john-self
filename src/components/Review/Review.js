import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect(()=>{
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key]
            return product
        })
        setCart(cartProducts)
    },[])

    
     
    return (
        <div className="shop-container">
        <div className="products-section">
        {
        cart.map(product => 
            <ReviewItem product = {product}></ReviewItem>
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