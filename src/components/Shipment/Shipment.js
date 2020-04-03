import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import {  Elements } from '@stripe/react-stripe-js';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';



const Shipment = () => {
    const { register, handleSubmit} = useForm()
    const [shipInfoAdded , setShipInfoAdded] = useState(null)
    const auth = useAuth()
    const stripePromise = loadStripe('pk_test_qJCbDAXISesp5bEAoRDlet9P000H7MSqEZ')

    const onSubmit = data => {
        //TODO: Samad move this after payment
        const saveCart = getDatabaseCart()
        const productDetails = {
            user: auth.user.name,
            cart: saveCart,
            shipment: data,
        }
        fetch('http://localhost:4200/placeOrder',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails) // body data type must match "Content-Type" header
          })
          .then(res => res.json())
          .then(order => {
            console.log("Order Placed", order)
            alert("Successfully placed your order Your order ID: "+ order._id)
            setShipInfoAdded(true)
          })
    }; 

    return (
        <Container>
            <Row>
                <Col style={{display: shipInfoAdded && 'none'}}>
                <h1>Shipment Address</h1>
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
                </Col>
                <Col style={{display: shipInfoAdded ? 'block' : 'none'}}>
                <h1>Payment Method</h1>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm>

                        </CheckoutForm>
                    </Elements>
                </Col>
            </Row>
        </Container>
    );
};

export default Shipment;