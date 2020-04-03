import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';


import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();  
  const [paymentError, setPaymentError] = useState(null)
  const [payment, setPayment] = useState(null)

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
            payment &&
            <Alert  variant={'success'}>
                This is a  alert—check it out!
            </Alert>
        }
    </form>
  );
};

export default CheckoutForm