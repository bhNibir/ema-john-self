import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cartItem, setCartItem] = useState([])

    useEffect(()=> {
        fetch('https://infinite-badlands-59460.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    
    const handelAddCart = (product)=>{
        const newCartItem = [...cartItem, product]
        setCartItem(newCartItem)
        const productQuantity = newCartItem.filter(pd => pd.key === product.key)
        const count = productQuantity.length
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="shop-container">
            <div className="products-section">
            {
                products.map(product => 
                <Product 
                    key = {product.key}
                    product={product} 
                    handelAddCart={handelAddCart} 
                    showAddToButton={true}>

                 </Product>)
            }
            </div>
            <div className="cart-section">
               <Cart cartItem= {cartItem} btnLink={'review'} btnText= {'View Cart'}></Cart>
            </div>
        </div>
    );
};

export default Shop;