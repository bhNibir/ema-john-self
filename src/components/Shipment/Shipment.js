import React from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit} = useForm()
    const auth = useAuth()
    const onSubmit = data => {
        console.log(data);
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