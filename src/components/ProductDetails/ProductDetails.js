import React, { useEffect, useState } from 'react';
import './ProductDetails.css'
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Products from '../Products/Products';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`https://mighty-retreat-78232.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>Product details</h1>
            <div>
                <Products showAddToCart={false} product={product}></Products>
            </div>
        </div>
    );
};

export default ProductDetails;