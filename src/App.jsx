// src/App.js

import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItems from './CartItems'; // Ensure this import path is correct
import { useSelector } from 'react-redux'; // Import useSelector for cart item count

// Basic CSS for demonstration - make sure you have this or similar in your App.css
import './App.css'; // Assuming your general styles are here

function App() {
  // State to control whether to show the product list or the cart
  const [showCart, setShowCart] = useState(false);

  // Get the total number of items in the cart from Redux state for a simple cart icon/count
  const totalCartItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Function to switch view to Cart
  const handleGoToCart = () => {
    setShowCart(true);
  };

  // Function to switch view back to ProductList (passed to CartItems)
  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div className="App">
      {/* Header/Navbar - simplified and made consistent */}
      <header className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#4CAF50', color: 'white', fontSize: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{ height: '50px' }} />
            {/* Direct link to home/products page */}
            <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
                <div>
                    <h3 style={{ margin: 0, color: 'white' }}>Paradise Nursery</h3>
                    <i style={{ color: 'white', fontSize: '0.9em' }}>Where Green Meets Serenity</i>
                </div>
            </a>
        </div>
        <button onClick={handleGoToCart} style={{ background: 'none', border: '1px solid #ccc', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', color: 'white' }}>
          🛒 Cart ({totalCartItems}) {/* Display total items in cart */}
        </button>
      </header>

      <main>
        {showCart ? (
          <CartItems onContinueShopping={handleContinueShopping} />
        ) : (
          <ProductList onGoToCart={handleGoToCart} /> {/* Pass handleGoToCart to ProductList */}
        )}
      </main>
    </div>
  );
}

export default App;
