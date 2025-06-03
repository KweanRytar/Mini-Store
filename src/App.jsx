import React, { useState, useRef, useEffect } from "react";
import Products from "./Products";
import "./App.css";
import { MdCancel } from "react-icons/md";
import baklava from './assets/image-baklava-desktop.jpg';
import brownie from './assets/image-brownie-desktop.jpg';
import cake from './assets/image-cake-desktop.jpg';
import creme from './assets/image-creme-brulee-desktop.jpg';
import macaron from './assets/image-macaron-desktop.jpg';
import meringue from './assets/image-meringue-desktop.jpg';
import panna from './assets/image-panna-cotta-desktop.jpg';
import tiramisu from './assets/image-tiramisu-desktop.jpg';
import waffle from './assets/image-waffle-desktop.jpg';

function App() {
  const [cart, setCart] = useState([]);
  const customerName = useRef("");
  const customerEmail = useRef("");
  const customerPhone = useRef(null);
  const confirmRef = useRef(null);
  const noOrderRef = useRef(null);
  const noOrder1Ref = useRef(null)
const [ConfirmedName, setConfirmedName] = useState("")
  const addToCart = (order) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.name === order.name);
      if (existingIndex !== -1) {
        const updatedCart = [...prev];
        updatedCart[existingIndex].quantity += order.quantity;
        updatedCart[existingIndex].total += order.total;
        return updatedCart;
      } else {
        return [...prev, order];
      }
    });
  };

  const remove = (order) => {
    setCart((prev) => prev.filter((item) => item.name !== order.name));
  };

  const totalOrders = cart.reduce((acc, item) => acc + item.total, 0);

  const handleConfirmOrder = () => {
    const hasCustomerDetails =
      customerName.current?.value.trim() &&
      customerEmail.current?.value.trim() &&
      customerPhone.current?.value.trim();

  if(!hasCustomerDetails){
    noOrder1Ref.current?.showModal();
   
  } else if (cart.length === 0){
    
  } else {
    setConfirmedName(customerName.current.value)
    confirmRef.current?.showModal();
    
  }

  
  };

  return (
    <>
      <h1 className="text-lg font-bold m-4">Products</h1>
      <div className="carrier bg-white shadow-xl h-full w-full grid grid-cols-1 md:grid-cols-4 m-4 gap-4 items-start mx-auto my-20 p-4">
        
        {/* Product Carrier */}
        <div className="productCarrier grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:col-span-3">
          <Products addToCart={addToCart} product={cake} productPricee={1000} />
          <Products addToCart={addToCart} productPricee={2000} product={brownie} />
          <Products addToCart={addToCart} productPricee={3000} product={waffle} />
          <Products addToCart={addToCart} productPricee={800} product={panna} />
          <Products addToCart={addToCart} productPricee={600} product={tiramisu} />
          <Products addToCart={addToCart} productPricee={9000} product={meringue} />
          <Products addToCart={addToCart} productPricee={7000} product={creme} />
          <Products addToCart={addToCart} productPricee={800} product={baklava} />
          <Products addToCart={addToCart} productPricee={900} product={macaron} />
        </div>

        {/* Cart Carrier */}
        <div className="cartCarrier p-4 bg-gray-100 shadow-md rounded-lg md:col-span-1">
          <h1 className="text-lg font-bold">Your Cart ({cart.length})</h1>
          {cart.map((item, index) => (
            <div key={index} className="mb-2">
              <h1 className="text-pink-300 font-bold">{item.name}</h1>
              <p className="text-blue-600 flex justify-between items-center">
                {item.quantity}x @{item.price} = {item.total}
                <MdCancel onClick={() => remove(item)} className="cursor-pointer text-red-600" />
              </p>
            </div>
          ))}

          <p className="text-sm text-gray-500 flex justify-between">
            Order total <span>{totalOrders}</span>
          </p>

          {/* Customer Details Input */}
          <input ref={customerName} className="block w-full border-b-4 border-pink-500 m-2" type="text" placeholder="Enter your name" />
          <input ref={customerEmail} type="email" placeholder="Enter your email" className="block w-full border-b-4 border-pink-500 m-2" />
          <input ref={customerPhone} className="block w-full border-b-4 border-pink-500 m-2" type="number" placeholder="Enter your phone number" />

          {/* Confirm Order Button */}
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>

        {/* Confirmation Dialog */}
        <dialog className="rounded-lg p-6 w-80 shadow-lg backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" ref={confirmRef}>
          <p>
            Dear {ConfirmedName}, your order has been received and you will be contacted shortly on WhatsApp for pickup and delivery.
            Thanks for your patronage.
          </p>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => 
          { confirmRef.current?.close()
            customerPhone.current.value  = ""
  customerEmail.current.value  = ""
  customerName.current.value  = ""
  setCart([])
  setConfirmedName("")
          }}>
            Close
          </button>
        </dialog>

        {/* No Order Warning Dialog */}
        <dialog className="rounded-lg p-6 w-80 shadow-lg backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" ref={noOrderRef}>
          <p>Please place an order as your cart is empty.</p>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => noOrderRef.current?.close()}
          >
            Close
          </button>
        </dialog>
        <dialog className="rounded-lg p-6 w-80 shadow-lg backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" ref={noOrder1Ref}>
          <p>Please provide your contact details.</p>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4"
            onClick={() => noOrder1Ref.current?.close()}
          >
            Close
          </button>
        </dialog>
      </div>
    </>
  );
}

export default App;
