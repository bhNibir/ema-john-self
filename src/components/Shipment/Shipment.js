import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit} = useForm()
    const auth = useAuth()
    const onSubmit = data => {
        //TODO: Samad move this after payment
        console.log(auth.user.email)
        const saveCart = getDatabaseCart()
        const productDetails = {user: auth.user.name, cart: saveCart}
        fetch('http://localhost:4200/placeOrder',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails) // body data type must match "Content-Type" header
          })
          .then(res => res.json())
          .then(data => {
              console.log("Order Placed")
              alert("Successfully placed your order")
              processOrder()
          })
    }; 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user && auth.user.name} placeholder="Full Name" ref={register} />
            <br/>
            <input name="email" defaultValue={auth.user && auth.user.email} placeholder="Email" ref={register} />
            <br/>
            <input name="address" placeholder="Address" ref={register} />
            <br/>
            <input name="name" placeholder="Address 2" ref={register} />
            <br/>
            <input type="submit" />
        </form>
    );
};

export default Shipment;