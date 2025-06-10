// src/ProductList.jsx

import React, { useState } from 'react'; // Keep useState for addedToCart
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { addItem } from './CartSlice'; // Ensure this path is correct
import './ProductList.css'; // Your CSS file

// The ProductList component should receive onGoToCart as a prop from App.js
function ProductList({ onGoToCart }) { // No longer needs onHomeClick or its own showCart/showPlants
    // State to track which products have been added to the cart locally
    // This helps manage the "Add to Cart" button state (disabled/text change)
    const [addedToCart, setAddedToCart] = useState({});

    // useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // Access cart items from Redux store to properly set initial addedToCart state on load
    // This ensures buttons are correct if a refresh occurs and items are in cart
    const cartItems = useSelector(state => state.cart.items);

    // useEffect to initialize addedToCart state based on existing cart items
    // This prevents "Add to Cart" showing for items already in cart on page load/refresh
    useEffect(() => {
        const initialAddedState = {};
        cartItems.forEach(item => {
            initialAddedState[item.id] = true;
        });
        setAddedToCart(initialAddedState);
    }, [cartItems]); // Run once on component mount, and if cartItems from Redux change

    // IMPORTANT: Add unique 'id' to each plant object.
    // I've added a simple slug-based ID. In a real app, these would come from a database.
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    id: "snake-plant-air-purifying", // Added unique ID
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: 15.00 // Changed to number
                },
                {
                    id: "spider-plant-air-purifying", // Added unique ID
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: 12.00
                },
                {
                    id: "peace-lily-air-purifying", // Added unique ID
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: 18.00
                },
                {
                    id: "boston-fern-air-purifying", // Added unique ID
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: 20.00
                },
                {
                    id: "rubber-plant-air-purifying", // Added unique ID
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: 17.00
                },
                {
                    id: "aloe-vera-air-purifying", // Added unique ID
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: 14.00
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    id: "lavender-aromatic", // Added unique ID
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: 20.00
                },
                {
                    id: "jasmine-aromatic", // Added unique ID
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: 18.00
                },
                {
                    id: "rosemary-aromatic", // Added unique ID
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, often used in cooking.",
                    cost: 15.00
                },
                {
                    id: "mint-aromatic", // Added unique ID
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: 12.00
                },
                {
                    id: "lemon-balm-aromatic", // Added unique ID
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: 14.00
                },
                {
                    id: "hyacinth-aromatic", // Added unique ID
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Hyacinth is a beautiful flowering plant known for its fragrant.",
                    cost: 22.00
                }
            ]
        },
        {
            category: "Insect Repellent Plants",
            plants: [
                {
                    id: "oregano-repellent", // Added unique ID
                    name: "oregano",
                    image: "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
                    description: "The oregano plants contains compounds that can deter certain insects.",
                    cost: 10.00
                },
                {
                    id: "marigold-repellent", // Added unique ID
                    name: "Marigold",
                    image: "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
                    description: "Natural insect repellent, also adds color to the garden.",
                    cost: 8.00
                },
                {
                    id: "geraniums-repellent", // Added unique ID
                    name: "Geraniums",
                    image: "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
                    description: "Known for their insect-repelling properties while adding a pleasant scent.",
                    cost: 20.00
                },
                {
                    id: "basil-repellent", // Added unique ID
                    name: "Basil",
                    image: "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
                    description: "Repels flies and mosquitoes, also used in cooking.",
                    cost: 9.00
                },
                {
                    id: "lavender-repellent", // Added unique ID (note: same as aromatic lavender, but distinct category ID)
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: 20.00
                },
                {
                    id: "catnip-repellent", // Added unique ID
                    name: "Catnip",
                    image: "
