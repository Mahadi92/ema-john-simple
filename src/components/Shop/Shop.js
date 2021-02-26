import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData'
import Products from '../Products/Products';
import Cart from '../Cart/Cart';

const Shop = () => {
    const data10 = fakeData.slice(0, 10)
    const [data, setData] = useState(data10);
    const [cart, setCart] = useState([]);
    
    const handleAddButton = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        data.map(pd => <Products handleAddButton={handleAddButton} product={pd}></Products>)
                    }
                </ul>
            </div>

            <div className="cart-container">
                <h2>Order Summary</h2>
                <Cart cart={cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;