import React, { useState } from 'react';
import './Shop.css';
import fakaData from '../../fakeData/index'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const item10 = fakaData.slice(0,10)
    const [products, setProducts] = useState(item10)

    const [cartItem, setCartItem] = useState([])
    const handelAddCart = (product)=>{
        const newCartItem = [...cartItem, product]
        setCartItem(newCartItem)
        
        
    }

    return (
        <div className="shop-container">
            <div className="products-section">
            {
                products.map(product => <Product product={product} handelAddCart={handelAddCart}></Product>)
            }
            </div>
            <div className="cart-section">
               <Cart cartItem= {cartItem}></Cart>
            </div>
        </div>
    );
};

export default Shop;