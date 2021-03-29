import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import "./Header.css";
const Header = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => setLoggedIn({})}>Sign Out</button>
                <span style={{ margin: "0 40px", color: '#fff' }}>{loggedIn.email}</span>
            </nav>
        </div>
    );
};

export default Header;