import React, { useContext } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, addDoc, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';


const ProductCard = ({ product }) => {

  const {user }= useContext(AuthContext)

  const handleAddToCart = async () => {
  
    const cartRef = collection(db, 'cart');
    try {

    const q = query(cartRef, where('id', '==', product.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      toast.warning('Product is already in your cart!');
      return;
    }

    await setDoc(doc(db, 'cart',
      `Product-${product.id}-${user.uid}`), {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1 ,
      userId: user.uid 
    });

    toast.success('Product added to cart successfully!');
    console.log('Product added:', product);
    } catch (error) {
    toast.error('Error adding product to cart: ', error);
    }
  };


  return (
    <div className=" p-4 rounded-lg lg:w-72 border flex flex-col justify-between h-full">
      <div className="">
        <div className="">
          <img
            src={product?.image} alt={product.name} className="w-64 h-64  flex justify-center object-cover rounded-lg  " />
        </div>

        <h2 className="text-lg font-bold mt-4">{product.name}</h2>
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-700 font-bold text-xl">{product.price} €</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through ml-2 text-sm">{product.oldPrice} €</span>
          )}
          {product.discount && (
            <span className="text-red-500 ml-2 text-sm">{product.discount}</span>
          )}
        </div>
        <p className="text-gray-500 mt-2 text-sm">{product.description}</p>
      </div>
      <button onClick={handleAddToCart} className="bg-black text-white py-2 px-4 rounded-lg mt-4">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
