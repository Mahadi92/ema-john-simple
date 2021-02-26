import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const price = cart[0];
    // console.log(price);

    // const total = cart.reduce((total, pd) => total + pd.price , 0)

    //Total
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    //Shipping
    let shipping = 0;
    if (total > 40) {
        shipping = 0;
    }
    else if(total > 20){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    // Tex / vat
    const tex = total / 10;

    const grandTotal = total + shipping + tex;

    const handleFlotingNumber = (number) => number.toFixed(2);
    return (
        <div>
            <p>Items ordered: {cart.length}</p>

            <tr>
                <td><p>Items: </p></td>
                <td> ${handleFlotingNumber(total)}</td>
            </tr>
            <tr>
                <td><p>Shipping & Handling: </p></td>
                <td> ${handleFlotingNumber(shipping)}</td>
            </tr>
            <tr>
                <td><p>Tax/Vat: </p></td>
                <td> ${handleFlotingNumber(tex)}</td>
            </tr>
            <tr>
                <td><h3>Order Total: </h3></td>
                <td> <h3>${handleFlotingNumber(grandTotal)}</h3></td>
            </tr>


            <button>Review your order</button>
        </div>
    );
};

export default Cart;