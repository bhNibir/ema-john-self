import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({})
    // console.log(useParams)
    useEffect(() => {
        fetch('https://infinite-badlands-59460.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
    return (
        <div>
            <Product showAddToButton={false}  product={product}></Product>
        </div>
    );
};

export default ProductDetail;