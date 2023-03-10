import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import Carousel from 'react-bootstrap/Carousel';

const Shop = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        addToDb(selectedProduct.id);
    }
        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
        };

    return (
        <div>
            <Carousel className='banner-image' activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                    className="image"
                    src="https://img.freepik.com/free-vector/flat-national-doctor-s-day-background_23-2149447254.jpg?w=996&t=st=1678464770~exp=1678465370~hmac=84180ef65e963aecdf60c0c9d4c64172bc4698f0241f5b2c9e4a00ecd4c7742d"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Order Your Medicine Now</h3>
                    <p>Get your delivery within 30 minutes</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="image"
                    src="https://img.freepik.com/free-photo/medicine-capsules-global-health-with-geometric-pattern-digital-remix_53876-126742.jpg?w=996&t=st=1678465326~exp=1678465926~hmac=b405ca395e2517f18d284fdb8486cc0cdb5f78f1369d6098e2aff9d9540e1a03"
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Order Your Medicine Now</h3>
                    <p>Get your delivery within 30 minutes</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="image"
                    src="https://img.freepik.com/free-photo/medicines-medical-supplies-placed-blue_1150-19136.jpg?w=996&t=st=1678466229~exp=1678466829~hmac=590601660eb0df2112cdac6a48216f09d2083a2d647d41cbd0cee5c703af34ef"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Order Your Medicine Now</h3>
                    <p>Get your delivery within 30 minutes</p>
                    </Carousel.Caption>
                </Carousel.Item>
    </Carousel>
            
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product=><Product 
                            key={product.id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                            ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/orders">
                            <button>Review Order </button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;