import React from 'react';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Products = (props) => {
    const { name, img, seller, price, stock, key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h3 className="product-name"><Link to={"/products/" + key}>{name}</Link></h3>
                <small>by: {seller}</small>
                <br />
                <p className="price">${price}</p>
                <br />
                <small>only {stock} left in stock - order soon</small>
                <br />
                {
                    props.showAddToCart && <button onClick={() => props.handleAddButton(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} />  add to cart</button>
                }
            </div>
        </div>
    );
};

export default Products;