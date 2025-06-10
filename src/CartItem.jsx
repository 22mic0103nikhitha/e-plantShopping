// src/CartItems.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Ensure correct path

const CartItems = ({ onContinueShopping }) => {
  // Use useSelector to get the cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Function to calculate the subtotal for a single item
  const calculateItemSubtotal = (item) => {
    // Ensure item.cost is a number. Assuming it's already a number or can be parsed.
    // If item.cost is always a string like "$25.00", then use parseFloat(item.cost.substring(1))
    // However, given our addItem reducer stores `cost: 25.00`, it should already be a number.
    const unitPrice = parseFloat(item.cost); // Or item.cost if already a number
    return (unitPrice * item.quantity).toFixed(2); // Format to 2 decimal places
  };

  // Function to calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const unitPrice = parseFloat(item.cost);
      return total + (unitPrice * item.quantity);
    }, 0).toFixed(2); // Format to 2 decimal places
  };

  // Handle incrementing the quantity of an item
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1 and decremented, remove the item
      dispatch(removeItem(item.id));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Handle "Continue Shopping" button click
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default form submission behavior if it's a button
    onContinueShopping(); // Call the function passed from the parent component
  };

  // Placeholder for "Checkout" functionality
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Effect to potentially update the total items icon (if you have one)
  // This part would depend on how your cart icon is implemented.
  // For example, if you have a state for total items in App.js or a header.
  useEffect(() => {
    // You might dispatch an action here to update a global total item count
    // or pass this count up to a parent component if needed for a cart icon.
    // Example (conceptual, depends on your global state structure for icon):
    // const totalItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    // dispatch(updateCartIconCount(totalItemsInCart)); // Assuming you have such an action
  }, [cartItems]); // Re-run when cartItems change

  return (
    <div className="cart-items-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start adding some plants!</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.cost.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p>Subtotal: ${calculateItemSubtotal(item)}</p>
                <button onClick={() => handleRemove(item)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</h3>
          <h3>Total Amount: ${calculateTotalAmount()}</h3>
          <div className="cart-actions">
            <button onClick={handleContinueShopping} className="continue-shopping-button">Continue Shopping</button>
            <button onClick={handleCheckoutShopping} className="checkout-button">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;


