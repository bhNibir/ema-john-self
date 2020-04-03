import React from 'react';
import fakeData from '../../fakeData'

const Inventory = () => {

    const handleProduct = () =>{        
        const product = fakeData
        console.log(product);
        fetch('http://localhost:4200/addProduct',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(product) // body data type must match "Content-Type" header
          })
          .then(res => res.json())
          .then(data => {
              console.log("Post Successful", data);
              
          })
        
    }
    return (
        <div>
            <h1>This inventory Page</h1>
            <button onClick={handleProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;