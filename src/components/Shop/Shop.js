import React, { useState } from 'react';
import './Shop.css';
import fakaData from '../../fakeData/index'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const item10 = fakaData.slice(0,10)
    const [products, setProducts] = useState(item10)

    const [cartItem, setCartItem] = useState([])
    const handelAddCart = (product)=>{
        const newCartItem = [...cartItem, product]
        setCartItem(newCartItem)
        const productQuantity = newCartItem.filter(pd => pd.key === product.key)
        const count = productQuantity.length
        addToDatabaseCart(product.key, count)
        console.log(count)
        
    }

    return (
        <div className="shop-container">
            <div className="products-section">
            {
                products.map(product => 
                <Product 
                    product={product} 
                    handelAddCart={handelAddCart} 
                    showAddToButton={true}>

                 </Product>)
            }
            </div>
            <div className="cart-section">
               <Cart cartItem= {cartItem}></Cart>
            </div>
        </div>
    );
};

export default Shop;