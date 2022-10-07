import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
            setCart(savedCart);
        }
    },
        [products])

    const handelAddCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart)
        addToDb(product?.id)
    }
    return (
        <main className='main-container'>
            <div className="product-container">
                {
                    products.map(product => <Product key={product.id} product={product} handelAddCart={handelAddCart}></Product>)
                }
            </div>
            <div className='order-summery'>
                <Cart cart={cart}></Cart>
            </div>
        </main >
    );
};

export default Shop;