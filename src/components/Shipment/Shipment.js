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
    const [orderID , setOrderID] = useState(null)
    const auth = useAuth()
    const stripePromise = loadStripe('pk_test_qJCbDAXISesp5bEAoRDlet9P000H7MSqEZ')

    const onSubmit = data => {
        setShipInfoAdded(data)
    }; 

    const handelPlaceOrder = (paymentDetails) => {
        //TODO: Samad move this after payment
        const saveCart = getDatabaseCart()
        const productDetails = {
            user: auth.user.name,
            cart: saveCart,
            shipment: shipInfoAdded,
            paymentDetails: paymentDetails
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
            setOrderID(order._id)
            processOrder()
          })
    }

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
                        <CheckoutForm handelPlaceOrder={handelPlaceOrder} orderID={orderID}>

                        </CheckoutForm>
                    </Elements>
                </Col>
            </Row>
        </Container>
    );
};

export default Shipment;