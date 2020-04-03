import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();  
  const [paymentError, setPaymentError] = useState(null)
  const [payment, setPayment] = useState(null)
  const { handelPlaceOrder } = props

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
        setPaymentError(error)
        setPayment(null)
    }
    else{
        setPayment(paymentMethod)
        const paymentDetails = { paymentID: paymentMethod.id, last4: paymentMethod.card.last4 }
        handelPlaceOrder(paymentDetails)
        setPaymentError(null)
    }
    console.log(error, paymentMethod)
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <br/>
        {
            paymentError &&
            <Alert  variant={'danger'}>
                This is a  {paymentError.message} it out!
            </Alert>
        }
        {
           (payment &&  props.orderID) &&
            <Alert  variant={'success'}>
                <h3>
                    Thank You For your Order
                </h3>
                
                <p>Your Order id: {props.orderID}</p>

            </Alert>
        }
    </form>
  );
};

export default CheckoutForm