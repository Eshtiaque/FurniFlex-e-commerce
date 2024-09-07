// Cart.jsx
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';


const Cart = () => {
  const {user }= useContext(AuthContext)


  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch cart items from Firebase on initial load
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cart'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          quantity: doc.data().quantity || 1, 
        }));
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // Add item to cart, preventing duplicates
  const addItemToCart = async (newItem) => {
    const itemExists = cartItems.some(item => item.id === newItem.id);

    if (itemExists) {
      setErrorMessage(`${newItem.name} is already in the cart!`);
      navigate('/cart'); 
    } else {
      try {
        await setDoc(doc(db, 'cart', newItem.id), { ...newItem, quantity: 1 });
        setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
        setErrorMessage('');
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  
  const removeItem = async (id) => {
    console.log('Removing item with id:', id); 
    try {
      console.log(`Product-${id}-${user.uid}`);
      const docRef = doc(db, 'cart', `Product-${id}-${user.uid}`);
      
      console.log('Document reference:', docRef.path);
      await deleteDoc(docRef); 
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      console.log('Updated Cart Items:', updatedCartItems);
      setCartItems(updatedCartItems);
      toast.error('Item removed from cart successfully!');

    } catch (error) {
      console.error('Error removing document: ', error); 
      toast.error('Error removing item from cart.');
    }
  };
  


  // Update item quantity in Firebase and local state
  const updateItemQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return; 
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    try {
      const itemRef = doc(db, 'cart', id.toString());
      await updateDoc(itemRef, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  // Increment item quantity
  const incrementQuantity = (id, quantity) => {
    updateItemQuantity(id, quantity + 1);
  };

  // Decrement item quantity
  const decrementQuantity = (id, quantity) => {
    if (quantity > 1) {
      updateItemQuantity(id, quantity - 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="container lg:h-screen mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className='col-span-2'>
          <h2 className="text-2xl font-bold mb-4">An overview of your order</h2>

          {errorMessage && (
            <div className="bg-red-500 text-white p-2 mb-4 rounded">
              {errorMessage}
            </div>
          )}

          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 mb-4 lg:h-32 bg-white shadow-md rounded-lg">
              <div className="flex items-center">
              <div className="flex items-center mt-2  lg:me-8">
                    <button
                      onClick={() => decrementQuantity(item.id, item.quantity)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(item.id, item.quantity)}
                      className="px-2 py-1 bg-gray-300 rounded"
                    >+</button>
                  </div>
                <img src="https://i.imgur.com/ec3oOhf.png" alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                 
                </div>
              </div>
              <div className='lg:flex flex-col gap-y-12'>
              <button onClick={() => removeItem(item.id)} className="text-black font-thin text-2xl">X</button>
              <p className="text-gray-600 text-2xl font-bold">€{item.price.toFixed(2)}</p>
                  
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl  font-bold mb-4">Order details</h2>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="flex justify-between mb-2"><span>Subtotal</span> <span>€{calculateTotal()}</span></p>
            <p className="flex justify-between mb-2"><span>Shipping</span> <span>Free</span></p>
            <p className="flex justify-between mb-2"><span>Estimated Tax</span> <span>€-</span></p>
            <p className="flex justify-between mb-2 font-bold"><span>Total</span> <span>€{calculateTotal()}</span></p>
            <button className="w-full bg-black text-white py-2 mt-4">GO TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
