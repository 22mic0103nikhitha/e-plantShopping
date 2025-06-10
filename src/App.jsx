// src/App.js

import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItems from './CartItems'; // Import CartItems component
import { useSelector } from 'react-redux'; // Import useSelector to get total items for icon (optional)

// Basic CSS for demonstration - you'll likely have this in App.css
import './App.css'; 

function App() {
  // State to control whether to show the product list or the cart
  const [showCart, setShowCart] = useState(false);

  // Get the total number of items in the cart from Redux state for a simple cart icon/count
  const totalCartItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleContinueShopping = () => {
    setShowCart(false); // Hide cart, show product list
  };

  const handleGoToCart = () => {
    setShowCart(true); // Show cart, hide product list
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
        <h1>Paradise Nursery</h1>
        <button onClick={handleGoToCart} style={{ background: 'none', border: '1px solid #ccc', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          🛒 Cart ({totalCartItems})
        </button>
      </header>

      <main>
        {showCart ? (
          <CartItems onContinueShopping={handleContinueShopping} />
        ) : (
          <ProductList />
        )}
      </main>
    </div>
  );
}

export default App;



