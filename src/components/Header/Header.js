import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useAuth } from '../Login/useAuth';

const Header = () => {
    const auth = useAuth()
    console.log(auth.user);
    
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order review</a>
                <a href="/inventory">Manage Inventory Here</a>
                <span style={{color: 'yellow'}}>{}</span>
            </nav>
        </div>
    );
};

export default Header;