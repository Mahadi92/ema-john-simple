import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {

    const history = useHistory()

    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleProcessCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);

    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://mighty-retreat-78232.herokuapp.com/productsByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])
    let thanks;
    if (orderPlaced) {
        thanks = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} cart={pd} key={pd.key}></ReviewItem>)
                }
                {thanks}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProcessCheckout} className="main-button">Process Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;