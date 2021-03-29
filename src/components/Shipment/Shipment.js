import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {

        const saveCard = getDatabaseCart()
        const orderDetails = { ...loggedIn, product: saveCard, shipment: data, orderDate: new Date() }
        fetch('https://mighty-retreat-78232.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert("Your Order Placed successfully")
                }
            })

    };
    return (
        <form className="ship-form" form onSubmit={handleSubmit(onSubmit)} >

            < input name="name" defaultValue={loggedIn.name} ref={register({ required: true })} placeholder="Your Name" />
            { errors.name && <span className="error">Name field is required</span>}

            < input name="email" defaultValue={loggedIn.email} ref={register({ required: true })} placeholder="Your Email" />
            { errors.email && <span className="error">Email field is required</span>}

            < input name="address" ref={register({ required: true })} placeholder="Your Address" />
            { errors.address && <span className="error">Address field is required</span>}

            < input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
            { errors.phone && <span className="error">Phone field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;